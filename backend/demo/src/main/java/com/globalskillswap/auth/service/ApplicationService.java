package com.globalskillswap.auth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.globalskillswap.auth.entity.Application;
import com.globalskillswap.auth.entity.Job;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.ApplicationRepository;

@Service
public class ApplicationService {
     
    private ApplicationRepository repo;

    public ApplicationService(ApplicationRepository repo){
        this.repo=repo;
    }
    public Application apply(User user, Job job){
        if(repo.existsByUserAndJob(user,job)){
            throw new RuntimeException("Already applied to this job.");
        }
        Application app = new Application();
        app.setUser(user);
        app.setJob(job);
        return repo.save(app);
    }
    public List<Application> getByJob(Job job){
        return repo.findByJob(job);
    }
    public List<Application> getByUser(User user){
        return repo.findByUser(user);
    }
    

}
