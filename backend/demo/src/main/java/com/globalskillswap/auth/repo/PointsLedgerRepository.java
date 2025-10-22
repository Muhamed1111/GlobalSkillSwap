package com.globalskillswap.auth.repo;

import com.globalskillswap.auth.entity.PointsLedger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


public interface PointsLedgerRepository extends JpaRepository<PointsLedger, Long> {
    @Query("SELECT COALESCE(SUM(p.delta), 0) FROM PointsLedger p WHERE p.userId = :userId")
    int sumPointsByUserId(@Param("userId") Long userId);

    List<PointsLedger> findByUserIdOrderByCreatedAtDesc(Long userId);
}
