package com.enterprise.expense.management.service;

import com.enterprise.expense.management.entity.AuditLog;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }

    public AuditLog getLogById(UUID id) {
        return auditLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audit log not found"));
    }

    public void logAction(String action, User user) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setUser(user);
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
