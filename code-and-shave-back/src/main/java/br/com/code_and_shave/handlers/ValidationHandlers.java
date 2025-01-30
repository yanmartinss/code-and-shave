package br.com.code_and_shave.handlers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationHandlers {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult(). getFieldErrors()){
            errors.put(error.getField(),error.getDefaultMessage());
        }
        return errors;
    }


}
