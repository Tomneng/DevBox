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

        share.getSteamList().add(steamRepository.saveAndFlush(steam));


        return new ResponseEntity<>(steamRepository.saveAndFlush(steam), HttpStatus.CREATED);
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


        List<Steam> steamList = share.getSteamList();
        for (Iterator<Steam> iterator = steamList.iterator(); iterator.hasNext();) {
            Steam steam = iterator.next();
            if (Objects.equals(steam.getUser().getId(), userId)) {
                iterator.remove();
            }
        }
//        Iterator는 컬렉션을 순회하고 각 요소에 접근할 때 사용하는 인터페이스입니다. 일반적으로 for-each 문을 사용하여 컬렉션을 순회할 수도 있지만, Iterator를 직접 사용하는 이유는 다음과 같습니다:
//
//        Safe Remove: Iterator를 사용하면 컬렉션을 안전하게 수정할 수 있습니다. Iterator의 remove() 메서드를 사용하여 현재 요소를 제거할 수 있습니다. 이렇게 함으로써 컬렉션의 구조가 손상되지 않습니다.
//
//        Concurrent Modification: Iterator를 사용하면 컬렉션을 반복하면서 동시에 컬렉션을 수정할 수 있습니다. 일반적인 for-each 루프에서는 컬렉션을 수정하려고 하면 ConcurrentModificationException이 발생할 수 있습니다. 하지만 Iterator를 사용하면 이러한 예외를 방지할 수 있습니다.
//
//        Full Control: Iterator를 사용하면 컬렉션의 요소에 대한 전체적인 제어권을 얻을 수 있습니다. 현재 요소를 가져오거나 삭제하는 등의 작업을 수행할 수 있습니다.
//
//                따라서 Iterator를 사용하여 컬렉션을 순회하면 컬렉션의 안전한 수정과 동시 수정 문제를 피할 수 있습니다. 이는 컬렉션에서 요소를 안전하게 제거하는데 유용합니다.



//        for (int i = 0; i < steamList.size(); i++) {
//            if (steamList.get(i) == steamRepository.findByUser(user)) {
//                steamList.remove(i);
//                share.setSteamList(steamList);
//                shareRepository.saveAndFlush(share);
//            break;
//            }
//        }
                shareRepository.saveAndFlush(share);

        System.out.println("후" + share.getSteamList());
        return "ok";
    }
}
