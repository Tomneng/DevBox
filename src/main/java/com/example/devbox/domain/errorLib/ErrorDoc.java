package com.example.devbox.domain.errorLib;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Errors")
public class ErrorDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "error_id")
    private Long id;

    @Column(name = "error_KindName")
    private String errorKindName; // 언어종류 구분용

    @Column(name = "error_content")
    private String errorContent;
    @Column(name = "error_kindNum")
    private Long errorKindNum; // 에러 종류번호(상속도)

}
