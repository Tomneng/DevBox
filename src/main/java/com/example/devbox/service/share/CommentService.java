package com.example.devbox.service.share;


import com.example.devbox.domain.share.Comment;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.share.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;

    //댓글 목록
    @Transactional(readOnly = true)
    public List<Comment> List() {
        return commentRepository.findAll(Sort.by(Sort.Order.desc("cid")));


    }

    @Transactional
    public Comment write(Comment comment) {
        return commentRepository.saveAndFlush(comment);
    }


    @Transactional
    public String  delete(Long cid) {
        commentRepository.deleteById(cid);
        return "ok";
    }
}
