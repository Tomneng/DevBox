package com.example.devbox.dto;


import com.example.devbox.config.CustomUserDetailService;
import com.example.devbox.domain.common.Authority;
import com.example.devbox.domain.common.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
public class CustomUser implements UserDetails , OAuth2User {

    private User user;

    private Map<String, Object> attributes;

    public CustomUser(User user) {
        this.user = user;
    }

    public CustomUser(User user, Map<String, Object> attributes){
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<Authority> authorities = user.getAuthorities();
        Collection<GrantedAuthority> authorityCollection = authorities.stream()
                .map((auth) -> new SimpleGrantedAuthority(auth.getAuthName()))
                .collect(Collectors.toList());

        return authorityCollection;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
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
        return user.getEnabled() != 0;
    }

    @Override
    public String getName() {
        return null;
    }
}
