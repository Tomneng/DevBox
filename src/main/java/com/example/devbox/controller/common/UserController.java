package com.example.devbox.controller.common;

import com.example.devbox.domain.common.DTO.UserDto;
import com.example.devbox.domain.common.UserValidator;
import com.example.devbox.repository.common.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto) {
        // 회원 등록 처리
        // ...

        // 회원 등록 성공 시 응답
        return ResponseEntity.ok("User registered successfully");
    }

    // 기타 필요한 API 엔드포인트들 추가
    private final UserValidator userValidator;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setValidator(userValidator);
    }
}
