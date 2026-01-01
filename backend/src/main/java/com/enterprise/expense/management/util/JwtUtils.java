package com.enterprise.expense.management.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    // Helper to generate the SecretKey
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /* ===================== TOKEN GENERATION (UPDATED FOR 0.12.6) ===================== */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList()));

        return Jwts.builder()
                .claims(claims)                        // 'setClaims' -> 'claims'
                .subject(userDetails.getUsername())    // 'setSubject' -> 'subject'
                .issuedAt(new Date())                  // 'setIssuedAt' -> 'issuedAt'
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), Jwts.SIG.HS256) // Use Jwts.SIG.HS256 instead of SignatureAlgorithm
                .compact();
    }

    /* ===================== TOKEN VALIDATION ===================== */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /* ===================== CLAIM EXTRACTION ===================== */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * MAJOR FIX HERE for 0.12.6 compatibility
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()                    // 1. parserBuilder() is removed, use parser()
                .verifyWith(getSigningKey())    // 2. setSigningKey() -> verifyWith()
                .build()
                .parseSignedClaims(token)       // 3. parseClaimsJws() -> parseSignedClaims()
                .getPayload();                  // 4. getBody() -> getPayload()
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}