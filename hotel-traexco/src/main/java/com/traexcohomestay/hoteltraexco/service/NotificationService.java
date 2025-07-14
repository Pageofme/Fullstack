package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.Notification;
import com.traexcohomestay.hoteltraexco.model.User;

public interface NotificationService {
    void sendEmail(User user, Notification notification);
//    void sendSMS(User user, Notification notification);
}