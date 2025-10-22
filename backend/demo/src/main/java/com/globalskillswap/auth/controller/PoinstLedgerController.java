package com.globalskillswap.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.globalskillswap.auth.entity.PointsLedger;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.PointsLedgerService;

import java.util.List;
import com.globalskillswap.auth.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/api/mypoints")
public class PoinstLedgerController {
    private final PointsLedgerService ledgerService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public PoinstLedgerController(PointsLedgerService ledSer,JwtUtil jwt,UserRepository repo){
        this.ledgerService = ledSer;
        this.jwtUtil=jwt;
        this.userRepo=repo;
    }
    @GetMapping("/ledger")
    public List<PointsLedger> getLedgerHistory(@RequestHeader("Authorization") String authHeader) {
    if(authHeader==null || !authHeader.startsWith("Bearer ")){
        throw new RuntimeException("Missing or invalid auth header!");
    }

    String token=authHeader.substring(7);
    String email=jwtUtil.extractEmail(token);
    User user = userRepo.findByEmail(email);
    return ledgerService.getHistoryForUser(user.getId());
    }
}
