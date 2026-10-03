package com.vanct.template.controller;

import com.vanct.template.dto.ApiResponse;
import com.vanct.template.dto.HealthDataDto;
import com.vanct.template.service.HealthService;
import com.vanct.template.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller handling health check requests
 * Equivalent to express-backend/src/controllers/health.controller.js
 * Endpoint: GET /api/health
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    /**
     * GET /api/health
     * Check application and system health metrics
     */
    @GetMapping
    public ResponseEntity<ApiResponse<HealthDataDto>> checkHealth() {
        HealthDataDto healthData = healthService.getSystemHealth();
        return ResponseUtil.sendSuccess("System is healthy and operational", healthData);
    }
}
