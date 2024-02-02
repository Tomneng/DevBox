package com.example.devbox.domain.common;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String username;

    private String password;
}
