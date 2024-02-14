package com.example.devbox.service.profile;

import com.example.devbox.domain.profile.Profile;
import com.example.devbox.repository.profile.ProfileRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public List<Profile> list(){
        return profileRepository.findAll();
    }

    @Transactional
    public Profile write(Profile profile){

        return profileRepository.save(profile);
    }

    @Transactional
    public Profile detail(Long id){

        return profileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id 확인해주세요"));
    }

    @Transactional
    public Profile update(Profile profile){
        Profile Update = profileRepository.findById(profile.getId()).orElseThrow(() -> new IllegalArgumentException("id확인해주세요"));


        Update.setSkills(profile.getSkills());
        Update.setJobType(profile.getJobType());
        Update.setJob(profile.getJob());
        Update.setTechnicalSkills(profile.getTechnicalSkills());
        Update.setExperience(profile.getExperience());
        Update.setProjects(profile.getProjects());
        Update.setLicenses(profile.getLicenses());
        Update.setShortAppeal(profile.getShortAppeal());
        Update.setPortfolio(profile.getPortfolio());

        Update.setSelectedSkills(profile.getSelectedSkills());  // 추가: selectedSkills 업데이트

        return Update;
    }

    public int delete(Long id){
        profileRepository.deleteById(id);
        return 1;
    }


}
