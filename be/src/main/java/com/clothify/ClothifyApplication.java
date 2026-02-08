package com.clothify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ClothifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClothifyApplication.class, args);
        System.out.println("\n==============================================");
        System.out.println("🚀 Clothify Backend is running!");
        System.out.println("📚 API Docs: http://localhost:8080/api/swagger-ui.html");
        System.out.println("🗄️  Database: Supabase PostgreSQL");
        System.out.println("==============================================\n");
    }
}
