package com.enterprise.expense.management.service;

import com.enterprise.expense.management.entity.Expense;
import com.enterprise.expense.management.entity.ExpenseStatus;
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
    private ModelMapper modelMapper;

    @Autowired
    private AuditLogService auditLogService;

    public Expense createExpense(Expense expense, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expense.setUser(user);
        expense.setUserName(user.getName());
        expense.setStatus(ExpenseStatus.PENDING);

        Expense saveExpense = expenseRepository.save(expense);
        auditLogService.logAction("Created expense with ID " + saveExpense.getId(), user);

        return saveExpense;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(UUID id) {
        return expenseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Expense not found"));
    }

    public Expense updateExpense(UUID id, Expense updatedExpense) {
        Expense existingExpense = expenseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Expense not found !!")
        );
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setReceiptUrl(updatedExpense.getReceiptUrl());
        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(UUID id) {
        if (!expenseRepository.existsById(id)){
            throw new RuntimeException("Expense does not found");
        }
        expenseRepository.deleteById(id);
    }
}
