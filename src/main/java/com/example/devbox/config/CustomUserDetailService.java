package com.example.devbox.config;

import com.example.devbox.domain.common.User;
import com.example.devbox.dto.CustomUser;
import com.example.devbox.repository.common.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) {
        log.info("login - loadUserByUsername : " + username);
        User user = userRepository.findUserByUsername(username);

        if( user == null){
            log.info("사용자 없음");
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다 : "  + username);
        }
        log.info("user : "  + user);
        log.info(user.toString());

        // User -> CustomUser(Security에서 사용가능한 객체)
        CustomUser customUser = new CustomUser(user);
        log.info("customUser : ");
        log.info(customUser.toString());

        return customUser;
    }
}
