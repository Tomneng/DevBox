package com.example.devbox.service.share;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.share.Comment;
import com.example.devbox.domain.share.Share;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.share.CommentRepository;
import com.example.devbox.repository.share.ShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@RequiredArgsConstructor
@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private ShareRepository shareRepository;

    //댓글 목록
    @Transactional(readOnly = true)
    public List<Comment> commentList() {
        return commentRepository.findAll(Sort.by(Sort.Order.desc("cid")));


    }

    @Transactional
    public ResponseEntity<?> commentWrite(Map<String, String> commentMap) {

        Long userId = parseLong(commentMap.get("userId"));
        Long sid = parseLong(commentMap.get("sid"));
        User user = userRepository.findById(userId).orElseThrow(null);
        Share share = shareRepository.findById(sid).orElseThrow(null);

        Comment comment = new Comment();
        comment.setUserId(user);
        comment.setSid(share);

        return new ResponseEntity<>(commentRepository.saveAndFlush(comment), HttpStatus.CREATED);
    }


    @Transactional
    public String commentDelete(Long cid) {
        commentRepository.deleteById(cid);
        return "ok";
    }
}
