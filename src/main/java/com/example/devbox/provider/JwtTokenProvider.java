package com.example.devbox.provider;

import com.example.devbox.constants.SecurityConstants;
import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.prop.JwtProps;
import com.example.devbox.repository.common.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * JWT 토큰 관련 기능을 제공
 * 토큰 생성
 * 토큰 해석
 * 토큰 유효성 검사
 */
@Slf4j
@Component
public class JwtTokenProvider {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProps jwtProps;

    private byte[] getSigningKey(){
        return jwtProps.getSecretKey().getBytes();
    }

    private SecretKey getShaKey(){
        return Keys.hmacShaKeyFor(getSigningKey());
    }

    public String createToken(Long userId, String username, List<String> roles){

        String jwt;
        jwt = Jwts.builder()
                .signWith(getShaKey(), SignatureAlgorithm.HS512) // 시그니처 사용할 비밀키, 알고리즘 설정
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 만료시간 설정
                .claim("uid", userId) // payload
                .claim("una", username) // payload
                .claim("rol", roles) // payload
                .compact(); // token 생성

        log.info("jwt : " + jwt);

        return jwt;
    }

    public UsernamePasswordAuthenticationToken getAuthentication(String authHeader){
        if (authHeader == null || authHeader.isEmpty()){
            return null;
        }
        try{
            String jwt = authHeader.replace(SecurityConstants.TOKEN_PREFIX,"");

            Jws<Claims> parsedToken = Jwts.parserBuilder()
                    .setSigningKey(getShaKey())
                    .build().parseClaimsJws(jwt);

            log.info("parsedToken : " + parsedToken);

            String userId = parsedToken.getBody().get("uid").toString();
            Long id = (userId == null ? 0L : Long.parseLong(userId));
            log.info("userid : " + userId);

            String username = parsedToken.getBody().get("una").toString();
            log.info("username : " + username);

            Claims claims = parsedToken.getBody();
            Object roles = claims.get("rol");
            log.info("roles : " + roles);

            if (username == null || username.isEmpty())
                return null;

            User user = new User();
            user.setUserId(id);
            user.setUsername(username);
            // OK : 권한도 바로 User 객체에 담기 (예제와 다른 JPA 사용중)
            user.setAuthorities((List<Authority>) roles);

            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            // 토큰 유효하면 name, email 담기
            try {
                User userinfo = userRepository.findById(id).orElse(null);
                if (userinfo != null){
                    user.setName(userinfo.getName());
                    user.setEmail(userinfo.getEmail());
                }
            }catch (Exception e) {
                log.error(e.getMessage());
                log.error("토큰은 유효 -> DB 추가 정보 조회시 에러 발생...");
            }
            UserDetails userDetails = new CustomUser(user);

            // OK
//            new UsernamePasswordAuthenticationToken(사용자 정보 객체, 비밀번호, 권한목록)
            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        }catch (ExpiredJwtException exception){
            log.warn("Request to parse expired JWT : {} falild : {}", authHeader, exception.getMessage());
        }catch (UnsupportedJwtException exception){
            log.warn("Request to parse unsupported JWT : {} falild : {}", authHeader, exception.getMessage());
        }catch (MalformedJwtException exception){
            log.warn("Request to parse invalid JWT : {} falild : {}", authHeader, exception.getMessage());
        }catch (IllegalArgumentException exception){
            log.warn("Request to parse empty or null JWT : {} falild : {}", authHeader, exception.getMessage());
        }
        return null;
    }

    /**
     * 토큰 유효성 검사
     *  -> 만료기간이 넘었는지를 판단
     * @param jwt
     * @return 유효하면 true, 만료되면 false
     *
     */
    public boolean validateToken(String jwt){
        try{
            Jws<Claims> parsedToken = Jwts.parserBuilder()
                    .setSigningKey(getShaKey())
                    .build().parseClaimsJws(jwt);
            log.info("##### 토큰 만료 기간 #####");
            log.info("-> " + parsedToken.getBody().getExpiration()); // 이게 토큰 생성시 만들어진 만료기간

            Date exp = parsedToken.getBody().getExpiration();
            return !exp.before(new Date()); // new Date() 하면 현재 시간이 생성됨 before는 만료가 되면 true를 리턴
        }catch (ExpiredJwtException exception){
            log.error("Token Expired"); // 토큰 만료
            return false;
        }catch (JwtException exception){
            log.error("Token Tampered"); // 토큰 손상(시그니처 키 위변조 등등)
            return false;
        }catch (NullPointerException exception){
            log.error("Token is null"); // 토큰 없음
            return false;
        }catch (Exception e){
            return false;
        }
    }
}
