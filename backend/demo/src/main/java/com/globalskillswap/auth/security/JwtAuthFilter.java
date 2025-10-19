package com.globalskillswap.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 🔹 1. Uzmi Authorization header
        String authHeader = request.getHeader("Authorization");

        // 🔹 2. Ako ga nema ili nije Bearer token, pusti dalje
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 3. Ekstrakcija tokena
        String token = authHeader.substring(7);
        String email = null;

        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception e) {
            System.out.println("❌ Token parsing error: " + e.getMessage());
        }

        // 🔹 4. Ako imamo email i token je validan
        if (email != null && jwtUtil.validateToken(token)) {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(email, null, null);
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 🔹 Postavi aktivnog korisnika u SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authToken);
            System.out.println("✅ Valid token for: " + email);
        } else {
            // 🔹 Ako nije validan — očisti kontekst
            SecurityContextHolder.clearContext();
        }

        // 🔹 5. Nastavi filter lanac
        filterChain.doFilter(request, response);
    }
}
