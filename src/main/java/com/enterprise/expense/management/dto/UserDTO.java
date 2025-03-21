package com.enterprise.expense.management.dto;

import com.enterprise.expense.management.entity.Role;


public class UserDTO {

    private String name;
    private String email;
    private Role role;
    private String createdAt;

    public UserDTO(String name , String email , Role role , String createdAt){
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
    }

    public UserDTO() {
    }

    public String getName() {
        return name;
    }

    public Role getRole() {
        return role;
    }

    public String  getCreatedAt() {
        return createdAt;
    }

    public String getEmail(){
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
