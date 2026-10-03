package com.vanct.template.service;

import com.vanct.template.dto.HealthDataDto;

/**
 * Health check service providing system status details
 * Equivalent to express-backend/src/services/health.service.js
 */
public interface HealthService {
    HealthDataDto getSystemHealth();
}
