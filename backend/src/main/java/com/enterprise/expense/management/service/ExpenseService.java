package com.enterprise.expense.management.service;

import com.enterprise.expense.management.entity.Expense;
import com.enterprise.expense.management.entity.ExpenseStatus;
import com.enterprise.expense.management.entity.Role;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.repository.ExpenseRepository;
import com.enterprise.expense.management.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuditLogService auditLogService;

    public Expense createExpense(Expense expense, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expense.setUser(user);
        expense.setUserName(user.getName());
        if (user.getRole() == Role.EMPLOYEE) {
            expense.setStatus(ExpenseStatus.MANAGER_APPROVAL_PENDING);
//            auditLogService.logAction("Expense submitted, awaiting manager approval", user);
        }
        else if (user.getRole() == Role.MANAGER) {
            expense.setStatus(ExpenseStatus.ADMIN_APPROVAL_PENDING);
//            auditLogService.logAction("Expense submitted by manager, awaiting admin approval", user);
        }
        else {
            throw new RuntimeException("Only Employee or Manager can create expense");
        }

        if (expense.getStatus() == null) {
            throw new RuntimeException("Expense status could not be determined");
        }

        Expense saveExpense = expenseRepository.save(expense);
        auditLogService.logAction(
                "Expense created and submitted. Current status: " + expense.getStatus(),
                user
        );


        return saveExpense;
    }

    public Expense managerApproveExpense(UUID expenseId, String email) {

        User manager = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (manager.getRole() != Role.MANAGER) {
            throw new RuntimeException("Only Manager can approve at this stage");
        }

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (expense.getStatus() != ExpenseStatus.MANAGER_APPROVAL_PENDING) {
            throw new RuntimeException("Expense is not pending manager approval");
        }

        if (expense.getUser().getManager() == null ||
                !expense.getUser().getManager().getId().equals(manager.getId())) {
            throw new RuntimeException("You can approve only your team's expenses");
        }


        expense.setStatus(ExpenseStatus.ADMIN_APPROVAL_PENDING);
        expense.setManagerApprovedAt(java.time.LocalDateTime.now());

        Expense saved = expenseRepository.save(expense);

        auditLogService.logAction(
                "Manager approved expense. Sent for admin approval.",
                manager
        );

        return saved;
    }

    public Expense adminApproveExpense(UUID expenseId, String email) {

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only Admin can approve at this stage");
        }

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (expense.getStatus() != ExpenseStatus.ADMIN_APPROVAL_PENDING) {
            throw new RuntimeException("Expense is not pending admin approval");
        }

        expense.setStatus(ExpenseStatus.APPROVED);
        expense.setAdminApprovedAt(java.time.LocalDateTime.now());

        Expense saved = expenseRepository.save(expense);

        auditLogService.logAction(
                "Admin approved expense. Expense fully approved.",
                admin
        );

        return saved;
    }

    public Expense rejectExpense(UUID expenseId, String email, String reason) {

        User approver = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (expense.getStatus() == ExpenseStatus.APPROVED) {
            throw new RuntimeException("Approved expense cannot be rejected");
        }

        if (approver.getRole() == Role.MANAGER &&
                expense.getStatus() != ExpenseStatus.MANAGER_APPROVAL_PENDING) {
            throw new RuntimeException("Manager can reject only at manager approval stage");
        }

        if (approver.getRole() == Role.ADMIN &&
                expense.getStatus() != ExpenseStatus.ADMIN_APPROVAL_PENDING) {
            throw new RuntimeException("Admin can reject only at admin approval stage");
        }

        expense.setStatus(ExpenseStatus.REJECTED);
        expense.setRejectionReason(reason);

        Expense saved = expenseRepository.save(expense);

        auditLogService.logAction(
                "Expense rejected by " + approver.getRole() + ". Reason: " + reason,
                approver
        );

        return saved;
    }

    public List<Expense> getAllExpenses(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            return expenseRepository.findAll();
        }

        if (user.getRole() == Role.MANAGER) {
            return expenseRepository.findByUser_Manager_Id(user.getId());
        }

        // EMPLOYEE
        return expenseRepository.findByUserId(user.getId());
    }


    public Expense getExpenseById(UUID expenseId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (user.getRole() == Role.ADMIN) {
            return expense;
        }

        if (user.getRole() == Role.MANAGER &&
                expense.getUser().getRole() == Role.EMPLOYEE &&
                expense.getUser().getManager() != null &&
                expense.getUser().getManager().getId().equals(user.getId())) {
            return expense;
        }


        if (user.getRole() == Role.EMPLOYEE &&
                expense.getUser().getId().equals(user.getId())) {
            return expense;
        }

        throw new RuntimeException("You are not authorized to view this expense");
    }


    public Expense updateExpense(UUID id, Expense updatedExpense) {
        Expense existingExpense = expenseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Expense not found !!")
        );

        if (existingExpense.getStatus() == ExpenseStatus.APPROVED) {
            throw new RuntimeException("Approved expense cannot be modified");
        }

        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setReceiptUrl(updatedExpense.getReceiptUrl());
        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(UUID expenseId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (expense.getStatus() == ExpenseStatus.APPROVED) {
            throw new RuntimeException("Approved expense cannot be deleted");
        }

        if (user.getRole() == Role.ADMIN) {
            expenseRepository.delete(expense);
            return;
        }

        if (user.getRole() == Role.MANAGER &&
                expense.getUser().getRole() == Role.EMPLOYEE &&
                expense.getUser().getManager() != null &&
                expense.getUser().getManager().getId().equals(user.getId())) {
            expenseRepository.delete(expense);
            return;
        }


        if (user.getRole() == Role.EMPLOYEE &&
                expense.getUser().getId().equals(user.getId())) {
            expenseRepository.delete(expense);
            return;
        }

        throw new RuntimeException("You are not authorized to delete this expense");
    }

}
