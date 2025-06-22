package com.inal.wo.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;


/**
 * Global exception handler for handling validation and other exceptions in the application.
 */
@RestControllerAdvice
public class ErrorController {

    /**
     * Handles validation errors thrown when method arguments are not valid.
     *
     * @param ex the MethodArgumentNotValidException thrown
     * @param request the HttpServletRequest object
     * @return a ResponseEntity containing the error message and HTTP status
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handleValidationErrors(
        MethodArgumentNotValidException ex,
        HttpServletRequest request) {

        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            validationErrors.put(error.getField(), error.getDefaultMessage())
        );

        ErrorMessage errorMessage = ErrorMessage.builder()
            .timestamp(new Date())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Bad Request")
            .message(validationErrors.values())
            .path(request.getRequestURI())
            .build();
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles service exception errors thrown when method arguments are not valid.
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorMessage> handleServiceException(
            ResponseStatusException ex,
        WebRequest request) {
        ErrorMessage errorMessage =
            ErrorMessage.builder()
                .timestamp(new Date()).status(ex.getStatusCode().value())
                .error(ex.getStatusCode().toString())
                .message(ex.getReason())
                .path(((ServletWebRequest) request).getRequest().getRequestURI()).build();
        return ResponseEntity.status(HttpStatus.valueOf(ex.getStatusCode().value())).body(errorMessage);
    }

}
