package com.example.devbox.domain.share;

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
import java.util.ArrayList;
import java.util.List;

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


    @Column(nullable = false)
    private String  spublic;

    private String sdescription;

    @ColumnDefault(value = "0")
    private int sviewCnt;


    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("sregDate")
    private LocalDateTime localDateTime;


    // FK
//    private User user;


//    @ManyToMany
//    @JoinTable(
//            name = "collection",
//            joinColumns = @JoinColumn(name = "sid"),
//            inverseJoinColumns = @JoinColumn(name = "cid")
//    )
//    private List<Comment> comments = new ArrayList<>();
//

}