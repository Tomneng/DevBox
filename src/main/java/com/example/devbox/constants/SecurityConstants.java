package com.example.devbox.constants;

// Security 및 JWT 관련된 상수 관리 클래스

/**
 * HTTP
 *      headers : {
 *          Authorization : Bearer ${jwt}
 *      }
 */
public class SecurityConstants {

    // 로그인 필터 경로
    public static final String AUTH_LOGIN_URL = "/login";

    // JWT 토큰을 담을 HTTP 요청 헤더 이름
    public static final String TOKEN_HEADER = "Authorization";

    // 헤더의 접두사
    public static final String TOKEN_PREFIX = "Bearer ";

    // 토큰 타입
    public static final String TOKEN_TYPE = "JWT";
}
