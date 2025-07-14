package com.traexcohomestay.hoteltraexco.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/host")
public class HostController {
    @GetMapping("/dashboard")
    public String hostOnly() {
        return "Chào HOST!";
    }
}