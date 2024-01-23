package com.example.devbox.controller.errorLib;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
public class ErrorDocController {

    @GetMapping("/list")
    public ResponseEntity<?> errorList(){
        return new ResponseEntity<>("d", HttpStatus.OK);
    }
}
