package com.enterprise.expense.management.repository;

import com.enterprise.expense.management.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReportRepository extends JpaRepository<Report , UUID> {

}
