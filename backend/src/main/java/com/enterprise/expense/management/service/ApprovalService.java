package com.enterprise.expense.management.service;

import com.enterprise.expense.management.entity.Approval;
import com.enterprise.expense.management.entity.Expense;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.repository.ApprovalRepository;
import com.enterprise.expense.management.repository.ExpenseRepository;
import com.enterprise.expense.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ApprovalService {

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    public Approval submitForApproval(UUID expenseId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        Approval approval = new Approval();
        approval.setExpense(expense);
        approval.setStatus("PENDING");

        return approvalRepository.save(approval);
    }

    public Approval approveExpense(UUID id , String managerEmail) {
        Approval approval = approvalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Approval not found"));

        User manager = userRepository.findByEmail(managerEmail);
        if (manager == null) {
            throw new RuntimeException("Manager not found");
        }

        if ("PENDING".equals(approval.getStatus())) {
            approval.setStatus("INPROCESS");
            approvalRepository.save(approval);
        }

        if ("INPROCESS".equals(approval.getStatus())) {
            approval.setStatus("APPROVED");
            approval.setManager(manager);
            approval.setApprovedAt(LocalDateTime.now());
        } else if ("REJECTED".equals(approval.getStatus())) {
            throw new RuntimeException("This expense is already rejected");
        } else if ("APPROVED".equals(approval.getStatus())) {
            throw new RuntimeException("This expense is already approved");
        } else {
            throw new RuntimeException("Something went wrong");
        }

        auditLogService.logAction("Approved expense with ID " + approval.getExpense().getId(), manager);
        return approvalRepository.save(approval);
    }

    public Approval rejectExpense(UUID id , String managerEmail) {
        Approval approval = approvalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Approval not found"));

        User manager = userRepository.findByEmail(managerEmail);
        if (manager == null) {
            throw new RuntimeException("Manager not found");
        }

        if ("PENDING".equals(approval.getStatus())) {
            approval.setStatus("INPROCESS");
            approvalRepository.save(approval);
        }

        if ("INPROCESS".equals(approval.getStatus())) {
            approval.setStatus("REJECTED");
            approval.setManager(manager);
            approval.setApprovedAt(LocalDateTime.now());
        } else if ("APPROVED".equals(approval.getStatus())) {
            throw new RuntimeException("This expense is already approved");
        } else if ("REJECTED".equals(approval.getStatus())) {
            throw new RuntimeException("This expense is already rejected");
        } else {
            throw new RuntimeException("Something went wrong");
        }

        return approvalRepository.save(approval);
    }

    public List<Approval> getPendingApprovals() {
        return approvalRepository.findByStatus("PENDING");
    }

    public Approval getApprovalById(UUID id) {
        return approvalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Approval not found"));
    }
}
