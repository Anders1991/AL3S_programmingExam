package com.example.exam.model;

import javax.persistence.*;

@Entity
public class student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String email;

    @ManyToOne
    @JoinColumn(name = "fk_supervisor")
    private supervisor supervisor;

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

    public supervisor getSupervisors() {
        return supervisor;
    }

    public void setSupervisors(supervisor supervisor) {
        this.supervisor = supervisor;
    }

    @Override
    public String toString() {
        return "student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", supervisor=" + supervisor +
                '}';
    }
}