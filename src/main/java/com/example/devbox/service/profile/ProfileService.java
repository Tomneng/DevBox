package com.example.devbox.service.profile;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.profile.Profile;
import com.example.devbox.domain.profile.Skill; // Skill 클래스를 추가로 임포트합니다.
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.profile.ProfileRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor // Lombok을 사용하여 생성자 인젝션을 자동으로 생성합니다.
@Service // Spring Service로 선언합니다.
public class ProfileService {

    private final ProfileRepository profileRepository; // ProfileRepository 의존성을 주입받습니다.
    private final UserRepository userRepository; // UserRepository 의존성을 주입받습니다.

    @Transactional(readOnly = true) // 읽기 전용 트랜잭션을 설정합니다.
    public List<Profile> list(){
        return profileRepository.findAll(); // 모든 프로필 목록을 반환합니다.
    }

    @Transactional // 트랜잭션을 설정합니다.
    public Profile write(Map<String ,String > profileMap){

        Profile profile = new Profile(); // 새로운 프로필 객체를 생성합니다.

        // 기술 추가
        String newSkillsName = profileMap.get("skills"); // 입력 맵에서 기술을 가져옵니다.
        Skill newSkill = new Skill(); // 새로운 스킬 객체를 생성합니다.
        newSkill.setName(newSkillsName); // 스킬의 이름을 설정합니다.
        profile.getSkills().add(newSkill); // 프로필의 스킬 목록에 스킬을 추가합니다.

        // 기술능력 추가
        String newTechnicalSkillsName = profileMap.get("technicalSkills"); // 입력 맵에서 기술능력을 가져옵니다.
        Skill newTechnicalSkill = new Skill(); // 새로운 기술능력 객체를 생성합니다.
        newTechnicalSkill.setName(newTechnicalSkillsName); // 기술능력의 이름을 설정합니다.
        profile.getTechnicalSkills().add(newTechnicalSkill); // 프로필의 기술능력 목록에 기술능력을 추가합니다.

        // 프로필의 다른 속성들을 입력 맵에서 가져와 설정합니다.
        profile.setName(profileMap.get("name"));
        profile.setNumber(profileMap.get("number"));
        profile.setAge(profileMap.get("age"));
        profile.setDegree(profileMap.get("degree"));
        profile.setCsDegree(profileMap.get("csDegree"));
        profile.setJobType(profileMap.get("jobType"));
        profile.setJob(profileMap.get("job"));
        profile.setExperience(profileMap.get("experience"));
        profile.setProjects(profileMap.get("projects"));
        profile.setLicenses(profileMap.get("licenses"));
        profile.setShortAppeal(profileMap.get("shortAppeal"));
        profile.setPortfolio(profileMap.get("portfolio"));
        profile.setProfilePic(profileMap.get("profilePic"));

        Long userId = Long.parseLong(profileMap.get("userId")); // 사용자 ID를 가져옵니다.
        User user = userRepository.findById(userId).orElse(null); // 사용자를 검색하고 없으면 null을 설정합니다.
        profile.setUser(user); // 프로필의 사용자를 설정합니다.

        return profileRepository.save(profile); // 프로필을 저장하고 저장된 프로필을 반환합니다.
    }

    @Transactional // 트랜잭션을 설정합니다.
    public Profile detail(Long id){

        return profileRepository.findById(id) // 주어진 ID에 해당하는 프로필을 검색합니다.
                .orElseThrow(() -> new IllegalArgumentException("id 확인해주세요")); // 프로필을 찾지 못하면 예외를 던집니다.
    }

    @Transactional // 트랜잭션을 설정합니다.
    public Profile update(Map<String ,String > profileMap){
        Long profileId = Long.parseLong(profileMap.get("id")); // ID를 가져옵니다.
        Profile profile = profileRepository.findById(profileId) // 주어진 ID에 해당하는 프로필을 검색합니다.
                .orElseThrow(() -> new IllegalArgumentException("id확인해주세요")); // 프로필을 찾지 못하면 예외를 던집니다.

        // 프로필의 다른 속성들을 입력 맵에서 가져와 설정합니다.
        profile.setName(profileMap.get("name"));
        profile.setNumber(profileMap.get("number"));
        profile.setAge(profileMap.get("age"));
        profile.setDegree(profileMap.get("degree"));
        profile.setCsDegree(profileMap.get("csDegree"));
        profile.setJobType(profileMap.get("jobType"));

        // 기술과 기술능력은 Skill 객체로 변경되었으므로 해당 필드에 대한 설정도 변경해야 합니다.
        Skill skill = new Skill();
        skill.setName(profileMap.get("skills"));
        profile.getSkills().clear(); // 기존 스킬 리스트를 비워줍니다.
        profile.getSkills().add(skill); // 새로운 스킬을 추가합니다.

        Skill technicalSkill = new Skill();
        technicalSkill.setName(profileMap.get("technicalSkills"));
        profile.getTechnicalSkills().clear(); // 기존 기술능력 리스트를 비워줍니다.
        profile.getTechnicalSkills().add(technicalSkill); // 새로운 기술능력을 추가합니다.

        // 프로필의 다른 속성들을 입력 맵에서 가져와 설정합니다.
        profile.setJob(profileMap.get("job"));
        profile.setExperience(profileMap.get("experience"));
        profile.setProjects(profileMap.get("projects"));
        profile.setLicenses(profileMap.get("licenses"));
        profile.setShortAppeal(profileMap.get("shortAppeal"));
        profile.setPortfolio(profileMap.get("portfolio"));
        profile.setProfilePic(profileMap.get("profilePic"));

        profile.setSelectedSkills(profile.getSelectedSkills());  // 추가: selectedSkills 업데이트

        return profile; // 업데이트된 프로필을 반환합니다.
    }

    public int delete(Long id){ // 프로필 삭제 메소드
        profileRepository.deleteById(id); // 주어진 ID에 해당하는 프로필을 삭제합니다.
        return 1; // 성공적으로 삭제되었음을 나타내는 값 1을 반환합니다.
    }
}
