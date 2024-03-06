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

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static java.lang.Long.parseLong;


@RequiredArgsConstructor
@Service
public class SteamService {
    private final SteamRepository steamRepository;
    private final UserRepository userRepository;
    private final ShareRepository shareRepository;


    public ResponseEntity<?> plusSteam(Map<String, String> steamMap) {
        Long userId = parseLong(steamMap.get("userId"));
        // 파싱한 userId 가 있는지 확인
        User user = userRepository.findById(userId).orElseThrow(null);

        Long shareId = parseLong(steamMap.get("shareId"));

        Share share = shareRepository.findById(shareId).orElseThrow(null);

        Steam steam = new Steam();
        steam.setUser(user);
        steamRepository.saveAndFlush(steam);
        share.addSteam(steam);

        return new ResponseEntity<>(shareRepository.saveAndFlush(share), HttpStatus.CREATED);
    }


    public String deleteSteam(Long shareId, Long userId) {
        Share share = shareRepository.findById(shareId).orElse(null);
        if (share == null) {
            // shareId에 해당하는 Share가 없는 경우 처리
            return "Share not found";
        }
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            // userId에 해당하는 User가 없는 경우 처리
            return "User not found";
        }
        List<Steam> originalList = share.getSteamList();
        originalList.removeIf(steam -> steam.getUser().getId() == userId);
        share.setSteamList(originalList);

        shareRepository.saveAndFlush(share);
        return "ok";
    }

    public List<Steam> getSteam(Long shareId) {

        Share share = shareRepository.findById(shareId).orElseThrow(null);

        return share.getSteamList();
    }
}
