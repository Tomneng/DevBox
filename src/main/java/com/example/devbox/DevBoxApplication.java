package com.example.devbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DevBoxApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevBoxApplication.class, args);
    }

}
