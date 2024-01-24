package com.example.devbox.domain.common.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long userId;

    private String username;

    @JsonIgnore
    private String password;

    @ToString.Exclude
    @JsonIgnore
    private String rePassword;

    private String email;

    private String nickname;

    private String regDate;

    private String provider;

    private String providerId;
}
