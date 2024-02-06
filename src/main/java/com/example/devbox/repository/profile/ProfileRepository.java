package com.example.devbox.repository.profile;

import com.example.devbox.domain.profile.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository  <Profile, Long>{

}
