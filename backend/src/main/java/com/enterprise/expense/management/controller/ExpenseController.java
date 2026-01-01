package com.enterprise.expense.management.controller;

import com.enterprise.expense.management.entity.Expense;
import com.enterprise.expense.management.entity.Role;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense , Authentication authentication) {
        Expense newexpense = expenseService.createExpense(expense , authentication.getName());
        return ResponseEntity.ok(newexpense);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable UUID id) {
        try{
            Expense expense = expenseService.getExpenseById(id);
            return ResponseEntity.ok(expense);
        }
        catch (RuntimeException e){
            return ResponseEntity.status(404).body("Expense does not exist");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable UUID id, @RequestBody Expense expense) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user.getRole() == Role.EMPLOYEE &&
                    !existingExpense.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("You cannot update others' expenses");
            }

            Expense updatedexpense = expenseService.updateExpense(id, expense);
            return ResponseEntity.ok(updatedexpense);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Expense does not exist");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable UUID id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.ok("Expense deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Expense does not exist");
        }
    }
}
