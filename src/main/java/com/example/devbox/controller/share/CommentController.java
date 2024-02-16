package com.example.devbox.controller.share;

import com.example.devbox.domain.share.Comment;
import com.example.devbox.service.share.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody Map<String , String > commentMap){
        return commentService.commentWrite(commentMap);
    }

    @GetMapping("/list/{sid}")
    public ResponseEntity<?> list(@PathVariable Long sid){
        return new ResponseEntity<>(commentService.commentList(sid), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cid}")
    public ResponseEntity<?> delete(@PathVariable Long cid){
        return new ResponseEntity<>(commentService.commentDelete(cid), HttpStatus.OK);
    }


}
