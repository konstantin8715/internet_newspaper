package ru.aleksandrov.backendinternetnewspaper.models;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity(name = "theme")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotBlank(message = "Theme must be not empty")
    private String name;
}
