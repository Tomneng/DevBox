package com.example.devbox.repository.share;

import com.example.devbox.domain.share.Steam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SteamRepository extends JpaRepository <Steam, Long> {
}
