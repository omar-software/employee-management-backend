package com.omar.employeemanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.omar.employeemanagement.model.Employee;
import com.omar.employeemanagement.repository.EmployeeRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    public DataSeeder(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) {
        if (employeeRepository.count() == 0) {
            employeeRepository.save(new Employee(null, "Omar", "Ali", "omar@example.com"));
            employeeRepository.save(new Employee(null, "Sara", "Ahmad", "sara@example.com"));
            employeeRepository.save(new Employee(null, "Khaled", "Hassan", "khaled@example.com"));
        }
    }
}