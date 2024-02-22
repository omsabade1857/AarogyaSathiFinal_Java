package com.aarogyasathi.service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	private final String SECRET_KEY = "1ad32ee41841f1ca06b43ae8a43c047d9e67ecbd66e3c0009acda909f8388dc3";
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isValid(String token, UserDetails userDetails) {
		String email=extractUsername(token);
		return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}
	
	private boolean isTokenExpired(String token) {
	
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public<T> T extractClaim(String token, Function<Claims,T> resolver) {
		Claims claim = extractAllClaims(token);
		return resolver.apply(claim);
	}
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
	            .setSigningKey(getSigninKey())
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
		
	}
	
	public String generateToken(String email) {
		String token = Jwts.builder()
						.setSubject(email)
						.setIssuedAt(new Date(System.currentTimeMillis()))
						.setExpiration(new Date(System.currentTimeMillis()+24*60*60*1000))
						.signWith(getSigninKey())
						.compact();
		return token;
	}

		private SecretKey getSigninKey() {
			byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
			return Keys.hmacShaKeyFor(keyBytes); 
	}
}
