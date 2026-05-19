package com.omar.employeemanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.omar.employeemanagement.model.Employee;
import com.omar.employeemanagement.service.EmployeeService;

import jakarta.validation.Valid;

@Controller
public class EmployeePageController {

    private final EmployeeService employeeService;

    public EmployeePageController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/employees-page";
    }

    @GetMapping("/employees-page")
    public String showEmployeesPage(Model model) {
        model.addAttribute("employees", employeeService.getAllEmployees());

        return "employees";
    }

    @GetMapping("/employees-page/new")
    public String showCreateEmployeeForm(Model model) {
        model.addAttribute("employee", new Employee());
        model.addAttribute("pageTitle", "Add Employee");
        model.addAttribute("formAction", "/employees-page");

        return "employee-form";
    }

    @PostMapping("/employees-page")
    public String createEmployee(
            @Valid Employee employee,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("pageTitle", "Add Employee");
            model.addAttribute("formAction", "/employees-page");

            return "employee-form";
        }

        employeeService.createEmployee(employee);

        redirectAttributes.addFlashAttribute("successMessage", "Employee added successfully");

        return "redirect:/employees-page";
    }

    @GetMapping("/employees-page/edit/{id}")
    public String showEditEmployeeForm(
            @PathVariable Long id,
            Model model
    ) {
        return employeeService.getEmployeeById(id)
                .map(employee -> {
                    model.addAttribute("employee", employee);
                    model.addAttribute("pageTitle", "Edit Employee");
                    model.addAttribute("formAction", "/employees-page/update/" + id);

                    return "employee-form";
                })
                .orElse("redirect:/employees-page");
    }

    @PostMapping("/employees-page/update/{id}")
    public String updateEmployee(
            @PathVariable Long id,
            @Valid Employee employee,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("pageTitle", "Edit Employee");
            model.addAttribute("formAction", "/employees-page/update/" + id);

            return "employee-form";
        }

        employeeService.updateEmployee(id, employee);

        redirectAttributes.addFlashAttribute("successMessage", "Employee updated successfully");

        return "redirect:/employees-page";
    }

    @GetMapping("/employees-page/delete/{id}")
    public String deleteEmployee(
            @PathVariable Long id,
            RedirectAttributes redirectAttributes
    ) {
        employeeService.deleteEmployee(id);

        redirectAttributes.addFlashAttribute("successMessage", "Employee deleted successfully");

        return "redirect:/employees-page";
    }
}