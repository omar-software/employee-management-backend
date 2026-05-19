package com.omar.employeemanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

// Dieser Controller ist für Login-Seiten und Login-API verantwortlich
@Controller
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // Alte Thymeleaf Login-Seite
    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    // REST Login API für Angular
    @PostMapping("/api/auth/login")
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )
        );

        // Wenn Username/Password falsch sind, wirft Spring Security automatisch eine Exception.
        // Wenn wir hier angekommen sind, ist der Login erfolgreich.
        return ResponseEntity.ok(
                new LoginResponse(
                        true,
                        "Login successful",
                        authentication.getName()
                )
        );
    }

    // Request Body von Angular
    public record LoginRequest(
            String username,
            String password
    ) {
    }

    // Response Body zurück zu Angular
    public record LoginResponse(
            boolean success,
            String message,
            String username
    ) {
    }
}