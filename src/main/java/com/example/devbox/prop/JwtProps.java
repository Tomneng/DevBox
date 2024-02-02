package com.example.devbox.prop;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class JwtProps {

    @Value("${jwt.secret}")
    private String secretKey;
}
