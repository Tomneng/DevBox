package com.example.devbox.controller.share;


import com.example.devbox.domain.share.Share;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.share.ShareRepository;
import com.example.devbox.service.share.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/codeshare")
public class ShareController {

    private final ShareService shareService;

    private final UserRepository userRepository;
    private final ShareRepository shareRepository;

    // 글작성

    @PostMapping("/write")
//    public ResponseEntity<?> write(@RequestBody Share share) {
//        return new ResponseEntity<>(shareService.shareWrite(share), HttpStatus.CREATED);

    public ResponseEntity<?> write(@RequestBody Map<String , String> writeMap) {
        return  shareService.shareWrite(writeMap);
    }

    //  글 목록

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(shareService.shareList(), HttpStatus.OK);
    }


    // 글 디테일
    @GetMapping("/detail/{sid}")
    public ResponseEntity<?> detail(@PathVariable Long sid){
    return new ResponseEntity<>(shareService.shareDetail(sid), HttpStatus.OK);
    }

    // 글 수정

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Share share){
        return new ResponseEntity<>(shareService.shareUpdate(share), HttpStatus.OK);
    }

    // 글 삭제

    @DeleteMapping("/delete/{sid}")
    public ResponseEntity<?> delete(@PathVariable Long sid){
        return new ResponseEntity<>(shareService.shareDelete(sid), HttpStatus.OK);
    }


//    @CrossOrigin
//    @DeleteMapping("/delete/{sid}")
//    public ResponseEntity<?> delete(@PathVariable Long sid){
//        return new ResponseEntity<>(new ResponseStatus(shareService.shareDelete(sid)), HttpStatus.OK);
//    }
//
//    @Data
//    @AllArgsConstructor
//    public static class ResponseStatus {
//        private String status;
//
//    }

}
