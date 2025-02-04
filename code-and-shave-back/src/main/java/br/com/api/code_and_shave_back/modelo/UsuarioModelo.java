package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;

@Entity
@Table(name = "usuarios")
//@Getter
//@Setter
public class UsuarioModelo {

    public Long getID() {
        return ID;
    }
    public void setID(Long iD) {
        ID = iD;
    }
    public String getEMAIL() {
        return EMAIL;
    }
    public void setEMAIL(String eMAIL) {
        EMAIL = eMAIL;
    }
    public String getNOME() {
        return NOME;
    }
    public void setNOME(String nOME) {
        NOME = nOME;
    }
    public String getTELEFONE() {
        return TELEFONE;
    }
    public void setTELEFONE(String tELEFONE) {
        TELEFONE = tELEFONE;
    }
    public String getSENHA() {
        return SENHA;
    }
    public void setSENHA(String sENHA) {
        SENHA = sENHA;
    }
    public String getTIPO() {
        return TIPO;
    }
    public void setTIPO(String tIPO) {
        TIPO = tIPO;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(unique = true, nullable = false)
    private String EMAIL;
    @Column(nullable = false)
    private String NOME;
    @Column(unique = true, nullable = false)
    private String TELEFONE;
    @Column(nullable = false)
    private String SENHA;
    @Column(nullable = false)
    private String TIPO;
}
