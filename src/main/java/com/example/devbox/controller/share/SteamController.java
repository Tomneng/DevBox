package com.example.devbox.controller.share;


import com.example.devbox.repository.share.SteamRepository;
import com.example.devbox.service.share.SteamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/steam")
public class SteamController {

    private final SteamService steamService;
    @PostMapping("/plus")
    public ResponseEntity<?> plusSteam(@RequestBody Map<String, String> steamMap){
        return steamService.plusSteam(steamMap);
    }

    @DeleteMapping("/delete/{steamId}")
    public ResponseEntity<?> deleteSteam(@PathVariable Long steamId){
        return new ResponseEntity<>(steamService.deleteSteam(steamId), HttpStatus.OK);
    }

}
