package com.aarogyasathi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.aarogyasathi.filter.JwtAuthenticationFilter;
import com.aarogyasathi.service.UserInfoDetailService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


	private final UserInfoDetailService userInfoDetailService;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(UserInfoDetailService userInfoDetailService,
			JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.userInfoDetailService = userInfoDetailService;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.cors().and()
			.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests(
					req->req.requestMatchers("/signup/**","/login/**","/history/**")
					.permitAll()
					.requestMatchers("/patient/**","/appointment/**")
					.hasRole("PATIENT")
					.requestMatchers("/doctor/**","/report")
					.hasRole("DOCTOR")
					.requestMatchers("/doctors/**","/doctor/**","/adminsignup","/patient/**","/patientlist","/admin/**")
					.hasRole("ADMIN")
					.anyRequest()
					.authenticated()
			).userDetailsService(userInfoDetailService)
			.sessionManagement(session->session
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
			.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager (AuthenticationConfiguration configuration) throws Exception{
		return configuration.getAuthenticationManager();
	}
}
