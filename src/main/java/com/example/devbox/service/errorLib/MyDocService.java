package com.example.devbox.service.errorLib;

import com.example.devbox.domain.myLib.MyDoc;
import com.example.devbox.repository.errorLib.MyDocRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyDocService {

    private final MyDocRepository myDocRepository;

    @Transactional
    public ResponseEntity<?> getList(){
        return new ResponseEntity<>(myDocRepository.findAll(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> getMyDoc(Long id){
        return new ResponseEntity<>(myDocRepository.findById(id), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> createMyDoc(MyDoc myDoc){
        return new ResponseEntity<>(myDocRepository.saveAndFlush(myDoc), HttpStatus.CREATED); // 201
    }
    @Transactional
    public ResponseEntity<?> updateMyDoc(MyDoc myDoc){
        MyDoc originalMyDoc = myDocRepository.findById(myDoc.getDocId()).orElse(null);
        originalMyDoc.setContent(myDoc.getContent());
        originalMyDoc.setLang(myDoc.getLang());
        originalMyDoc.setSubject(myDoc.getSubject());
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
}
