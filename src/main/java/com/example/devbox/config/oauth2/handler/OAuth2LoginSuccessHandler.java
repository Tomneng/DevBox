package com.example.devbox.config.oauth2.handler;

import com.example.devbox.config.oauth2.CustomOAuth2User;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            log.info(oAuth2User.toString());
            String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
            String refreshToken = jwtService.createRefreshToken();
            response.addCookie(creatCookie("Authorization", accessToken));
            response.addCookie(creatCookie("Authorization-refresh", refreshToken));
            response.sendRedirect("http://localhost:3000/");
            System.out.println(accessToken);
            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
            jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);

        } catch (Exception e) {
            throw e;
        }
    }

    public Cookie creatCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 *60 *60);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        return cookie;
    }
}
