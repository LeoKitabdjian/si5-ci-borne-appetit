package fr.unice.politech.borneappetit;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class BorneappetitApplication {
	public static void main(String[] args) {
		SpringApplication.run(BorneappetitApplication.class, args);
	}
}
