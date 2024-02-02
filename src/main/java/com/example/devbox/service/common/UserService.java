package com.example.devbox.service.common;

import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import com.example.devbox.repository.common.AuthorityRepository;
import com.example.devbox.repository.common.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final AuthenticationManager authenticationManager;


    // 회원등록
    public int insert(User user) throws Exception {
        String userPw = user.getPassword();
        String encodedPw = passwordEncoder.encode(userPw);
        user.setPassword(encodedPw);

        userRepository.saveAndFlush(user);
        Authority auth = authorityRepository.findByAuthName("ROLE_USER");
        user.addAuthoriy(auth);
        userRepository.save(user);

        return 1;
    }

    // 회원 조회
    public User getUser(Long userId) throws Exception{
        return userRepository.findById(userId).orElse(null);
    }

    // 로그인
    public void login(User user, HttpServletRequest request) throws Exception{
        String username = user.getUsername();
        String password = user.getPassword();
        log.info("username : " + username);
        log.info("password : " + password);

        // AuthenticationManager 인증 관리 객체
        // 아이디, 패스워드 인증 토큰 생성
        UsernamePasswordAuthenticationToken token
                = new UsernamePasswordAuthenticationToken(username, password);

        // 토큰에 요청정보 등록
        token.setDetails(new WebAuthenticationDetails(request));

        // 토큰을 이용한 로그인 요청
        Authentication authentication = authenticationManager.authenticate(token);

        log.info("인증 여부 : " + authentication.isAuthenticated());

        User authUser = (User) authentication.getPrincipal();
        log.info("인증된 사용자 : " + authUser.getUsername());

        // 시큐리티 컨텍스트(인증된 사용자 정보등록)
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public int update(User user) throws Exception{
        // 비밀번호 암호화
        String userPw = user.getPassword();
        String encodedPw = passwordEncoder.encode(userPw);
        user.setPassword(encodedPw);
        userRepository.saveAndFlush(user);
        return 1;
    }

    public int delete(Long userId) throws Exception{
        userRepository.deleteById(userId);
        return 1;
    }

}
