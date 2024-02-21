package com.example.devbox.domain.share;

import com.example.devbox.domain.common.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "steam")
@EntityListeners(value = AuditingEntityListener.class)
public class Steam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long steamId;

    @ManyToOne
    @JoinColumn(name = "shareId")
    private Share shareId;

    @ManyToOne
    private User userId;

}
