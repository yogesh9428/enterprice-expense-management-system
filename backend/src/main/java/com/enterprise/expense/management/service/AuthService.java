package com.enterprise.expense.management.service;

import com.enterprise.expense.management.dto.AuthResponse;
import com.enterprise.expense.management.dto.LoginRequest;
import com.enterprise.expense.management.dto.RegisterRequest;
import com.enterprise.expense.management.entity.Role;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.util.JwtUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, JwtUtils jwtUtils, AuthenticationManager authenticationManager,
                       @Lazy PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already taken");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.EMPLOYEE); // Default role
        user.setActive(true); // Ensure user is active

        userService.saveUser(user);

        // Auto-login after register (optional, but nice UX)
        String token = jwtUtils.generateToken(user);
        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userService.findByEmail(request.getEmail());
        String token = jwtUtils.generateToken(user);

        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }
}