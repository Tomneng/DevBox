package com.example.devbox.controller.common;

import com.example.devbox.config.oauth2.CustomOAuth2User;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.UserSignUpDto;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class UserController {

    private final UserService userService;

    private final UserRepository userRepository;

    @GetMapping("/signUp")
    public void ifSocialLogin(){
    }

    @PostMapping("/signUp")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }


    @GetMapping("/user/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal UserDetails user){ // Security Context에 등록한 애를 받아옴
        log.info(":::: customUser ::::");
        log.info("customUser : " + user);

        log.info("user : " + user);

        User realUser =  userRepository.findByEmail(user.getUsername()).orElse(null);
        log.info(realUser.toString());
        // 인증된 사용자 정보 보내주기
        if (realUser != null){
            return new ResponseEntity<>(realUser, HttpStatus.OK);
        }
        // 인증안될 경우
        return new ResponseEntity<>("UnAuthorized", HttpStatus.UNAUTHORIZED); // 401
    }
}