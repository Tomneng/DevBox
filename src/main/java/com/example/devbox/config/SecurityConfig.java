package com.example.devbox.config;

import com.example.devbox.filter.JwtAuthenticationFilter;
import com.example.devbox.filter.JwtRequestFilter;
import com.example.devbox.provider.JwtTokenProvider;
import com.example.devbox.repository.common.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
// @preAuthorize, @postAuthorize, @Secured 활성화
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Value("${app.oauth2.password}")
    private String oauth2Password;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        UserOAuth2Service userOAuth2Service = new UserOAuth2Service();
        userOAuth2Service.setUserRepository(userRepository);
        userOAuth2Service.setPasswordEncoder(passwordEncoder);
        userOAuth2Service.setOauth2Password(oauth2Password);
        // 폼 기반 로그인 비활성화
        http.formLogin(AbstractHttpConfigurer::disable);
        // http 기본 인증 비활성화
        http.httpBasic(AbstractHttpConfigurer::disable);
        // csrf 공격 방어기능 비활성화
        http.csrf(AbstractHttpConfigurer::disable);
        // 세션 비활성화
        http.sessionManagement((management) -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtRequestFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);


        // 인가 설정
        http.authorizeHttpRequests(authorizeRequests ->
                authorizeRequests // 정적 자원 가져오는 케이스이긴 하나 별로 쓰임새가 있진 않은듯
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/admin/**").hasAnyRole("ADMID")
                        .anyRequest().permitAll());

        // 인증 방식 설정


        return http.build();
    }

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager 빈 등록
    private AuthenticationManager authenticationManager;
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
        return authenticationManager;
    }
}
