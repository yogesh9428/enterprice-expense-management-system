package com.enterprise.expense.management.util;

import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class GenerateJwtSecret {
    public static void main(String[] args) {
        SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        String encodedKey = Encoders.BASE64.encode(key.getEncoded());
        System.out.println("Generated Secret Key: " + encodedKey);
    }
}
