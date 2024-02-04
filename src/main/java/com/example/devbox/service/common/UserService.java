package com.example.devbox.service.common;

import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.repository.common.AuthorityRepository;
import com.example.devbox.repository.common.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private final AuthenticationManager authenticationManager; // 왜인지는 모르는데 이거 없으면 에러남 시발

    public ResponseEntity<?> userInfo(CustomUser customUser){
        User user = customUser.getUser();
        log.info("user : " + user);

        if (user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        // 인증안될 경우
        return new ResponseEntity<>("UnAuthorized", HttpStatus.UNAUTHORIZED);
    }


    public ResponseEntity<?> register(User user)throws Exception{
        if (userRepository.findUserByUsername(user.getUsername()) != null){
            return new ResponseEntity<>("중복된 아이디 입니다.", HttpStatus.BAD_REQUEST);
        }
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

    public ResponseEntity<?> update(User user)throws Exception{
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

    public ResponseEntity<?> delete(Long id)throws Exception{
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
