package com.example.devbox.config.oauth;

import com.example.devbox.config.PrincipalDetails;
import com.example.devbox.config.oauth.provider.GoogleUserInfo;
import com.example.devbox.config.oauth.provider.NaverUserInfo;
import com.example.devbox.config.oauth.provider.OAuth2UserInfo;
import com.example.devbox.domain.common.User;
import com.example.devbox.repository.common.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * OAuth2UserService<OAuth2UserRequest, OAuth2User>(I)
 *  └─ DefaultOAuth2UserService
 */

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    // 여기서 인증후 '후처리' 를 해주어야 한다

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${app.oauth2.password}")
    private String oauth2Password;

    // 인증직후 loadUser() 는 provider 로부터 받은 userRequest 데이터에 대한 후처리 진행
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);   // 사용자 프로필 정보 가져오기

        // 확인
        System.out.println("""
                loadUser() 호출
                  ClientRegistration: %s
                  RegistrationId: %s
                  AccessToken: %s
                  OAuth2User Attributes: %s
                """.formatted(userRequest.getClientRegistration()    // ClientRegistration
                , userRequest.getClientRegistration().getRegistrationId()  // String
                , userRequest.getAccessToken().getTokenValue()  // String
                , oAuth2User.getAttributes()      // Map<String, Object> ← 사용자 프로필 정보 담겨 있다.
        ));

        // 후처리: 회원 가입 진행
        String provider = userRequest.getClientRegistration().getRegistrationId(); // "google", "facebook"...

        OAuth2UserInfo oAuth2UserInfo = switch (provider.toLowerCase()){
            case "google" -> new GoogleUserInfo(oAuth2User.getAttributes());
            case "naver" -> new NaverUserInfo(oAuth2User.getAttributes());
            default -> null;
        };

        String providerId = oAuth2UserInfo.getProviderId();
        // username은 중복되지 않도록 만들어야 한다
        String username = oAuth2UserInfo.getEmail(); // "ex) google_xxxxxxxx"
        String password = passwordEncoder.encode(oauth2Password);
        String nickname = oAuth2UserInfo.getName();


        // 회원 가입 진행하기 전에
        // 이미 가입한 회원인지, 혹은 비가입자인지 체크하여야 한다
        User newUser = User.builder()
                .username(username)
                .nickname(nickname)
                .password(password)
                .provider(provider)
                .providerId(providerId)
                .build();

        User user = userRepository.findUserByUsername(username);
        if (user == null) {  // 비가입자인 경우에만 회원 가입 진행
            user = newUser;
            userRepository.saveAndFlush(user);  // 회원 가입!
            int cnt = 1;
            if (cnt > 0) {
                System.out.println("[OAuth2 인증 회원가입 성공]");
                user = userRepository.findUserByUsername(username);
            } else {
                System.out.println("[OAuth2 인증 회원가입 실패]");
            }
        } else {
            System.out.println("[OAuth2 인증. 이미 가입된 회원입니다]");
        }

        PrincipalDetails principalDetails = new PrincipalDetails(user, oAuth2User.getAttributes());
        principalDetails.setUserRepository(userRepository);  // 잊지말자!

        return principalDetails;   // 이 리턴값이 Authenticatoin 안에 들어간다!
    }
}










