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
    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody Share share) {
        return new ResponseEntity<>(shareService.shareWrite(share), HttpStatus.CREATED);
    }

    //  글 목록
    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(shareService.shareList(), HttpStatus.OK);
    }


    // 글 디테일
    @GetMapping("/detail/{SId}")
    public ResponseEntity<?> detail(@PathVariable Long sId){
    return new ResponseEntity<>(shareService.shareDetail(sId), HttpStatus.OK);
    }

    // 글 수정

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Share share){
        return new ResponseEntity<>(shareService.shareUpdate(share), HttpStatus.OK);
    }

    // 글 삭제

    @DeleteMapping("/delete/{sId}")
    public ResponseEntity<?> delete(@PathVariable Long sId){
        return new ResponseEntity<>(shareService.shareDelete(sId), HttpStatus.OK);
    }




}
