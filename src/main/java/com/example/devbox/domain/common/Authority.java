package com.example.devbox.domain.common;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authId;  // PK

    @Column(length = 40, nullable = false, unique = true)
    private String authName;  // 권한명 ex) "ROLE_MEMBER", "ROLE_ADMIN"

}
