package com.globalskillswap.auth.service;

import com.globalskillswap.auth.entity.Job;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
    }

    public Job save(Job job) {
        return jobRepo.save(job);
    }

    public List<Job> getAll() {
        return jobRepo.findAll();
    }

    public List<Job> getByUser(User user) {
        return jobRepo.findByUser(user);
    }

    public Job getById(Long id) {
        return jobRepo.findById(id).orElse(null);
    }

    public boolean deleteJob(Long id, User user) {
        return jobRepo.findById(id)
                .filter(job -> job.getUser().getId().equals(user.getId()))
                .map(job -> {
                    jobRepo.delete(job);
                    return true;
                })
                .orElse(false);
    }
}
