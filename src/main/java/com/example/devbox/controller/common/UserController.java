package com.example.devbox.controller.common;

import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.repository.common.AuthorityRepository;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.service.common.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * [GET] /user/info
 * [POST] /user/register 회원가입
 * [PUT] /user/updateUser
 * [DELETE] /user
 */
@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Secured("ROLE_USER")
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) { // Security Context에 등록한 애를 받아옴
        log.info(":::: customUser ::::");
        log.info("customUser : " + customUser);
        return userService.userInfo(customUser);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws Exception {
        log.info("[POST] - /user/register");
        return userService.register(user);
    }

    @Secured("ROLE_USER")
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user) throws Exception {
        log.info("[PUT] - /user/update");
        return userService.update(user);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        log.info("[DELETE] - /user/delete");
        return userService.delete(id);
    }
}
