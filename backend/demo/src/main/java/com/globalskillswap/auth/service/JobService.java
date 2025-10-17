package com.globalskillswap.auth.service;

import com.globalskillswap.auth.entity.Job;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public boolean deleteJob(Long id, User user) {
        Optional<Job> job = jobRepo.findById(id);
        if (job.isPresent() && job.get().getUser().getId().equals(user.getId())) {
            jobRepo.delete(job.get());
            return true;
        }
        return false;
    }
}
