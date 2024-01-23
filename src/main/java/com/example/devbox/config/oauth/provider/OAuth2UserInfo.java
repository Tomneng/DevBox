package com.example.devbox.config.oauth.provider;

//provider 들 마다  제공되는 attribute 의 형태가 조금씩 다르다.
//매 provider 마다 후처리 코드 로직이 바뀌도록 작성하면, 유지보수성이 안좋다.
//이를 위한 인터페이스와 객체를 작성합니다.


public interface OAuth2UserInfo {
    String getProvider(); // "google", "facebook",
    String getProviderId(); // PK 값
    String getEmail();

    String getName();

}
