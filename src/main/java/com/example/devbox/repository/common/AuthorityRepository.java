package com.example.devbox.repository.common;


import com.example.devbox.domain.common.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByAuthName(String name);
}







