package com.aarogyasathi.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.aarogyasathi.entity.UserInfoUserDetails;
import com.aarogyasathi.service.DoctorService;
import com.aarogyasathi.service.JwtService;
import com.aarogyasathi.service.PatientService;
import com.aarogyasathi.service.UserInfoDetailService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserInfoDetailService userInfoDetailService;
	
	

	public JwtAuthenticationFilter(JwtService jwtService, UserInfoDetailService userInfoDetailService) {
		super();
		this.jwtService = jwtService;
		this.userInfoDetailService = userInfoDetailService;
	}



	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	String authHeader=request.getHeader("Authorization");
	if(authHeader==null || !authHeader.startsWith("Bearer ")) {
		filterChain.doFilter(request, response);
		return;
	}
	
	String token=authHeader.substring(7);
	String email=jwtService.extractUsername(token);
	
	if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
		
		UserDetails userDetails=userInfoDetailService.loadUserByUsername(email);
		
		if(userDetails!=null && jwtService.isValid(token, userDetails)) {
			UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

			authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			SecurityContextHolder.getContext().setAuthentication(authToken);
			
		}
		
	}
		filterChain.doFilter(request, response);
	}

}
