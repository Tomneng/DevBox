package com.example.devbox.domain.share;

import com.example.devbox.domain.common.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "sid" ,cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany
    private List<Steam> steamList = new ArrayList<>();

/**
 * 'One To Many' attribute type should be a container 이슈
 *  OneToMany 어노테이션이 붙은 필드(또는 속성 또는 프로퍼티)는 container여야 한다는 의미다.
 *  여기서 말하는 container는 ArrayList 등의 컬렉션 타입을 의미한다.
 *  즉, 여러 객체를 담을 수 있는 데이터 타입으로 선언해달라는 의미다.
 *  컬렉션은 필드에서 바로 초기화하는것이 가장 안전하다. from null or others
 */


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
