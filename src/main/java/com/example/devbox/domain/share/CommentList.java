package com.example.devbox.domain.share;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CommentList extends CommentResult {

    @ToString.Exclude
    @JsonProperty("data")   // JSON 변환시 "data" 란 이름의 property 로 변환됨.
    List<Comment> list;

}
