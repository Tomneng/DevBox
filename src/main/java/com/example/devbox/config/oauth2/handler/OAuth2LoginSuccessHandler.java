package com.example.devbox.config.oauth2.handler;

import com.example.devbox.config.oauth2.CustomOAuth2User;
import com.example.devbox.domain.common.User;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.TimeZone;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Value("${jwt.access.expiration}")
    private int accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private int refreshTokenExpirationPeriod;

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            log.info(oAuth2User.toString());
            String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
            String refreshToken = jwtService.createRefreshToken();
            response.addCookie(creatCookie("Authorization", accessToken));
            response.addCookie(creatRefreshCookie("Authorization-refresh", refreshToken));
            response.sendRedirect("http://localhost:3000/");
            jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
        } catch (Exception e) {
            throw e;
        }
    }

    public Cookie creatCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);

        // 한국 시간대로 설정
        TimeZone koreaTimeZone = TimeZone.getTimeZone("Asia/Seoul");

        // UTC 시간을 한국 시간으로 변환
        long koreaTime = System.currentTimeMillis() + koreaTimeZone.getRawOffset();

        // 쿠키 만료 시간 설정 (현재 시간을 기준으로 초 단위)
        int maxAgeInSeconds = (int) ((accessTokenExpirationPeriod + koreaTimeZone.getDSTSavings()) / 1000);
        cookie.setMaxAge(maxAgeInSeconds);

        cookie.setPath("/");
        cookie.setHttpOnly(false);

        return cookie;
    }

    public Cookie creatRefreshCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);

        // 한국 시간대로 설정
        TimeZone koreaTimeZone = TimeZone.getTimeZone("Asia/Seoul");

        // UTC 시간을 한국 시간으로 변환
        long koreaTime = System.currentTimeMillis() + koreaTimeZone.getRawOffset();

        // 쿠키 만료 시간 설정 (현재 시간을 기준으로 초 단위)
        int maxAgeInSeconds = (int) ((refreshTokenExpirationPeriod + koreaTimeZone.getDSTSavings()) / 1000);
        cookie.setMaxAge(maxAgeInSeconds);

        cookie.setPath("/");
        cookie.setHttpOnly(false);

        return cookie;
    }
}
