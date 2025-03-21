package com.enterprise.expense.management.controller;

import com.enterprise.expense.management.dto.ExpenseDTO;
import com.enterprise.expense.management.entity.Expense;
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
    public ResponseEntity<ExpenseDTO> createExpense(@RequestBody Expense expense , Authentication authentication) {
        ExpenseDTO expenseDTO = expenseService.createExpense(expense , authentication.getName());
        return ResponseEntity.ok(expenseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable UUID id) {
        try{
            ExpenseDTO expenseDTO = expenseService.getExpenseById(id);
            return ResponseEntity.ok(expenseDTO);
        }
        catch (RuntimeException e){
            return ResponseEntity.status(404).body("Expense does not exist");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable UUID id, @RequestBody Expense expense) {
        try {
            ExpenseDTO expenseDTO = expenseService.updateExpense(id, expense);
            return ResponseEntity.ok(expenseDTO);
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
