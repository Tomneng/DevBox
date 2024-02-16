package com.example.devbox.domain.share;

import com.example.devbox.domain.common.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "share")
@EntityListeners(value = AuditingEntityListener.class)
public class Share {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    @Column(nullable = false)
    private String stitle;

    @Column(nullable = false)
    private String scontent;

    @Column(nullable = false)
    private String slanguage;

    private String sdescription;

    @ColumnDefault(value = "0")
    private int sviewCnt;


    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("sregDate")
    private LocalDateTime localDateTime;


    // FK
    @ManyToOne
    private User userId;


/*
이걸 인식하는 문제가 있었음
한줄주석 만으로 주석처리를 해놓았으나 에러가 계속나서 완전히 지운후 해결되는걸 확인

    여러줄 주석 으로 해결

//    @ManyToMany
//    @JoinTable(
//            name = "collection",
//            joinColumns = @JoinColumn(name = "sid"),
//            inverseJoinColumns = @JoinColumn(name = "cid")
//    )
//    private List<Comment> comments = new ArrayList<>();
*/

}
