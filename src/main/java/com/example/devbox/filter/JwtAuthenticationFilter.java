package com.example.devbox.filter;

import com.example.devbox.constants.SecurityConstants;
import com.example.devbox.domain.common.Authority;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.provider.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.List;

// 이건 로그인 할때 인증하는거고 jwtRequestFilter가 로그인 이후 매 요청마다 인증해줌
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // Autowired가 불가해서 생성자 만들때 넣어줌

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider){
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }

    /**
     *          ("/login")
     * client -> filter -> server
     * username, password 인증시도 (attemptAuthentication)
     *  실패시 : response 에 401을 담아서 보내줌 (Unauthorized)
     *
     *  성공시 JWT 생성
     *      생성된 JWT를 Response > headers > authorization 안에 넣어줌
     *
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        log.info("username : " + username);
        log.info("password : " + password);

        // 사용자 인증 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);

        // 사용자 인증 (로그인)
        authentication = authenticationManager.authenticate(authentication);
        log.info("인증 여부 : " + authentication.isAuthenticated());

        // 인증 실패 (username, password 불일치)
        if (!authentication.isAuthenticated()){
            log.info("인증 실패 : 아이디 또는 비밀번호가 일치하지 않습니다.");
            response.setStatus(401); // 401 Unauthorized (인증 실패)
        }

        return authentication;
    }

    /**
     *  인증 성공 메소드
     *
     *  - JWT를 생성 및 응답헤더에 설정
     * @param request
     * @param response
     * @param
     * @param authResult the object returned from the <tt>attemptAuthentication</tt>
     * method.
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        log.info("인증성공");
        CustomUser user = (CustomUser) authentication.getPrincipal();
        Long userId = user.getUser().getUserId();
        String username = user.getUser().getUsername();

        List<String> roles = user.getUser().getAuthorities()
                .stream()
                .map(Authority::getAuthName)
                .toList();

        // JwtProvider에게 넘겨줌
        String jwt = jwtTokenProvider.createToken(userId, username, roles); // jwt

        // { Authorization : Bearer + {jwt} }
        response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + jwt);
        response.setStatus(200);
    }

}
