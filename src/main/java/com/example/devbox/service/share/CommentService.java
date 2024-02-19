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

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ShareRepository shareRepository;

    //댓글 목록
    @Transactional
    public List<Comment> commentList(Long sid) {
        Iterable<Long> sid2 = Collections.singleton(sid);
        return commentRepository.findAllById(sid2);
    }

    @Transactional
    public ResponseEntity<?> commentWrite(Map<String, String> commentMap) {

        Long userId = parseLong(commentMap.get("userId"));
        Long sid = parseLong(commentMap.get("sid"));
        User user = userRepository.findById(userId).orElseThrow(null);
        Share shareComment = shareRepository.findById(sid).orElseThrow(null);

        Comment comment = new Comment();
        comment.setUserId(user);
        comment.setSid(shareComment);
        comment.setCcontent(commentMap.get("ccontent"));



    //  새로운 댓글을 댓글 목록에 추가
        shareComment.getCommentList().add(commentRepository.saveAndFlush(comment));


        // 변경된 Share 엔티티를 다시 저장하여 영속성 컨텍스트에 반영
        shareRepository.saveAndFlush(shareComment);


        return new ResponseEntity<>(commentRepository.saveAndFlush(comment), HttpStatus.CREATED);
    }


    @Transactional
    public String commentDelete(Long cid) {
        commentRepository.deleteById(cid);
        return "ok";
    }
}
