package com.example.devbox.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("### 로그아웃 성공 : CustomLogoutSuccessHandler 동작 ###");

        // 로그아웃 시간 남기기
        LocalDateTime logoutTime = LocalDateTime.now();
        System.out.println("로그아웃시간: " + logoutTime);

        // 사용시간 계산하기
        LocalDateTime loginTime = (LocalDateTime)request.getSession().getAttribute("loginTime");
        if (loginTime != null){
            long seconds = loginTime.until(logoutTime, ChronoUnit.SECONDS);
            System.out.println("사용시간: " + seconds + " 초");
        }
        request.getSession().invalidate(); // 세션 invalidate!

        String redirectUrl = "/user/login2?logoutHandler";

        // rel_url 파라미터가 있는 경우 logout하고 해당 url 로 redirect
        if (request.getParameter("ret_url") != null){
            redirectUrl = request.getParameter("ret_url");
        }

        // redirect
        response.sendRedirect(redirectUrl);
    }
}
