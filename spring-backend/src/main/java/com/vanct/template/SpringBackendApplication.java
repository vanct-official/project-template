package com.vanct.template;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(
        title = "Spring Backend API",
        version = "1.0.0",
        description = "REST API for the fullstack project template."
))
public class SpringBackendApplication implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(SpringBackendApplication.class);
    private final Environment env;

    public SpringBackendApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        String port = env.getProperty("server.port", "8080");
        String profile = env.getProperty("spring.profiles.active", "dev");

        System.out.println("================== SPRING BOOT BACKEND SERVER =================");
        System.out.println("Spring Boot RESTful API Server is running!");
        System.out.println("URL: http://localhost:" + port);
        System.out.println("Health check: http://localhost:" + port + "/api/health");
        if (env.getProperty("springdoc.swagger-ui.enabled", Boolean.class, false)) {
            System.out.println("Swagger UI: http://localhost:" + port + "/swagger");
        }
        System.out.println("Environment: " + profile);
        System.out.println("================== SPRING BOOT BACKEND SERVER =================");
    }
}
