package com.omar.employeemanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.omar.employeemanagement.user.AppUser;
import com.omar.employeemanagement.user.AppUserRepository;

// هذا الكلاس مسؤول عن إضافة مستخدم افتراضي إلى قاعدة البيانات عند تشغيل التطبيق
@Configuration
public class UserSeeder {

    // هذا الـ Bean يشتغل تلقائيًا عند بداية تشغيل التطبيق
    @Bean
    public CommandLineRunner seedUsers(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            // نتحقق إذا كان المستخدم admin غير موجود في قاعدة البيانات
            // حتى لا تتم إضافته أكثر من مرة عند كل تشغيل للتطبيق
            if (appUserRepository.findByUsername("admin").isEmpty()) {

                // إنشاء مستخدم جديد باسم admin
                AppUser admin = new AppUser(
                        "admin",                         // اسم المستخدم
                        passwordEncoder.encode("1234"),  // تشفير كلمة المرور باستخدام BCrypt قبل حفظها
                        "ADMIN",                         // دور المستخدم داخل النظام
                        true                             // الحساب مفعّل
                );

                // حفظ المستخدم admin في جدول users داخل قاعدة البيانات
                appUserRepository.save(admin);
            }
        };
    }
}