package com.enterprise.expense.management.repository;

import com.enterprise.expense.management.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense , UUID> {

}
