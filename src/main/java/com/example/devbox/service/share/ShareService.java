package com.example.devbox.service.share;


import com.example.devbox.domain.share.Share;
import com.example.devbox.repository.share.ShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShareService {

    private final ShareRepository shareRepository;


    // 글쓰기
    @Transactional
    public Share shareWrite(Share share) {
        return shareRepository.save(share);
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



