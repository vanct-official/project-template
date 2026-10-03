package com.vanct.template.dto;

import java.util.Map;

/**
 * Health check data payload matching health.service.js in express-backend
 */
public class HealthDataDto {
    private String status;
    private String uptime;
    private Map<String, String> memory;
    private String javaVersion;
    private String environment;
    private String serverFramework;

    public HealthDataDto() {
    }

    public HealthDataDto(String status, String uptime, Map<String, String> memory, String javaVersion, String environment, String serverFramework) {
        this.status = status;
        this.uptime = uptime;
        this.memory = memory;
        this.javaVersion = javaVersion;
        this.environment = environment;
        this.serverFramework = serverFramework;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUptime() {
        return uptime;
    }

    public void setUptime(String uptime) {
        this.uptime = uptime;
    }

    public Map<String, String> getMemory() {
        return memory;
    }

    public void setMemory(Map<String, String> memory) {
        this.memory = memory;
    }

    public String getJavaVersion() {
        return javaVersion;
    }

    public void setJavaVersion(String javaVersion) {
        this.javaVersion = javaVersion;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getServerFramework() {
        return serverFramework;
    }

    public void setServerFramework(String serverFramework) {
        this.serverFramework = serverFramework;
    }
}
