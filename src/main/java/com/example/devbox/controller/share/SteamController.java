package com.example.devbox.controller.share;


import com.example.devbox.repository.share.SteamRepository;
import com.example.devbox.service.share.SteamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/steam")
@Slf4j
public class SteamController {

    private final SteamService steamService;
    @PostMapping("/plus")
    public ResponseEntity<?> plusSteam(@RequestBody Map<String, String> steamMap){
        return steamService.plusSteam(steamMap);
    }

    @DeleteMapping("/delete/{shareId}/{userId}")
    public ResponseEntity<?> deleteSteam(@PathVariable Long shareId, @PathVariable Long userId){
        log.info(userId.toString());
        return new ResponseEntity<>(steamService.deleteSteam(shareId, userId), HttpStatus.OK);
    }

    @GetMapping("/getSteam/{shareId}")
    public ResponseEntity<?> getsteam(@PathVariable Long shareId){
        return new ResponseEntity<>(steamService.getSteam(shareId), HttpStatus.OK);
    }

}
