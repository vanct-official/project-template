package com.vanct.template.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Root Welcome Controller
 * Equivalent to app.get('/') in express-backend/src/app.js
 */
@RestController
public class RootController {

    @Value("${app.name:Spring Boot RESTful API Server}")
    private String appName;

    @Value("${app.version:1.0.0}")
    private String version;

    @Value("${app.author:Chu Thế Văn (VanCt)}")
    private String author;

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> rootWelcome() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("message", appName + " is running");
        response.put("version", version);
        response.put("documentation", "/api");
        response.put("health", "/api/health");
        response.put("timestamp", Instant.now().toString());
        response.put("author", author);
        response.put("framework", "Spring Boot 3.3.4 (Java 17)");

        return ResponseEntity.ok(response);
    }
}
