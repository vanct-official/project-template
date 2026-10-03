package com.vanct.template.util;

import com.vanct.template.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Standard API Response Utility
 * Equivalent to express-backend/src/utils/response.js
 */
public class ResponseUtil {

    private ResponseUtil() {
        // Private constructor for utility class
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendSuccess(String message, T data, HttpStatus status) {
        ApiResponse<T> response = ApiResponse.success(message, data);
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendSuccess(String message, T data) {
        return sendSuccess(message, data, HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendSuccess(T data) {
        return sendSuccess("Success", data, HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendError(String message, HttpStatus status, Object errors) {
        ApiResponse<T> response = ApiResponse.error(message, errors);
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendError(String message, HttpStatus status) {
        return sendError(message, status, null);
    }

    public static <T> ResponseEntity<ApiResponse<T>> sendError(String message) {
        return sendError(message, HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
