package com.example.devbox.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity(name = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(value = AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name")
    private String username;

    @Column(name = "user_password")
    @JsonIgnore
    private String password;

    @ToString.Exclude
    @JsonIgnore
    private String rePassword;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_nickName")
    private String nickname;

    @Column(name = "user_regDate")
    @CreatedDate
    private String regDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    @JsonIgnore
    private List<Authority> authorities = new ArrayList<>();

    public void addAuthoriy(Authority... authorities){
        Collections.addAll(this.authorities, authorities);
    }

    private String provider;

    private String providerId;
}
