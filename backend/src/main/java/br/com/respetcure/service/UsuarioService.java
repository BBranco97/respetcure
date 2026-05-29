package br.com.respetcure.service;

import br.com.respetcure.model.Contato;
import br.com.respetcure.model.RecuperacaoSenha;
import br.com.respetcure.model.Usuario;
import br.com.respetcure.repository.RecuperacaoSenhaRepository;
import br.com.respetcure.repository.UsuarioRepository;
import br.com.respetcure.repository.dominio.StatusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            StatusRepository statusRepository,
            RecuperacaoSenhaRepository recuperacaoSenhaRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder
    )
    {
        this.usuarioRepository = usuarioRepository;
        this.statusRepository = statusRepository;
        this.recuperacaoSenhaRepository =  recuperacaoSenhaRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }
    public Usuario salvar(
            Usuario usuario
    ) {

        if (usuario.getNome() == null ||
                usuario.getNome().isBlank() ||
                usuario.getSenhaHash() == null ||
                usuario.getSenhaHash().isBlank() ||
                usuario.getUfUsuario() == null ||
                usuario.getUfUsuario().isBlank() ||
                usuario.getContato() == null ||
                usuario.getContato().getEmail() == null ||
                usuario.getContato().getEmail().isBlank() ||
                usuario.getContato().getCidade() == null ||
                usuario.getContato().getCidade().isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Dados obrigatorios nao informados."
            );
        }

        if (usuarioRepository.existsByNome(
                usuario.getNome()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuário já cadastrado."
            );
        }

        if (usuarioRepository.existsByContatoEmail(
                usuario.getContato()
                        .getEmail()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "E-mail ja cadastrado."
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
                passwordEncoder.encode(
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
                    passwordEncoder.encode(
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

            if (contatoNovo.getEmail() != null &&
                    !contatoNovo.getEmail().isBlank()) {

                contatoExistente.setEmail(
                        contatoNovo.getEmail()
                );
            }
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

    public Page<Usuario> listarTodos(
            Pageable pageable
    ) {

        return usuarioRepository.findAll(
                pageable
        );
    }

    public Usuario autenticar(
            String email,
            String senha
    ) {

        if (email == null || email.isBlank() ||
                senha == null || senha.isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email e senha sao obrigatorios."
            );
        }

        Usuario usuario =
                usuarioRepository
                        .findByContatoEmail(
                                email.trim()
                        )
                        .orElseThrow(
                                () -> new ResponseStatusException(
                                        HttpStatus.UNAUTHORIZED,
                                        "Email ou senha invalidos."
                                )
                        );

        if (!passwordEncoder.matches(
                senha,
                usuario.getSenhaHash()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Email ou senha invalidos."
            );
        }

        return usuario;
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
                passwordEncoder.encode(
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
