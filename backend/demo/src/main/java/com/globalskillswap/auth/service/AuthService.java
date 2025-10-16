package com.globalskillswap.auth.service;

import com.globalskillswap.auth.dto.LoginRequest;
import com.globalskillswap.auth.dto.SignupRequest;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ---------- REGISTRACIJA ----------
    public Map<String, Object> signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email već postoji!");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Korisničko ime već postoji!");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        System.out.println("➡ Hashirana lozinka: " + encodedPassword);

        User user = new User(
                request.getName(),
                request.getSurname(),
                request.getUsername(),
                request.getEmail(),
                encodedPassword
        );
        user.setCreatedAt(Date.valueOf(LocalDate.now()));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registracija uspješna!");
        response.put("token", token);
        response.put("user", Map.of(
                "name", user.getName(),
                "surname", user.getSurname(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "createdAt", user.getCreatedAt()
        ));
        return response;
    }

    // ---------- PRIJAVA ----------
    public Map<String, Object> login(LoginRequest request) {
        User user = Optional.ofNullable(userRepository.findByEmail(request.getEmail()))
                .orElseThrow(() -> new RuntimeException("Korisnik ne postoji!"));

        System.out.println("➡ Unesena lozinka: " + request.getPassword());
        System.out.println("➡ Hash iz baze: " + user.getPassword());
        System.out.println("➡ Poklapanje: " + passwordEncoder.matches(request.getPassword(), user.getPassword()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Pogrešna lozinka!");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Prijava uspješna!");
        response.put("token", token);
        response.put("user", Map.of(
                "name", user.getName(),
                "surname", user.getSurname(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "createdAt", user.getCreatedAt()
        ));
        return response;
    }

    // ---------- VALIDACIJA TOKENA ----------
    public boolean verifyToken(String token) {
        return jwtUtil.validateToken(token);
    }
}
