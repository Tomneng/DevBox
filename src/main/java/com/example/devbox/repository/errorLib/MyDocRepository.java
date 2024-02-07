package com.example.devbox.repository.errorLib;

import com.example.devbox.domain.myLib.MyDoc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyDocRepository extends JpaRepository<MyDoc, Long> {
}
