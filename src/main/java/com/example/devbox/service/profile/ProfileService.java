package com.example.devbox.service.profile;

import com.example.devbox.domain.common.User;
import com.example.devbox.domain.profile.Profile;
import com.example.devbox.repository.common.UserRepository;
import com.example.devbox.repository.profile.ProfileRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Profile> list(){
        return profileRepository.findAll();
    }

    @Transactional
    public Profile write(Map<String ,String > profileMap){

        Profile profile = new Profile();

        profile.setName(profileMap.get("name"));
        profile.setNumber(profileMap.get("number"));
        profile.setAge(profileMap.get("age"));
        profile.setDegree(profileMap.get("degree"));
        profile.setCsDegree(profileMap.get("csDegree"));
        profile.setJobType(profileMap.get("jobType"));
        profile.setSkills(profileMap.get("skills"));
        profile.setTechnicalSkills(profileMap.get("technicalSkills"));
        profile.setJob(profileMap.get("job"));
        profile.setExperience(profileMap.get("experience"));
        profile.setProjects(profileMap.get("projects"));
        profile.setLicenses(profileMap.get("licenses"));
        profile.setShortAppeal(profileMap.get("shortAppeal"));
        profile.setPortfolio(profileMap.get("portfolio"));
        profile.setProfilePic(profileMap.get("profilePic"));


        Long userId = Long.parseLong(profileMap.get("userId"));
        User user = userRepository.findById(userId).orElse(null);
        profile.setUser(user);
        return profileRepository.save(profile);
    }

    @Transactional
    public Profile detail(Long id){

        return profileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id 확인해주세요"));
    }

    @Transactional
    public Profile update(Map<String ,String > profileMap){
        Long profileId = Long.parseLong(profileMap.get("id"));
        Profile profile = profileRepository.findById(profileId).orElseThrow(() -> new IllegalArgumentException("id확인해주세요"));

        profile.setName(profileMap.get("name"));
        profile.setNumber(profileMap.get("number"));
        profile.setAge(profileMap.get("age"));
        profile.setDegree(profileMap.get("degree"));
        profile.setCsDegree(profileMap.get("csDegree"));
        profile.setJobType(profileMap.get("jobType"));
        profile.setSkills(profileMap.get("skills"));
        profile.setTechnicalSkills(profileMap.get("technicalSkills"));
        profile.setJob(profileMap.get("job"));
        profile.setExperience(profileMap.get("experience"));
        profile.setProjects(profileMap.get("projects"));
        profile.setLicenses(profileMap.get("licenses"));
        profile.setShortAppeal(profileMap.get("shortAppeal"));
        profile.setPortfolio(profileMap.get("portfolio"));
        profile.setProfilePic(profileMap.get("profilePic"));

        profile.setSelectedSkills(profile.getSelectedSkills());  // 추가: selectedSkills 업데이트

        return profile;
    }

    public int delete(Long id){
        profileRepository.deleteById(id);
        return 1;
    }


}
