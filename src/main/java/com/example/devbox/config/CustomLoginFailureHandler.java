package com.example.devbox.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;


/*
 * 실패한 Exception을 검사하여 해당 Exception에 맞는 에러 메시지를 로그인 페이지에 같이 전달하여
 * 로그인 실패 이유를 사용자에게 노출시킵니다.
 *
 * 아래에 구현된 Exception을 포함한 AuthenticationException의 종류는 다음과 같습니다.
 *    UsernameNotFoundException : 계정 없음
 *    BadCredentialsException : 비밀번호 불일치
 *    AccountExpiredException : 계정만료
 *    CredentialExpiredException : 비밀번호 만료
 *    DisabledException : 계정 비활성화
 *    LockedException : 계정잠김
 */

public class CustomLoginFailureHandler implements AuthenticationFailureHandler {

    private final String DEFAULT_FAILURE_FORWARD_URL = "/user/loginError";

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("### 로그인 실패 : onAuthenticationFailure() 호출 ###");

        String errorMessage = null;

        //=================================================
        //< set the error message
        //=================================================
        //< incorrect the identify or password
        if(exception instanceof BadCredentialsException || exception instanceof InternalAuthenticationServiceException) {
            errorMessage = "아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오.";
        }
        //< account is disabled
        else if(exception instanceof DisabledException) {
            errorMessage = "계정이 비활성화 되었습니다. 관리자에게 문의하세요.";
        }
        //< expired the credential
        else if(exception instanceof CredentialsExpiredException) {
            errorMessage = "비밀번호 유효기간이 만료 되었습니다. 관리자에게 문의하세요.";
        }
        else {
            errorMessage = "알수 없는 이유로 로그인에 실패하였습니다. 관리자에게 문의하세요.";
        }

        request.setAttribute("errorMessage", errorMessage);
        request.setAttribute("username", request.getParameter("username"));

        // redirect 나 forward 해주면 된다
        request.getRequestDispatcher(DEFAULT_FAILURE_FORWARD_URL).forward(request, response);
    }
}
