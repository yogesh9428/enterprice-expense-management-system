package com.enterprise.expense.management.repository;

import com.enterprise.expense.management.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApprovalRepository extends JpaRepository<Approval, UUID> {
    List<Approval> findByStatus(String status);
}
