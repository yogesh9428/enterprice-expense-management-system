package com.enterprise.expense.management.service;

import com.enterprise.expense.management.entity.Role;
import com.enterprise.expense.management.entity.User;
import com.enterprise.expense.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    /**
     * Assign one employee to one manager
     * ADMIN ONLY
     */
    public void assignEmployeeToManager(UUID employeeId, UUID managerId, String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admin can assign manager to employee");
        }

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new RuntimeException("User is not an employee");
        }

        if (manager.getRole() != Role.MANAGER) {
            throw new RuntimeException("User is not a manager");
        }

        employee.setManager(manager);
        userRepository.save(employee);

        auditLogService.logAction(
                "Admin mapped employee " + employee.getName() +
                        " to manager " + manager.getName(),
                admin
        );
    }

    /**
     * Remove manager from employee
     * ADMIN ONLY
     */
    public void removeManagerFromEmployee(UUID employeeId, String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admin can remove manager mapping");
        }

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new RuntimeException("User is not an employee");
        }

        employee.setManager(null);
        userRepository.save(employee);

        auditLogService.logAction(
                "Admin removed manager mapping for employee " + employee.getName(),
                admin
        );
    }
}
