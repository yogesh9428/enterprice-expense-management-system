package com.enterprise.expense.management.controller;

import com.enterprise.expense.management.dto.UserDTO;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private static final Set<String> ALLOWED_TYPES =
            Set.of("image/png", "image/jpeg", "image/jpg");

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Get current logged-in user
    @GetMapping("/me")
    public ResponseEntity<UserDTO> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                new UserDTO(
                        currentUser.getName(),
                        currentUser.getEmail(),
                        currentUser.getRole(),
                        currentUser.getCreatedAt(),
                        currentUser.getProfileImage()
                )
        );
    }

    // Update name / password only
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO updatedData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (updatedData.getName() != null && !updatedData.getName().isBlank()) {
            currentUser.setName(updatedData.getName());
        }

        if (updatedData.getPassword() != null && !updatedData.getPassword().isBlank()) {
            currentUser.setPassword(passwordEncoder.encode(updatedData.getPassword()));
        }

        User savedUser = userService.saveUser(currentUser);

        return ResponseEntity.ok(
                new UserDTO(
                        savedUser.getName(),
                        savedUser.getEmail(),
                        savedUser.getRole(),
                        savedUser.getCreatedAt(),
                        savedUser.getProfileImage()
                )
        );
    }

    // Upload profile image
    @PostMapping("/me/photo")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            return ResponseEntity.badRequest().body("Only PNG and JPEG images are allowed");
        }

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            // 1️⃣ Attempt to delete old image (Isolated in its own try-catch)
            if (currentUser.getProfileImage() != null && !currentUser.getProfileImage().isBlank()) {
                try {
                    Path oldImagePath = Paths.get("uploads/profile-images/", currentUser.getProfileImage());
                    Files.deleteIfExists(oldImagePath);
                } catch (IOException e) {
                    // LOG the error but DO NOT throw it.
                    // This allows the upload to succeed even if the old file is locked.
                    System.err.println("Note: Could not delete old file (it's currently being viewed): " + e.getMessage());
                }
            }

            // 2️⃣ Save new image (The core logic)
            String originalFilename = file.getOriginalFilename();
            String extension = (originalFilename != null && originalFilename.contains("."))
                    ? originalFilename.substring(originalFilename.lastIndexOf(".")) : ".png";

            String filename = UUID.randomUUID() + extension;
            Path path = Paths.get("uploads/profile-images/", filename);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // 3️⃣ Update user profile
            currentUser.setProfileImage(filename);
            userService.saveUser(currentUser);

            // 4️⃣ Return "profileImage" to match your React fix
            return ResponseEntity.ok(Map.of(
                    "message", "Profile image uploaded successfully",
                    "profileImage", filename
            ));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error saving new image");
        }
    }
}