package com.enterprise.expense.management.entity;

public enum ExpenseStatus {
    SUBMITTED,                 // Employee created
    MANAGER_APPROVAL_PENDING,
    MANAGER_APPROVED,
    ADMIN_APPROVAL_PENDING,
    APPROVED,
    REJECTED
}
