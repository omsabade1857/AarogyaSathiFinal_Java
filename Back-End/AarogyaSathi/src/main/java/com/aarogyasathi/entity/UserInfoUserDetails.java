package com.aarogyasathi.entity;

import java.util.Collection;
import java.util.HashSet;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;



public class UserInfoUserDetails implements UserDetails {
	
	private Patient patient;
	private Doctor doctor;
	private Admin admin;
	private Object user;

	public UserInfoUserDetails(Object user) {
		super();
		this.user=user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		HashSet<GrantedAuthority> set=new HashSet<>();
		if(user instanceof Patient) {
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					
					return "ROLE_PATIENT";
				}
				
			});
		}
		if(user instanceof Doctor) {
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					
					return "ROLE_DOCTOR";
				}
				
			});
		}
		if(user instanceof Admin) {
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					
					return "ROLE_ADMIN";
				}
				
			});
		}
			
		return set;
	}

	@Override
	public String getPassword() {
		if(user instanceof Patient) {
		return ((Patient) user).getPassword();
		}
		
		else if(user instanceof Doctor) {
			return ((Doctor) user).getPassword();
			}
		else {
			return ((Admin) user).getPassword();
			}
	}

	@Override
	public String getUsername() {
		if(user instanceof Patient) {
			return ((Patient) user).getEmail();
			}
			
			else if(user instanceof Doctor) {
				return ((Doctor) user).getEmail();
				}
			else {
				return ((Admin) user).getEmail();
				}
	}
	
	public int getId() {
        if (user instanceof Patient) {
            return ((Patient) user).getPatientId();
        } else if (user instanceof Doctor) {
            return ((Doctor) user).getDoctorId();
        } else {
            return ((Admin) user).getAdminId();
        }
    }

	@Override
	public boolean isAccountNonExpired() {
	
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}

	
}
