package com.example.devbox.dto;

import com.example.devbox.domain.myLib.MyDoc;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyDocListDto {

    private List<MyDoc> myDocList;
    private Long cnt; // 데이터 총 갯수(페이지네이션용)
}
