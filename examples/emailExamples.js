import { 
  sendEmail, 
  sendWelcomeEmail, 
  sendPasswordResetEmail,
  sendPlanNotificationEmail,
  sendTestEmail,
  verifyEmailConfig 
} from '../utils/emailUtils.js';

/**
 * Exemplos de uso do sistema de email
 */

// 1. Verificar configuração
export const testEmailConfig = async () => {
  try {
    console.log('🔍 Verificando configuração de email...');
    const isValid = await verifyEmailConfig();
    
    if (isValid) {
      console.log('✅ Configuração de email válida!');
      return true;
    } else {
      console.log('❌ Configuração de email inválida!');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao verificar configuração:', error.message);
    return false;
  }
};

// 2. Enviar email de teste
export const testEmailSending = async (testEmail) => {
  try {
    console.log(`📧 Enviando email de teste para: ${testEmail}`);
    const result = await sendTestEmail(testEmail);
    
    console.log('✅ Email de teste enviado:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar email de teste:', error.message);
    throw error;
  }
};

// 3. Simular criação de usuário com email de boas-vindas
export const simulateUserCreation = async (userData) => {
  try {
    const { email, name, password } = userData;
    
    console.log(`👋 Enviando email de boas-vindas para: ${name} (${email})`);
    
    const result = await sendWelcomeEmail(email, name, password);
    
    console.log('✅ Email de boas-vindas enviado:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar email de boas-vindas:', error.message);
    throw error;
  }
};

// 4. Simular redefinição de senha
export const simulatePasswordReset = async (userData) => {
  try {
    const { email, name } = userData;
    const resetToken = 'token_exemplo_123456';
    
    console.log(`🔐 Enviando email de redefinição para: ${name} (${email})`);
    
    const result = await sendPasswordResetEmail(email, name, resetToken);
    
    console.log('✅ Email de redefinição enviado:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar email de redefinição:', error.message);
    throw error;
  }
};

// 5. Simular notificação de plano
export const simulatePlanNotification = async (userData, planName, action) => {
  try {
    const { email, name } = userData;
    
    console.log(`📋 Enviando notificação de plano para: ${name} (${email})`);
    
    const result = await sendPlanNotificationEmail(email, name, planName, action);
    
    console.log('✅ Notificação de plano enviada:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar notificação de plano:', error.message);
    throw error;
  }
};

// 6. Enviar email personalizado
export const sendCustomEmail = async (emailData) => {
  try {
    const { to, subject, text, html } = emailData;
    
    console.log(`📧 Enviando email personalizado para: ${to}`);
    
    const result = await sendEmail(to, subject, text, html);
    
    console.log('✅ Email personalizado enviado:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar email personalizado:', error.message);
    throw error;
  }
};

// 7. Exemplo completo de uso
export const runEmailExamples = async () => {
  console.log('🚀 Iniciando exemplos de email...\n');
  
  try {
    // Verificar configuração
    const configValid = await testEmailConfig();
    
    if (!configValid) {
      console.log('❌ Configuração inválida. Verifique as variáveis de ambiente.');
      return;
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Dados de exemplo
    const testUser = {
      email: 'teste@exemplo.com',
      name: 'Usuário Teste',
      password: 'senha123'
    };
    
    // Email de teste
    await testEmailSending(testUser.email);
    
    console.log('\n' + '-'.repeat(30) + '\n');
    
    // Email de boas-vindas
    await simulateUserCreation(testUser);
    
    console.log('\n' + '-'.repeat(30) + '\n');
    
    // Email de redefinição
    await simulatePasswordReset(testUser);
    
    console.log('\n' + '-'.repeat(30) + '\n');
    
    // Notificação de plano
    await simulatePlanNotification(testUser, 'Plano Premium', 'atualizado');
    
    console.log('\n' + '-'.repeat(30) + '\n');
    
    // Email personalizado
    await sendCustomEmail({
      to: testUser.email,
      subject: 'Email Personalizado - Neogen',
      text: 'Este é um email personalizado de teste.',
      html: '<h1>Email Personalizado</h1><p>Este é um email personalizado de teste.</p>'
    });
    
    console.log('\n✅ Todos os exemplos executados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante execução dos exemplos:', error.message);
  }
};

// 8. Função para testar apenas a configuração
export const quickConfigTest = async () => {
  try {
    const isValid = await verifyEmailConfig();
    
    if (isValid) {
      console.log('✅ Configuração de email OK!');
      return true;
    } else {
      console.log('❌ Configuração de email com problemas!');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    return false;
  }
};

// Executar exemplos se o arquivo for executado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runEmailExamples();
}
