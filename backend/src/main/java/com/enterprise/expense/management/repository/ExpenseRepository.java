package com.enterprise.expense.management.repository;

import com.enterprise.expense.management.entity.Expense;
import com.enterprise.expense.management.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense , UUID> {

    List<Expense> findByUserId(UUID userId);

    List<Expense> findByUserRole(Role role);

    List<Expense> findByUser_Manager_Id(UUID managerId);


}
