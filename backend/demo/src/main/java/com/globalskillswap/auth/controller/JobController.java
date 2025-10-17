package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.Job;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final UserRepository userRepo;

    public JobController(JobService jobService, UserRepository userRepo) {
        this.jobService = jobService;
        this.userRepo = userRepo;
    }

    // POST – kreiranje novog posla
    @PostMapping
    public ResponseEntity<?> postJob(@RequestBody Job job, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Missing or invalid token");
        }

        String email = principal.getName();
        User user = userRepo.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found for token email: " + email);
        }

        job.setUser(user);
        Job saved = jobService.save(job);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // GET – svi poslovi (javni prikaz)
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAll();
        return ResponseEntity.ok(jobs);
    }

    // GET – samo moji poslovi
    @GetMapping("/my")
    public ResponseEntity<?> getMyJobs(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Missing or invalid token");
        }

        String email = principal.getName();
        User user = userRepo.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        List<Job> myJobs = jobService.getByUser(user);
        return ResponseEntity.ok(myJobs);
    }

    //DELETE – brisanje posla 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String email = principal.getName();
        User user = userRepo.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        boolean deleted = jobService.deleteJob(id, user);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not allowed to delete this job");
        }

        return ResponseEntity.ok("Job deleted successfully");
    }
}
