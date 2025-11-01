package com.inal.wo.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

import com.inal.wo.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
  
    private static final String SECRET_KEY = "inasdlaenfonasdnalksndoiqwdksmdklansdlknqwpdw;m[;maklfpend]";

    public String generateToken(User user) {
      return Jwts.builder()
            .subject(user.getId().toString())
            .claim("userId", user.getId())
            .claim("role", user.getRole())
            .claim("email", user.getEmail())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 5 jam
            .signWith(getSignKey())
            .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
            .verifyWith(getSignKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("email", String.class);
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
