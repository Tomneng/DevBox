package com.example.devbox.domain.profile;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String degree; // 학력

    private int age;

    private String csDegree; // 전공자유무

    private String skills; // 기술 스택

    private String job; // 직업

    private String technicalSkills; // 기술능력

    private String experience; // 경력

    private String projects; // 프로젝트

    private String licenses; // 보유자격증

    private String shortAppeal; // 짧은 자기소개

    private String portfolio; // 포트폴리오

    private int number;

    private LocalDateTime createdAt;

    private String selectedSkills = "No skills selected"; // 선택된 기술
    // 기본값으로 빈 문자열로 초기화하거나, 필요에 따라서 null 체크 후 초기화
    @PrePersist
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
