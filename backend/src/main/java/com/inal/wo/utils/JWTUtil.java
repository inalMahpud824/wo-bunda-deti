package com.inal.wo.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
  
    private static final String SECRET_KEY = "inasdlaenfonasdnalksndoiqwdksmdklansdlknqwpdw;m[;maklfpend]";

    public String generateToken(String username) {
      return Jwts.builder()
          .subject(username)
          .issuedAt(new Date())
          .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 5 jam
          .signWith(getSignKey())
          .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
            .verifyWith(getSignKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
