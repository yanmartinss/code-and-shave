export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
export const validatePassword = (password) => (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
);

export const formatPhone = (value) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.length > 10) {
        formatted = formatted.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (formatted.length > 6) {
        formatted = formatted.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (formatted.length > 2) {
        formatted = formatted.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    return formatted;
}

export const formatCEP = (value) => {
    let cep = value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }
    return cep;
}