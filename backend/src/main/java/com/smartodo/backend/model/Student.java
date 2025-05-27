package com.smartodo.backend.model;

public class Student {
    private String email;
    private String name;
    private String career;
    private String initials;

    public Student(String email, String name, String career, String initials) {
        this.email = email;
        this.name = name;
        this.career = career;
        this.initials = initials;
    }

    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getCareer() { return career; }
    public String getInitials() { return initials;  }
    
}
