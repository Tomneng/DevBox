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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@RequiredArgsConstructor
@Service
public class ShareService {

    private final ShareRepository shareRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;


    // 글쓰기

    public ResponseEntity<?> shareWrite(Map<String , String > writeMap) {
        //  400 에러가 나서 찾아보니 이쪽이 문제인듯 하다
        // 근데 이제는 500에러 나옴 왜? (Cannot parse null string)

        // Long 타입으로 파싱
        Long userId = parseLong(writeMap.get("userId"));
        // 파싱한 userId 가 있는지 확인
        User user = userRepository.findById(userId).orElseThrow(null);

        // 있다면 저장
        Share share = new Share();
        share.setSlanguage(writeMap.get("slanguage"));
        share.setStitle(writeMap.get("stitle"));
        share.setScontent(writeMap.get("scontent"));
        share.setSdescription(writeMap.get("sdescription"));

        // 댓글 목록을 가져와서 리스트로 변환


        // 댓글 목록을 share 객체에 설정


        share.setUserId(user);

        return new ResponseEntity<>(shareRepository.saveAndFlush(share), HttpStatus.CREATED) ;
    }


    // 글 목록 불러오기
    @Transactional(readOnly = true)
    public List<Share> shareList() {
        return shareRepository.findAll(Sort.by(Sort.Order.desc("sid")));
    }

    // 글 디테일
    @Transactional
    public Share shareDetail(Long sid) {
         Share plusView = shareRepository.findById(sid).orElseThrow(() -> new IllegalArgumentException("다시 확인"));

         plusView.setSviewCnt(plusView.getSviewCnt() + 1);

        return plusView;
    }


    //  글 수정
    @Transactional
    public Share shareUpdate(Share share) {
        Share shareUpdate = shareRepository.findById(share.getSid()).orElseThrow(() -> new IllegalArgumentException("뭔가 일어나고 있음"));

        // 제목 변경
        shareUpdate.setStitle(share.getStitle());

        //  내용 변경
        shareUpdate.setScontent(share.getScontent());

        // 사용언어 변경
        shareUpdate.setSlanguage(share.getSlanguage());



        return shareUpdate;
    }


    // 글 삭제
    @Transactional
    public String shareDelete(Long sid) {
        // 삭제 작업 수행
        shareRepository.deleteById(sid);
        return "ok";
    }


}



