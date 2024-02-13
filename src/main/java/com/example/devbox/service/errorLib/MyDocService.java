package com.example.devbox.service.errorLib;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.myLib.MyDoc;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.errorLib.MyDocRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
public class MyDocService {

    private final MyDocRepository myDocRepository;

    private final UserRepository userRepository;

    @Transactional
    public ResponseEntity<?> getList(){
        return new ResponseEntity<>(myDocRepository.findAll(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> getMyDoc(Long id){
        return new ResponseEntity<>(myDocRepository.findById(id), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> createMyDoc(Map<String, String> myMap){
        Long userId = parseLong(myMap.get("userId"));
        User user = userRepository.findById(userId).orElse(null);
        String title = myMap.get("title");
        String lang = myMap.get("lang");
        if (title != null && lang != null){
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
    public ResponseEntity<?> updateMyDoc(MyDoc myDoc){
        MyDoc originalMyDoc = myDocRepository.findById(myDoc.getDocId()).orElse(null);
        originalMyDoc.setContent(myDoc.getContent());
        originalMyDoc.setLang(myDoc.getLang());
        return new ResponseEntity<>(originalMyDoc, HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<?> deleteMyDoc(Long myDocId){
        myDocRepository.deleteById(myDocId);
        if (myDocRepository.existsById(myDocId)){
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
