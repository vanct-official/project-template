package com.vanct.template.service.impl;

import com.vanct.template.dto.HealthDataDto;
import com.vanct.template.service.HealthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Implementation of HealthService
 * Computes uptime, memory usage, and JVM environment metrics
 */
@Service
public class HealthServiceImpl implements HealthService {

    @Value("${spring.profiles.active:dev}")
    private String environment;

    @Override
    public HealthDataDto getSystemHealth() {
        RuntimeMXBean runtimeBean = ManagementFactory.getRuntimeMXBean();
        long uptimeSeconds = runtimeBean.getUptime() / 1000;

        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long maxMemory = runtime.maxMemory();
        long usedMemory = totalMemory - freeMemory;

        Map<String, String> memoryMap = new LinkedHashMap<>();
        memoryMap.put("rss", (totalMemory / (1024 * 1024)) + " MB");
        memoryMap.put("heapTotal", (maxMemory / (1024 * 1024)) + " MB");
        memoryMap.put("heapUsed", (usedMemory / (1024 * 1024)) + " MB");

        return new HealthDataDto(
                "healthy",
                uptimeSeconds + " seconds",
                memoryMap,
                "Java " + System.getProperty("java.version"),
                environment,
                "Spring Boot 3.3.4"
        );
    }
}
