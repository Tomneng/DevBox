package com.example.devbox.domain.myLib;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "myDoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class MyDoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long docId;

    private String lang;

    private String subject;

    private String content;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    // json 날짜 포멧팅
    private LocalDateTime createdAt;

    @ColumnDefault(value = "0")
    private Long viewCnt;

}
