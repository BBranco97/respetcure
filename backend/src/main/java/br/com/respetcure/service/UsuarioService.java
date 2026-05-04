package br.com.respetcure.service;

import br.com.respetcure.model.Contato;
import br.com.respetcure.model.RecuperacaoSenha;
import br.com.respetcure.model.Usuario;
import br.com.respetcure.repository.RecuperacaoSenhaRepository;
import br.com.respetcure.repository.UsuarioRepository;
import br.com.respetcure.repository.dominio.StatusRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    private final RecuperacaoSenhaRepository recuperacaoSenhaRepository;

    private final EmailService emailService;

    private final UsuarioRepository usuarioRepository;

    private final StatusRepository statusRepository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            StatusRepository statusRepository,
            RecuperacaoSenhaRepository recuperacaoSenhaRepository,
            EmailService emailService
    ) {

        this.usuarioRepository =
                usuarioRepository;

        this.statusRepository =
                statusRepository;

        this.recuperacaoSenhaRepository =
                recuperacaoSenhaRepository;

        this.emailService =
                emailService;
    }

    public Usuario salvar(
            Usuario usuario
    ) {

        if (usuarioRepository.existsByNome(
                usuario.getNome()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuário já cadastrado."
            );
        }

        if (usuario.getStatus() == null) {

            usuario.setStatus(
                    statusRepository
                            .findById(1)
                            .orElseThrow()
            );
        }

        if (usuario.getContato() != null &&
                (usuario.getContato()
                        .getNumeroCelular() == null ||

                        usuario.getContato()
                                .getNumeroCelular()
                                .isBlank())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Contato deve possuir celular."
            );
        }

        usuario.setSenhaHash(
                encoder.encode(
                        usuario.getSenhaHash()
                )
        );

        Usuario usuarioSalvo =
                usuarioRepository.save(
                        usuario
                );

        return usuarioRepository.findById(
                        usuarioSalvo.getId()
                )
                .orElseThrow();
    }

    public Usuario atualizar(
            Integer id,
            Usuario dados
    ) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElseThrow(
                                () -> new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Usuário não encontrado."
                                )
                        );

        usuario.setNome(
                dados.getNome()
        );

        usuario.setUfUsuario(
                dados.getUfUsuario()
        );

        if (dados.getStatus() != null) {

            Integer statusId =
                    dados.getStatus()
                            .getId();

            usuario.setStatus(
                    statusRepository
                            .findById(statusId)
                            .orElseThrow(
                                    () -> new ResponseStatusException(
                                            HttpStatus.NOT_FOUND,
                                            "Status não encontrado."
                                    )
                            )
            );
        }

        if (dados.getSenhaHash() != null &&
                !dados.getSenhaHash().isBlank()) {

            usuario.setSenhaHash(
                    encoder.encode(
                            dados.getSenhaHash()
                    )
            );
        }

        if (dados.getFotoUrl() != null &&
                !dados.getFotoUrl().isBlank()) {

            usuario.setFotoUrl(
                    dados.getFotoUrl()
            );
        }

        if (dados.getContato() != null) {

            Contato contatoExistente =
                    usuario.getContato();

            Contato contatoNovo =
                    dados.getContato();

            if (contatoExistente == null) {

                contatoExistente =
                        new Contato();

                usuario.setContato(
                        contatoExistente
                );
            }

            contatoExistente.setNome(
                    contatoNovo.getNome()
            );

            contatoExistente.setCidade(
                    contatoNovo.getCidade()
            );

            contatoExistente.setUf(
                    contatoNovo.getUf()
            );

            contatoExistente.setNumeroCelular(
                    contatoNovo.getNumeroCelular()
            );
        }

        Usuario usuarioAtualizado =
                usuarioRepository.save(
                        usuario
                );

        return usuarioRepository.findById(
                        usuarioAtualizado.getId()
                )
                .orElseThrow();
    }

    public List<Usuario> listarTodos() {

        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(
            Integer id
    ) {

        return usuarioRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Usuário não encontrado."
                        )
                );
    }

    public void excluir(
            Integer id
    ) {

        if (!usuarioRepository.existsById(id)) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Usuário não encontrado."
            );
        }

        usuarioRepository.deleteById(
                id
        );
    }

    @Transactional
    public void solicitarRecuperacaoSenha(

            String email

    ) {

        Usuario usuario =

                usuarioRepository
                        .findByContatoEmail(
                                email
                        )
                        .orElseThrow(

                () -> new RuntimeException(
                        "E-mail não encontrado."
                )
        );

        recuperacaoSenhaRepository
                .findByUsuario(
                        usuario
                )
                .ifPresent(

                        recuperacaoSenhaRepository::delete
                );

        RecuperacaoSenha recuperacao =
                new RecuperacaoSenha();

        recuperacao.setUsuario(
                usuario
        );

        recuperacao.gerarToken();

        recuperacaoSenhaRepository.save(
                recuperacao
        );

        emailService.enviarEmailRecuperacao(

                email,

                recuperacao.getToken()
        );
    }
    public void redefinirSenha(
            String token,
            String novaSenha
    ) {

        RecuperacaoSenha recuperacao =
                recuperacaoSenhaRepository
                        .findByToken(
                                token
                        )
                        .orElseThrow(
                                () -> new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Token inválido."
                                )
                        );

        if (recuperacao.getExpiracao()
                .isBefore(
                        LocalDateTime.now()
                )) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Token expirado."
            );
        }

        Usuario usuario =
                recuperacao.getUsuario();

        usuario.setSenhaHash(
                encoder.encode(
                        novaSenha
                )
        );

        usuarioRepository.save(
                usuario
        );

        recuperacaoSenhaRepository.delete(
                recuperacao
        );
    }
}