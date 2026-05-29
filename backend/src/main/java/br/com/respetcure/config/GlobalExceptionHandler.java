package br.com.respetcure.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            ResponseStatusException.class
    )
    public ResponseEntity<?> tratarResponseStatusException(
            ResponseStatusException ex
    ) {

        return ResponseEntity
                .status(ex.getStatusCode())
                .body(
                        Map.of(
                                "dataHora",
                                LocalDateTime.now(),

                                "status",
                                ex.getStatusCode().value(),

                                "mensagem",
                                ex.getReason()
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> tratarErroGenerico(
            Exception ex
    ) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        Map.of(
                                "dataHora",
                                LocalDateTime.now(),

                                "status",
                                500,

                                "mensagem",
                                "Erro interno do servidor."
                        )
                );
    }
}