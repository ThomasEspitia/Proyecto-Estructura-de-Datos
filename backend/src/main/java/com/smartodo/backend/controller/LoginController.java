package com.smartodo.backend.controller;

import com.smartodo.backend.model.LoginRequest;
import com.smartodo.backend.model.LoginResponse;
import com.smartodo.backend.model.Student;
import com.smartodo.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://8d09-181-237-232-90.ngrok-free.app") // Puedes cambiarlo a 3000 si usas otro puerto en el frontend
@RestController
@RequestMapping("/api/auth")
public class LoginController {
    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (isValid) {
            Student student = userService.getStudentInfo(loginRequest.getEmail());
            return ResponseEntity.ok(student); // Enviamos la información del estudiante al frontend
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Credenciales inválidas", false));
        }
    }
}
