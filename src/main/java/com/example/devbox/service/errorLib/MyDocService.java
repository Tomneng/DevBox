package com.example.devbox.service.errorLib;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.myLib.MyDoc;
import com.example.devbox.dto.MyDocListDto;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.errorLib.MyDocRepository;
import com.example.devbox.repository.errorLib.MyDocTitles;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class MyDocService {

    private final MyDocRepository myDocRepository;

    private final UserRepository userRepository;

    @Transactional
    public ResponseEntity<?> getList(int page) {
        Pageable pageable = PageRequest.of(page - 1, 20, Sort.by("createdAt").descending());
        Page<MyDoc> myDocPage = myDocRepository.findAll(pageable);

        MyDocListDto myDocListDto = MyDocListDto.builder()
                .cnt(myDocPage.getTotalElements())
                .myDocList(myDocPage.getContent())
                .build();

        return new ResponseEntity<>(myDocListDto, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> getKeywords() {
        List<MyDocTitles> titles = myDocRepository.findAllBy();
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }


    @Transactional
    public ResponseEntity<?> getMyDoc(Long id) {
        return new ResponseEntity<>(myDocRepository.findById(id), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> createMyDoc(Map<String, String> myMap) {
        Long userId = parseLong(myMap.get("userId"));
        User user = userRepository.findById(userId).orElse(null);
        String title = myMap.get("title");
        String lang = myMap.get("lang");
        if (title != null && lang != null) {
            myMap.remove("title");
            myMap.remove("lang");
            myMap.remove("userId");
        }
        String content = joinMapToString(myMap, "replaceThisDevBox");
        MyDoc myDoc = new MyDoc();
        myDoc.setTitle(title);
        myDoc.setContent(content);
        myDoc.setLang(lang);
        myDoc.setUser(user);
        return new ResponseEntity<>(myDocRepository.saveAndFlush(myDoc), HttpStatus.CREATED); // 201
    }

    @Transactional
    public ResponseEntity<?> updateMyDoc(Map<String, String> myMap) {
        String title = myMap.get("title");
        String lang = myMap.get("lang");
        Long docId = parseLong(myMap.get("docId"));
        MyDoc myDoc = myDocRepository.findById(docId).orElse(null);
        if (title != null && lang != null) {
            myMap.remove("title");
            myMap.remove("lang");
            myMap.remove("userId");
            myMap.remove("docId");
            myMap.remove("createdAt");
            myMap.remove("viewCnt");
            myMap.remove("content");
        }
        String content = joinMapToString(myMap, "replaceThisDevBox");
        myDoc.setTitle(title);
        myDoc.setContent(content);
        myDoc.setLang(lang);
        return new ResponseEntity<>(myDocRepository.saveAndFlush(myDoc), HttpStatus.OK); // 201
    }

    @Transactional
    public ResponseEntity<?> deleteMyDoc(Long myDocId) {
        myDocRepository.deleteById(myDocId);
        if (myDocRepository.existsById(myDocId)) {
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    private static String joinMapToString(Map<String, String> map, String delimiter) {
        StringBuilder result = new StringBuilder();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            result.append(entry.getKey())
                    .append(delimiter)
                    .append(entry.getValue())
                    .append(delimiter);
        }
        return result.toString();
    }
}
