package com.blogeditor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {

    private String title;

    private String content;

    private String tags;

    private Long blogId;
}

