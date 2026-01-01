package com.enterprise.expense.management.dto;

import com.enterprise.expense.management.entity.Role;
import java.time.LocalDateTime;

public class UserDTO {

    private String name;
    private String email;
    private Role role;
    private String createdAt;

    // Only used for updates (optional)
    private String password;

    private String profileImage;
    public UserDTO() {}

    // Constructor for responses (no password)
    public UserDTO(String name, String email, Role role, LocalDateTime createdAt , String profileImage) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt.toString();
        this.profileImage = profileImage;
    }

    // Constructor for updates (name + password)
    public UserDTO(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters & Setters

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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter
    public String getProfileImage() {
        return profileImage;
    }

    // Setter
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

}
