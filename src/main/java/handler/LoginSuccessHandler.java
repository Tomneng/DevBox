package handler;

import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.util.TimeZone;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${jwt.access.expiration}")
    private int accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private int refreshTokenExpirationPeriod;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        String email = extractUsername(authentication); // 인증 정보에서 Username(email) 추출
        String accessToken = jwtService.createAccessToken(email); // JwtService의 createAccessToken을 사용하여 AccessToken 발급
        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급

        response.addCookie(creatCookie("Authorization", accessToken));
        response.addCookie(creatRefreshCookie("Authorization-refresh", refreshToken));

        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    user.setRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user);
                });
        log.info("로그인에 성공하였습니다. 이메일 : {}", email);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpirationPeriod);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
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