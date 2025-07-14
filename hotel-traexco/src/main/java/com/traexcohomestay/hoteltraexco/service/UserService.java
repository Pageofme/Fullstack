package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.UserDTO;

public interface UserService {
    UserDTO getUserById(Integer id);
     UserDTO getUserByEmail(String email);
}