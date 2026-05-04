package br.com.respetcure.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(
            JavaMailSender mailSender
    ) {

        this.mailSender =
                mailSender;
    }

    public void enviarEmailRecuperacao(

            String destino,
            String token

    ) {

        try {

            String link =
                    "http://localhost:5173/redefinir-senha?token="
                            + token;

            SimpleMailMessage mensagem =
                    new SimpleMailMessage();

            mensagem.setTo(
                    destino
            );

            mensagem.setSubject(
                    "Recuperação de senha"
            );

            mensagem.setText(

                    "Olá!\n\n" +

                            "Clique no link abaixo para redefinir sua senha:\n\n"

                            + link +

                            "\n\nEsse link expira em 15 minutos."
            );

            mailSender.send(
                    mensagem
            );

            System.out.println(

                    "E-mail enviado com sucesso."
            );

        } catch (

                Exception e

        ) {

            System.out.println(

                    "Falha ao enviar e-mail: "

                            + e.getMessage()
            );
        }
    }
}