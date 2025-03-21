package com.enterprise.expense.management.controller;

import com.enterprise.expense.management.entity.Approval;
import com.enterprise.expense.management.service.ApprovalService;
import com.enterprise.expense.management.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/approvals")
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;


    @PostMapping("/{expenseId}")
    public ResponseEntity<Approval> submitExpenseForApproval(@PathVariable UUID expenseId) {
        Approval approval = approvalService.submitForApproval(expenseId);
        return ResponseEntity.ok(approval);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Approval> approveExpense(@PathVariable UUID id , Authentication authentication) {
        Approval approved = approvalService.approveExpense(id , authentication.getName());
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Approval> rejectExpense(@PathVariable UUID id , Authentication authentication) {
        Approval rejected = approvalService.rejectExpense(id , authentication.getName());
        return ResponseEntity.ok(rejected);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Approval>> getPendingApprovals() {
        List<Approval> approvals = approvalService.getPendingApprovals();
        return ResponseEntity.ok(approvals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Approval> getApprovalById(@PathVariable UUID id) {
        Approval approval = approvalService.getApprovalById(id);
        return ResponseEntity.ok(approval);
    }
}
