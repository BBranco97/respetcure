package br.com.respetcure.service;

import br.com.respetcure.repository.RecuperacaoSenhaRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TokenCleanupService {

    private final RecuperacaoSenhaRepository repository;

    public TokenCleanupService(
            RecuperacaoSenhaRepository repository
    ) {

        this.repository =
                repository;
    }

    @Transactional
    @Scheduled(
            fixedRate = 900000
    )
    public void limparTokensExpirados() {

        repository.deleteByExpiracaoBefore(
                LocalDateTime.now()
        );

        System.out.println(

                "Tokens expirados removidos em: "

                        + LocalDateTime.now()
        );
    }
}