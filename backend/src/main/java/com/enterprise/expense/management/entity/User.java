package com.enterprise.expense.management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_user_email", columnList = "email")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
// 1. Add 'implements UserDetails' here
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Column(length = 500)
    private String profileImage;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;   // employee → manager

    @OneToMany(mappedBy = "manager")
    private List<User> employees = new ArrayList<>();


    // =================================================================
    // SPRING SECURITY IMPLEMENTATION
    // =================================================================

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converts your Enum Role to a Spring Security Authority
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email; // We map 'username' to your email field
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // You can add logic here if you have account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // You can add logic here if you have account locking
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active; // CONNECTED: This now uses your 'active' boolean!
    }
}