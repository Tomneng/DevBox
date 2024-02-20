package com.example.devbox.config.oauth2;

import com.example.devbox.config.oauth2.userinfo.GoogleOAuth2UserInfo;
import com.example.devbox.config.oauth2.userinfo.KakaoOAuth2UserInfo;
import com.example.devbox.config.oauth2.userinfo.NaverOAuth2UserInfo;
import com.example.devbox.config.oauth2.userinfo.OAuth2UserInfo;
import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.SocialType;
import com.example.devbox.domain.common.User;
import com.example.devbox.repository.common.AuthorityRepository;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.UUID;
@Getter

public class OAuthAttributes {

    private AuthorityRepository authorityRepository;

    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private OAuth2UserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    private OAuthAttributes(AuthorityRepository authorityRepository, String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.authorityRepository = authorityRepository;
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    /**
     * SocialType에 맞는 메소드 호출하여 OAuthAttributes 객체 반환
     * 파라미터 : userNameAttributeName -> OAuth2 로그인 시 키(PK)가 되는 값 / attributes : OAuth 서비스의 유저 정보들
     * 소셜별 of 메소드(ofGoogle, ofKaKao, ofNaver)들은 각각 소셜 로그인 API에서 제공하는
     * 회원의 식별값(id), attributes, nameAttributeKey를 저장 후 build
     */
    public static OAuthAttributes of(SocialType socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {

        if (socialType == SocialType.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new NaverOAuth2UserInfo(attributes))
                .build();
    }

    /**
     * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
     * OAuth2UserInfo에서 socialId(식별값), nickname, imageUrl을 가져와서 build
     * email에는 UUID로 중복 없는 랜덤 값 생성
     * role은 GUEST로 설정
     */
    public User toEntity(String username, SocialType socialType, OAuth2UserInfo oauth2UserInfo) {
        User user =  User.builder()
                .username(username)
                .socialType(socialType)
                .providerId(oauth2UserInfo.getId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .name(oauth2UserInfo.getNickname())
                .build();
        Authority auth = authorityRepository.findByAuthName("ROLE_USER");
        user.addAuthoriy(auth);

        return user;
    }

}
