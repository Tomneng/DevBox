package com.example.devbox.domain.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // skill에 name필드 생성자와 setname메소드 추가 함으로써 skill생성시에 메소드 사용 가능
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
