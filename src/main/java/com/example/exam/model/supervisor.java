package com.example.exam.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String email;

    @OneToMany
    private Set<student> student;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<student> getStudents() {
        return student;
    }

    public void setStudents(Set<student> student) {
        this.student = student;
    }
}