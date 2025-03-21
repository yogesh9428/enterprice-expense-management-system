package com.enterprise.expense.management.repository;

import com.enterprise.expense.management.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuditLogRepository extends JpaRepository<AuditLog , UUID> {

}
