package com.example.devbox.domain.share;

import com.example.devbox.domain.common.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "chat_room")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cRId;



    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "bue_user")
    private User bueUsers;


    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "SId")
    private Share share;


    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "sale_user")
    private Share saleUser;



}
