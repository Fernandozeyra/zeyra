/**
 * Gera uma senha aleatória com 8 dígitos
 * @returns {string} Senha aleatória de 8 caracteres
 */
export function generateRandomPassword() {
  // Caracteres que podem ser usados na senha
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  
  let password = '';
  
  // Gera 8 caracteres aleatórios
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  return password;
}

/**
 * Gera uma senha aleatória com 8 dígitos (apenas números)
 * @returns {string} Senha numérica de 8 dígitos
 */
export function generateNumericPassword() {
  let password = '';
  
  // Gera 8 dígitos aleatórios
  for (let i = 0; i < 8; i++) {
    password += Math.floor(Math.random() * 10);
  }
  
  return password;
}

/**
 * Gera uma senha aleatória com 8 dígitos (apenas letras)
 * @returns {string} Senha alfabética de 8 caracteres
 */
export function generateAlphabeticPassword() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let password = '';
  
  // Gera 8 letras aleatórias
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    password += letters[randomIndex];
  }
  
  return password;
}

/**
 * Gera uma senha aleatória com 8 dígitos (apenas letras maiúsculas)
 * @returns {string} Senha de 8 caracteres em maiúsculas
 */
export function generateUppercasePassword() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  
  // Gera 8 letras maiúsculas aleatórias
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    password += letters[randomIndex];
  }
  
  return password;
}
