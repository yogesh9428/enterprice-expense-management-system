package com.enterprise.expense.management.dto;

import com.enterprise.expense.management.entity.ExpenseStatus;


import java.util.UUID;

public class ExpenseDTO {
    private UUID id;
    private String category;
    private double amount;
    private String description;
    private String receiptUrl;
    private ExpenseStatus status;
    private UserDTO user;

    public ExpenseDTO(UUID id, String category, double amount, String description, String receiptUrl, ExpenseStatus status, UserDTO user) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.receiptUrl = receiptUrl;
        this.status = status;
        this.user = user;
    }

    public ExpenseDTO() {
    }

    public UUID getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public String getReceiptUrl() {
        return receiptUrl;
    }

    public ExpenseStatus getStatus() {
        return status;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setReceiptUrl(String receiptUrl) {
        this.receiptUrl = receiptUrl;
    }

    public void setStatus(ExpenseStatus status) {
        this.status = status;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
