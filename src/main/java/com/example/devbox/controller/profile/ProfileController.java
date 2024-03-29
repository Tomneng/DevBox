package com.example.devbox.controller.profile;

import com.example.devbox.domain.profile.Profile;
import com.example.devbox.repository.profile.SkillRepository;
import com.example.devbox.service.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor   // 의존성 주입 생성자 주입을 임의의 코드 없이 자동으로 설정
@RestController // 데이터 송수신용 컨트롤러
//@Controller // 뷰를 리턴하는 컨트롤러
@RequestMapping("/profile")
public class ProfileController {


    // SurveyService를 의존성 주입 받습니다.
    private final ProfileService profileService;

    private final SkillRepository skillRepository;

    // CrossOrigin 어노테이션은 CORS(Cross-Origin Resource Sharing)를 허용합니다.
    // 다른 도메인에서도 이 컨트롤러의 API를 사용할 수 있도록 허용합니다.

    // 설문 목록 조회 API
    @CrossOrigin
    @GetMapping("/list")
    private ResponseEntity<?> list() {
        return new ResponseEntity<>(profileService.list(), HttpStatus.OK);
    }
    // Response 응답(데이터) + Entity(테이블)
    // => 응답 테이블
    //  return new ResponseEntity<>(profileService.list(), HttpStatus.OK);의 순서는 body -> header -> status 인데 지금 두개가 들어갔으니 header는 현재 null이다.

    // 설문 작성 API
    @CrossOrigin
    @PostMapping("/write")
    private ResponseEntity<?> write(@RequestBody Map<String, String> profileMap) {
        System.out.println(profileMap+"ㅇ"); // 클라이언트에서 서버로 보내주
        return new ResponseEntity<>(profileService.write(profileMap), HttpStatus.CREATED);  // HTTP 상태 코드 201: Created
    }

    @CrossOrigin
    @GetMapping("/writeAvg")
    private ResponseEntity<?> getAvg(){
        System.out.println("평균값 보내기");
        return new ResponseEntity<>(skillRepository.findAll(), HttpStatus.OK);
    }


    // 설문 상세 조회 API
    @CrossOrigin
    @GetMapping("/detail/{id}")
    private ResponseEntity<?> detail(@PathVariable Long id) {
        return new ResponseEntity<>(profileService.detail(id), HttpStatus.OK);
    }

    // 설문 수정 API
    @CrossOrigin
    @PutMapping("/update")
    private ResponseEntity<?> update(@RequestBody Map<String ,String > profileMap) {
        return new ResponseEntity<>(profileService.update(profileMap), HttpStatus.OK);
    }


    // 설문 삭제 API
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> delete(@PathVariable Long id) {
        return new ResponseEntity<>(profileService.delete(id), HttpStatus.OK);
    }




}
