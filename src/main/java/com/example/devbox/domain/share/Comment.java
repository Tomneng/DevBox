package com.example.devbox.domain.share;

import com.example.devbox.domain.common.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "comment")
@EntityListeners(value = AuditingEntityListener.class)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    // FK
    // 글
//    @JsonIgnore  // JSON 변환시 제외
    @ManyToOne
    @ToString.Exclude
    private Share sid;


    // FK
    // 작성자
    @ManyToOne
    @ToString.Exclude
    private User userId; // 필드명을 User 엔티티의 기본 키 필드명과 일치시킴

    @Column(nullable = false)
    private String cContent;



    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("cRegDate")
    private LocalDateTime localDateTime;

//
//    @ManyToMany(mappedBy = "comments")
//    private List<Share> shares = new ArrayList<>();

}
