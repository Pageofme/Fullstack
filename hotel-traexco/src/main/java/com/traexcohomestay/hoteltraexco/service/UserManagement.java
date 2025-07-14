package com.traexcohomestay.hoteltraexco.service;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagement {
    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsersAndHosts() {
        return userRepo.findByRoleIn(List.of("user", "host"));
    }

    public List<User> searchByKeyword(String keyword) {
        return userRepo.findByFullNameContainingIgnoreCaseAndRoleIn(keyword, List.of("user", "host"));
    }

    public List<User> getHosts() {
        return userRepo.findByRole("host");
    }

    public List<User> getCustomers() {
        return userRepo.findByRole("user");
    }

    public User getById(Integer id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        // Chỉ cho phép lấy user có role là user hoặc host
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Access denied: not user or host");
        }

        return user;
    }

    public User create(User user) {
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Only user or host can be created");
        }
        return userRepo.save(user);
    }

    public User update(Integer id, User updated) {
        User existing = getById(id);

        // Chỉ cho update nếu là user hoặc host
        if (!existing.getRole().equals("user") && !existing.getRole().equals("host")) {
            throw new RuntimeException("Update restricted to user/host roles");
        }

        existing.setFullName(updated.getFullName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setBirthdate(updated.getBirthdate());
        existing.setStatus(updated.getStatus());
        return userRepo.save(existing);
    }

    public void delete(Integer id) {
        User user = getById(id);

        // Chỉ xoá user/host
        if (!user.getRole().equals("user") && !user.getRole().equals("host")) {
            throw new RuntimeException("Cannot delete admin accounts");
        }

        userRepo.deleteById(id);
    }
}