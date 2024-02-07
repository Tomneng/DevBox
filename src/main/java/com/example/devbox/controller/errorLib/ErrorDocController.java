package com.example.devbox.controller.errorLib;

import com.example.devbox.domain.myLib.MyDoc;
import com.example.devbox.service.errorLib.MyDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/myLib")
public class ErrorDocController {

    @Autowired
    private MyDocService myDocService;

    @GetMapping("/list")
    public ResponseEntity<?> myDocList(){
        return myDocService.getList();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getMyDoc(@PathVariable Long id){
        return myDocService.getMyDoc(id);
    }

    @PostMapping("/write")
    public ResponseEntity<?> createMyDoc(@RequestBody MyDoc myDoc){
        return myDocService.createMyDoc(myDoc);
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
