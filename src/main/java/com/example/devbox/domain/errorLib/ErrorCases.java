package com.example.devbox.domain.errorLib;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "E_cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(value = AuditingEntityListener.class)
public class ErrorCases {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "e_caseId")
    private Long eCaseId;

    @Column(name = "e_caseContent")
    private String eCaseContent;

    @Column(name = "e_caseTags")
    private String eCaseTags;

    @Column(name = "e_frequency")
    private int eFrequency;

    @CreatedDate
    @Column(name = "e_createdAt")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private LocalDateTime eCreatedAt;

//    @ManyToOne
//    @Column(name = "user_id")
//    private User userId;
}
