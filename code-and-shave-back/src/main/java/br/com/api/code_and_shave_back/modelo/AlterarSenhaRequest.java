package br.com.api.code_and_shave_back.modelo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlterarSenhaRequest {
    private String email;
    private String senhaAtual;
    private String novaSenha;
}