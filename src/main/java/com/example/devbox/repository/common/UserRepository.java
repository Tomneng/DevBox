package com.example.devbox.repository.common;

import com.example.devbox.domain.common.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);

    boolean existsByUsername(String username);
}
