package com.example.devbox.domain.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@ToString(callSuper = true)
@Entity(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(value = AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String username;

    private String password;

    @ToString.Exclude
    @JsonIgnore
    private String rePassword;

    private String name;

    private String email;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime regDate;

    @ColumnDefault(value = "1")
    private Integer enabled;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String providerId;

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    private List<Authority> authorities = new ArrayList<>();

    public void addAuthoriy(Authority... authorities){
        Collections.addAll(this.authorities, authorities);
    }

}
