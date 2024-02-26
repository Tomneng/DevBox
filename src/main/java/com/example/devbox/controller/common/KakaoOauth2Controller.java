package com.example.devbox.controller.common;

import com.example.devbox.domain.common.*;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.JwtService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/login/oauth2/kakao")
public class KakaoOauth2Controller {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUri;

    @Value("${app.oauth2.password}")
    private String oauth2Password;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/callback")
    public void kakaoOauthRedirect(@RequestParam String code, HttpServletResponse response) throws IOException {
        System.out.println("여긴오나?");
        System.out.println(code);
        KakaoOAuthToken token = kakaoAccessToken(code);
        System.out.println(token);
        KakaoProfile profile = kakaoUserInfo(token.getAccess_token());
        System.out.println(profile);
        User kakaoUser = registerKakaoUser(profile);
        loginKakaoUser(kakaoUser, response);
    }

    public KakaoOAuthToken kakaoAccessToken(String code){
        // POST 방식으로 key-value 형식으로 데이터 요청 (카카오 서버 쪽으로!)
        RestTemplate rt = new RestTemplate();

        // header 준비 (HttpHeader)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터 준비 (HttpBody)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId);
        params.add("redirect_uri", kakaoRedirectUri);
        params.add("code", code);   // 인증 직후 받은 code 값 사용!

        // 위 header 와 body 를 담은 HttpEntity 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        // 요청!
        ResponseEntity<String> response = rt.exchange(
                kakaoTokenUri,   // Access Token 요청 uri
                HttpMethod.POST,  // request method
                kakaoTokenRequest,  // HttpEntity (body + header)
                String.class   // 응답받을 타입
        );
        System.out.println("카카오 AccessToken 요청 응답: " + response);
        System.out.println("카카오 AccessToken 응답 body: " + response.getBody());

        // 응답받은 Json -> Java Object
        ObjectMapper mapper = new ObjectMapper();
        KakaoOAuthToken token = null;

        try {
            token = mapper.readValue(response.getBody(), KakaoOAuthToken.class);
            // 확인
            System.out.println("카카오 AccessToken: " + token.getAccess_token());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return token;
    }

    private KakaoProfile kakaoUserInfo(String accessToken) {
        RestTemplate rt = new RestTemplate();

        // header  준비
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 는 필요없다.  위 header 만 담은 HttpEntity 생성
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        // 요청!
        ResponseEntity<String> response = rt.exchange(
                kakaoUserInfoUri,
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );
        System.out.println("카카오 사용자 Profile 요청 응답: " + response);
        System.out.println("카카오 사용자 Profile 응답 : " + response.getBody());

        // 사용자 정보 JSON -> Java 로 받아내기
        ObjectMapper mapper = new ObjectMapper();
        KakaoProfile profile = null;
        try {
            profile = mapper.readValue(response.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // 확인
        System.out.println("""
                [카카오 회원정보]
                 id: %s
                 nickname: %s
                """.formatted(profile.getId(), profile.getKakaoAccount().getProfile().getNickname()));

        return profile;
    }

    //-----------------------------------------------------------------------------
    // 회원가입 시키기  (username, password, name 필요)
    // Kakao 로그인 한 회원을 User 에 등록하기
    private User registerKakaoUser(KakaoProfile profile) {
        // 새로이 가입시킬 username 을 생성 (unique 해야 한다!)
        String provider = "KAKAO";
        String providerId = "" + profile.getId();
        String username = provider + "_" + providerId;
        String name = profile.getKakaoAccount().getProfile().getNickname();
        String password = oauth2Password;

        System.out.println("""
               [카카오 인증 회원 정보]
                 username: %s
                 name: %s
                 password: %s
                 provider: %s
                 providerId: %s
               """.formatted(username, name, password, provider, providerId));

        // 회원 가입 진행하기 전에
        // 이미 가입한 회원인지, 혹은 비가입자인지 체크하여야 한다
        // 빌드할때 List<Authority> 를 new ArrayList<>()로 안만들어주면 오류남(유저객체가 아니라 만들어서 가입시키기 때문)

        User user =  userRepository.findByEmail(username).orElse(null);
        if(user == null){   // 미가입자 인 경우 회원 가입 진행
            User newUser = User.builder()
                    .email(username)
                    .nickname(name)
                    .password(passwordEncoder.encode(password))
                    .socialType(SocialType.KAKAO)
                    .socialId(providerId)
                    .role(Role.GUEST)
                    .build();

            userRepository.saveAndFlush(newUser);
            if(userRepository.findByEmail(newUser.getEmail()).isPresent()){
                System.out.println("[Kakao 인증 회원 가입 성공]");
                user = userRepository.findByEmail(newUser.getEmail()).orElse(null);  // 다시 읽어오기,  regDate 정보
            } else {
                System.out.println("[Kakao 인증 회원 가입 실패]");
            }

        } else {
            System.out.println("[Kakao 인증. 이미 가입된 회원입니다]");
        }

        return user;
    }  // end registerKakaoUser()

    private void loginKakaoUser(User kakaoUser, HttpServletResponse response) throws IOException {
        String accessToken = jwtService.createAccessToken(kakaoUser.getEmail());
        System.out.println(accessToken);
        String refreshToken = jwtService.createRefreshToken();
        response.addCookie(creatCookie("Authorization", accessToken));
        response.addCookie(creatCookie("AuthorizationSecond", refreshToken));
        response.sendRedirect("http://localhost:3000/");
        System.out.println("이거 찍히고 redirect가 되야되긴함");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                kakaoUser.getEmail(),
                oauth2Password // 이건 원래 비밀번호여야됨(encoding안되있는)
        );
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(authentication);

        System.out.println("kakao 인증 로그인 처리 완료");
    }

    public Cookie creatCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 *60 *60);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        return cookie;
    }
}
