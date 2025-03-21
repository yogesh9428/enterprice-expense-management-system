package com.enterprise.expense.management.controller;

import com.enterprise.expense.management.entity.Report;
import com.enterprise.expense.management.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> generateReport(@RequestBody Report report , Authentication authentication) {
        Report generatedReport = reportService.generateReport(report , authentication.getName());
        return ResponseEntity.ok(generatedReport);
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable UUID id) {
        Report report = reportService.getReportById(id);
        return ResponseEntity.ok(report);
    }
}
