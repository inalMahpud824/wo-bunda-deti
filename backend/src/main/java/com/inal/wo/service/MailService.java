package com.inal.wo.service;

import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    // private static final String FROM_ADDRESS = "inalmahpud10@gmail.com";
    private static final String FROM_ADDRESS = "wociwaruga@gmail.com";

    public void sendCodeResetPassword(String to, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(FROM_ADDRESS);
            helper.setTo(to);
            helper.setSubject("Reset Password Akun Wedding Orgnizer PKK Desa Ciwaruga");
            helper.setText(
                    String.format(
                            "Tokennya adalah <b>%s</b>. berlaku hingga 1 jam",
                            code
                    ),
                    true
            );

            mailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            log.error("Failed to send OTP email to {}", to, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal mengirim email");
        }
    }
}
