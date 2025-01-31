package br.com.code_and_shave.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF (para desenvolvimento)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/usuarios/**").permitAll() // Permite acesso público a /usuarios
                .anyRequest().permitAll() // Permite acesso a todas as outras rotas também
            )
            .formLogin(form -> form.disable()) // Desativa o redirecionamento para /login
            .httpBasic(httpBasic -> httpBasic.disable()); // Desativa autenticação básica

        return http.build();
    }
}
