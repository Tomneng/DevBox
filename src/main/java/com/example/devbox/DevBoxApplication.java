package com.example.devbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // 한마디로 날짜생성을 편하게 하기 위함
public class DevBoxApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevBoxApplication.class, args);
    }

}
