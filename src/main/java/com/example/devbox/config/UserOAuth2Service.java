package com.example.devbox.config;

import com.example.devbox.config.provider.FacebookUserInfo;
import com.example.devbox.config.provider.GoogleUserInfo;
import com.example.devbox.config.provider.NaverUserInfo;
import com.example.devbox.config.provider.OAuth2UserInfo;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
public class UserOAuth2Service extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.oauth2.password}")
    private String oauth2Password;

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public void setOauth2Password(String oauth2Password) {
        this.oauth2Password = oauth2Password;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

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

        String provider = userRequest.getClientRegistration().getRegistrationId(); // "google", "facebook"...

        OAuth2UserInfo oAuth2UserInfo = switch (provider.toLowerCase()){
            case "google" -> new GoogleUserInfo(oAuth2User.getAttributes());
            case "facebook" -> new FacebookUserInfo(oAuth2User.getAttributes());
            case "naver" -> new NaverUserInfo(oAuth2User.getAttributes());
            default -> null;
        };

        String providerId = oAuth2UserInfo.getProviderId();
        // username은 중복되지 않도록 만들어야 한다
        String username = provider + "_" + providerId; // "ex) google_xxxxxxxx"
        String password = passwordEncoder.encode(oauth2Password);
        String email = oAuth2UserInfo.getEmail();
        String name = oAuth2UserInfo.getName();


        // 회원 가입 진행하기 전에
        // 이미 가입한 회원인지, 혹은 비가입자인지 체크하여야 한다
        User newUser = User.builder()
                .username(username)
                .name(name)
                .email(email)
                .password(password)
                .provider(provider)
                .providerId(providerId)
                .build();

        User user = userRepository.findUserByUsername(username);
        if (user == null) {  // 비가입자인 경우에만 회원 가입 진행
            user = newUser;
            User user1 = userRepository.saveAndFlush(user);
            if (userRepository.existsById(user1.getUserId())) {
                System.out.println("[OAuth2 인증 회원가입 성공]");
                user = userRepository.findUserByUsername(username);
            } else {
                System.out.println("[OAuth2 인증 회원가입 실패]");
            }
        } else {
            System.out.println("[OAuth2 인증. 이미 가입된 회원입니다]");
        }

        return new CustomUser(user, oAuth2User.getAttributes());
    }
}
