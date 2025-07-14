package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.Notification;
import com.traexcohomestay.hoteltraexco.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(User user, Notification notification) {
        if (user.getEmail() != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Thông báo từ HomestayManagement: " + notification.getType());
            message.setText(notification.getMessage());
            mailSender.send(message);
        }
    }
}