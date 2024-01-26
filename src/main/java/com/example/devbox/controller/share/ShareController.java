package com.example.devbox.controller.share;


import com.example.devbox.domain.share.Share;
import com.example.devbox.service.share.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/share")
public class ShareController {

    private final ShareService shareService;

    // 글작성
    @CrossOrigin
    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody Share share) {
        return new ResponseEntity<>(shareService.shareWrite(share), HttpStatus.CREATED);
    }

    //  글 목록
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(shareService.shareList(), HttpStatus.OK);
    }


    // 글 디테일
    @CrossOrigin
    @GetMapping("/detail/{sid}")
    public ResponseEntity<?> detail(@PathVariable Long sid){
    return new ResponseEntity<>(shareService.shareDetail(sid), HttpStatus.OK);
    }

    // 글 수정

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Share share){
        return new ResponseEntity<>(shareService.shareUpdate(share), HttpStatus.OK);
    }

    // 글 삭제

    @CrossOrigin
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
