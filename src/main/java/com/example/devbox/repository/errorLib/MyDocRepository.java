package com.example.devbox.repository.errorLib;

import com.example.devbox.domain.myLib.MyDoc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyDocRepository extends JpaRepository<MyDoc, Long> {

    List<MyDocTitles> findAllBy();

    MyDoc findByTitle(String title);
}
