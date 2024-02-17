package com.example.devbox.domain.profile;

import com.example.devbox.domain.common.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Profile")
@EntityListeners(value = AuditingEntityListener.class) // @createdDate를 사용하기 위함
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String degree; // 학력

    private String  age;

    private String csDegree; // 전공자유무

    private String jobType; // 직무별

    private String job; // 직업

    private String skills; // 기술 스택

    private String technicalSkills; // 기술능력

    private String experience; // 경력

    private String projects; // 프로젝트

    private String licenses; // 보유자격증

    private String shortAppeal; // 짧은 자기소개

    private String portfolio; // 포트폴리오

    private String profilePic;  // 사진

    @ManyToOne
    @JsonIgnore
    private User user;

    private String  number;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;

    private String selectedSkills = "No skills selected"; // 선택된 기술
    // 기본값으로 빈 문자열로 초기화하거나, 필요에 따라서 null 체크 후 초기화



}
