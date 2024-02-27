package com.example.devbox.domain.myLib;

import com.example.devbox.domain.common.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private String title;

    private String lang;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    // json 날짜 포멧팅
    private LocalDateTime createdAt;

    @ManyToOne
    @JsonIgnore
    private User user;

    @ColumnDefault(value = "0") // 이친구는 primitive 타입에만 적용되는듯
    private long viewCnt;

}
