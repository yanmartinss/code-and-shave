package br.com.code_and_shave.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService{
     
    @Autowired
    private JavaMailSender maiLSender;

    public void enviarEmail(String para, String assunto, String corpo){
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(para);
        mensagem.setSubject(assunto);
        mensagem.setText(corpo);
        maiLSender.send(mensagem);
    
    }
}
