package com.example.devbox.service.share;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.share.Share;
import com.example.devbox.domain.share.Steam;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.share.ShareRepository;
import com.example.devbox.repository.share.SteamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static java.lang.Long.parseLong;


@RequiredArgsConstructor
@Service
public class SteamService {
    private final SteamRepository steamRepository;
    private final UserRepository userRepository;
    private final ShareRepository shareRepository;


    public ResponseEntity<?> plusSteam(Map<String , String > steamMap){
        Long userId = parseLong(steamMap.get("userId"));
        // 파싱한 userId 가 있는지 확인
        User user = userRepository.findById(userId).orElseThrow(null);

        Long shareId = parseLong(steamMap.get("shareId"));

        Share share = shareRepository.findById(shareId).orElseThrow(null);

        Steam steam = new Steam();
        steam.setShareId(share);
        steam.setUserId(user);

        share.getSteamList().add(steamRepository.saveAndFlush(steam));


        return new ResponseEntity<> (steamRepository.saveAndFlush(steam), HttpStatus.CREATED);
    }


    public String deleteSteam(Long steamId){
        steamRepository.deleteById(steamId);
        return "ok";
    }


}
