package com.example.devbox.filter;

//import com.jwt.constants.SecurityConstants;
//import com.jwt.provider.JwtTokenProvider;
import com.example.devbox.constants.SecurityConstants;
import com.example.devbox.provider.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtRequestFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * jwt 요청 필터
     * request > headers > Authorization (jwt)
     * jwt 토큰 유효성 검사
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 jwt 토큰 가져옴
        String header =  request.getHeader(SecurityConstants.TOKEN_HEADER);
        log.info("authorization : " + header);


        // jwt 토큰이 없으면 다음 필터로 이동
        if (header == null || header.isEmpty() || !header.startsWith(SecurityConstants.TOKEN_PREFIX)){
            filterChain.doFilter(request, response);
            return;
        }

        // jwt 가 존재한다면
        // Bearer 제거
        String jwt = header.replace(SecurityConstants.TOKEN_PREFIX, "");

        // 토큰 해석
        Authentication authentication = jwtTokenProvider.getAuthentication(jwt);

        //토큰 유효성 검사
        if (jwtTokenProvider.validateToken(jwt)){
            log.info("유효한 Jwt 토큰입니다");
            // 로그인(비밀번호를 모르기때문에 수동 등록)
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}
