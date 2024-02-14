package com.example.devbox.controller.errorLib;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.myLib.MyDoc;
import com.example.devbox.service.errorLib.MyDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/myDoc")
public class ErrorDocController {

    @Autowired
    private MyDocService myDocService;

    @GetMapping("/list/{page}")
    public ResponseEntity<?> getTotalItems(@PathVariable int page){
        return myDocService.getList(page);
    }

    @GetMapping("/allKeyWords")
    public ResponseEntity<?> getKeywords(){
        return myDocService.getKeywords();
    }


    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getMyDoc(@PathVariable Long id){
        return myDocService.getMyDoc(id);
    }

    @PostMapping("/write")
    public ResponseEntity<?> createMyDoc(@RequestBody Map<String, String> myMap){
        return myDocService.createMyDoc(myMap);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMyDoc(@RequestBody MyDoc myDoc){
        return myDocService.updateMyDoc(myDoc);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMyDoc(@PathVariable Long id){
        return myDocService.deleteMyDoc(id);
    }



}
