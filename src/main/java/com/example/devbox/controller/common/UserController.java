package com.example.devbox.controller.common;

import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.repository.common.AuthorityRepository;
import com.example.devbox.repository.common.UserRepository;
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
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Secured("ROLE_USER")
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser){ // Security Context에 등록한 애를 받아옴
        log.info(":::: customUser ::::");
        log.info("customUser : " + customUser);

        User user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보 보내주기
        if (user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        // 인증안될 경우
        return new ResponseEntity<>("UnAuthorized", HttpStatus.UNAUTHORIZED); // 401
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws Exception{
        if (userRepository.findUserByUsername(user.getUsername()) != null){
            return new ResponseEntity<>("중복된 아이디 입니다.", HttpStatus.BAD_REQUEST);
        }

        log.info("[Post] - /user/register");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(1);
        userRepository.saveAndFlush(user);
        Authority auth = authorityRepository.findByAuthName("ROLE_USER");
        user.addAuthoriy(auth);
        userRepository.save(user);

        if (userRepository.findUserByUsername(user.getUsername()) != null){
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_USER")
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user) throws Exception{
        log.info("[Put] - /user/update");
        User originalUser = userRepository.findUserByUsername(user.getUsername());
        originalUser.setName(user.getName());
        originalUser.setEmail(user.getEmail());
        userRepository.save(originalUser);

        if (userRepository.findUserByUsername(user.getUsername()).getName().equals(user.getName())){
            log.info("회원 수정 성공! - SUCCESS");
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }else {
            log.info("회원 수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_USER") // ADMIN만 가능
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception{
        log.info("[DELETE] - /user/delete");
        userRepository.deleteById(id);

        if (userRepository.existsById(id)){
            log.info("회원 삭제 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }else {
            log.info("회원 삭제 성공! - SUCCESS");
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
    }
}
