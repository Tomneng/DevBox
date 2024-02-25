package com.example.devbox.repository.profile;

import com.example.devbox.domain.profile.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Skill findByName(String name);
}
