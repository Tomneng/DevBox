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
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<?> userInfo(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            log.info("UserDetails: " + userDetails);

            User realUser = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
            log.info("Real User: " + realUser);

            if (realUser != null) {
                return new ResponseEntity<>(realUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("UnAuthorized", HttpStatus.UNAUTHORIZED);
    }
}