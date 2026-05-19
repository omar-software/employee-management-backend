package com.omar.employeemanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.omar.employeemanagement.model.Employee;
import com.omar.employeemanagement.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee createEmployee(Employee employee) {
        String email = employee.getEmail().trim().toLowerCase();

        employeeRepository.findByEmail(email)
                .ifPresent(existingEmployee -> {
                    throw new IllegalArgumentException("Employee with this email already exists");
                });

        employee.setEmail(email);

        return employeeRepository.save(employee);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> updateEmployee(Long id, Employee employeeDetails) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    String email = employeeDetails.getEmail().trim().toLowerCase();

                    employeeRepository.findByEmail(email)
                            .ifPresent(existingEmployee -> {
                                if (!existingEmployee.getId().equals(id)) {
                                    throw new IllegalArgumentException("Employee with this email already exists");
                                }
                            });

                    employee.setFirstName(employeeDetails.getFirstName().trim());
                    employee.setLastName(employeeDetails.getLastName().trim());
                    employee.setEmail(email);

                    return employeeRepository.save(employee);
                });
    }

    public boolean deleteEmployee(Long id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.delete(employee);
                    return true;
                })
                .orElse(false);
    }
}