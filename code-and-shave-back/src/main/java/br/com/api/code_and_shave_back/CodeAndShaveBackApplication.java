package br.com.api.code_and_shave_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication // (exclude = {SecurityAutoConfiguration.class})
public class CodeAndShaveBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeAndShaveBackApplication.class, args);
	}

}