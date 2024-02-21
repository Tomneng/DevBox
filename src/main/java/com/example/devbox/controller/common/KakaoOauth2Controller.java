package com.example.devbox.controller.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2/kakao")
public class KakaoOauth2Controller {

    @GetMapping("/callback")
    public String kakaoOauthRedirect(@RequestParam String code) {
        return "카카오 로그인 인증 완료, code : " + code;
    }

}
