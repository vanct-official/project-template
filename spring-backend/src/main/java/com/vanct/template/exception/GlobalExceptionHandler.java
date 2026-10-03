package com.vanct.template.exception;

import com.vanct.template.dto.ApiResponse;
import com.vanct.template.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Centralized Global Exception Handler
 * Equivalent to middlewares/errorHandler.js & middlewares/notFoundHandler.js
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle 404 Not Found for missing endpoints or resources
     */
    @ExceptionHandler({ResourceNotFoundException.class, NoResourceFoundException.class})
    public ResponseEntity<ApiResponse<Object>> handleNotFoundException(Exception ex) {
        return ResponseUtil.sendError(
                "Route not found: " + ex.getMessage(),
                HttpStatus.NOT_FOUND
        );
    }

    /**
     * Handle validation errors (DTO @Valid)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return ResponseUtil.sendError(
                "Validation failed",
                HttpStatus.BAD_REQUEST,
                errors
        );
    }

    /**
     * Handle general uncaught exceptions (500 Internal Server Error)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception ex) {
        return ResponseUtil.sendError(
                "Internal server error: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
