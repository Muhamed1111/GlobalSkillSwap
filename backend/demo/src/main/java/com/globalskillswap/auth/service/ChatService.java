package com.globalskillswap.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.globalskillswap.auth.entity.ChatMessage;
import com.globalskillswap.auth.repo.ChatMessageRepository;

@Service
public class ChatService {
    private final ChatMessageRepository repo;
    public ChatService(ChatMessageRepository repo){
        this.repo=repo;
    }
    public List<ChatMessage> getConversation(Long user1, Long user2){
        return repo.getConversation(user1, user2);
    }
    public ChatMessage sendMessage (ChatMessage message){
        
        message.setSentAt(LocalDateTime.now());
        return repo.save(message);
    }

}
