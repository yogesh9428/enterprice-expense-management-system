package com.enterprise.expense.management.service;

import com.enterprise.expense.management.dto.ExpenseDTO;
import com.enterprise.expense.management.dto.UserDTO;
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
import java.util.stream.Collectors;

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

    public ExpenseDTO createExpense(Expense expense, String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        expense.setUser(user);
        expense.setStatus(ExpenseStatus.PENDING);

        Expense saveExpense = expenseRepository.save(expense);
        auditLogService.logAction("Created expense with ID " + saveExpense.getId(), user);

        return modelMapper.map(saveExpense , ExpenseDTO.class);
    }

    public List<ExpenseDTO> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return expenses.stream().map
        (expense -> modelMapper.map(expense , ExpenseDTO.class))
                .collect(Collectors.toList());
    }

    public ExpenseDTO getExpenseById(UUID id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Expense not found"));
        return modelMapper.map(expense , ExpenseDTO.class);
    }

    public ExpenseDTO updateExpense(UUID id, Expense updatedExpense) {
        Expense existingExpense = expenseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Expense not found !!")
        );
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setReceiptUrl(updatedExpense.getReceiptUrl());
        Expense expense = expenseRepository.save(existingExpense);
        return modelMapper.map(expense , ExpenseDTO.class);
    }

    public void deleteExpense(UUID id) {
        if (!expenseRepository.existsById(id)){
            throw new RuntimeException("Expense does not found");
        }
        expenseRepository.deleteById(id);
    }
}
