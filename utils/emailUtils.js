import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

/**
 * Configuração do transporter SMTP para Hostinger
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true para porta 465, false para outras portas
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Enviar email simples
 * @param {string} to - Email do destinatário
 * @param {string} subject - Assunto do email
 * @param {string} text - Conteúdo em texto plano
 * @param {string} html - Conteúdo em HTML (opcional)
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
    };
    
    if (html) {
      mailOptions.html = html;
    }
    
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado com sucesso:', {
      to: to,
      subject: subject,
      messageId: result.messageId
    });
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email enviado com sucesso'
    };
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw new Error(`Erro ao enviar email: ${error.message}`);
  }
};

/**
 * Enviar email de boas-vindas
 * @param {string} to - Email do destinatário
 * @param {string} userName - Nome do usuário
 * @param {string} password - Senha temporária (se aplicável)
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendWelcomeEmail = async (to, userName, password = null) => {
  const subject = 'Bem-vindo ao Zeyra!';
  
  const text = `
    Olá ${userName}!
    
    Seja bem-vindo ao Zeyra! Sua conta foi criada com sucesso.
    
    ${password ? `Sua senha temporária é: ${password}` : ''}
    
    Acesse sua conta em: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
    
    Atenciosamente,
    Equipe Zeyra
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">🎉 Bem-vindo ao Zeyra!</h2>
      
      <p>Olá <strong>${userName}</strong>!</p>
      
      <p>Sua conta foi criada com sucesso e você já pode começar a usar nossa plataforma.</p>
      
      ${password ? `
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Sua senha temporária é:</strong></p>
          <p style="margin: 10px 0; font-size: 18px; font-family: monospace; color: #e74c3c;">${password}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">Recomendamos alterar esta senha no primeiro acesso.</p>
        </div>
      ` : ''}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
           style="background: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Acessar Minha Conta
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        Atenciosamente,<br>
        <strong>Equipe Zeyra</strong>
      </p>
    </div>
  `;
  
  return await sendEmail(to, subject, text, html);
};

/**
 * Enviar email de redefinição de senha
 * @param {string} to - Email do destinatário
 * @param {string} userName - Nome do usuário
 * @param {string} code - Código para redefinição
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendPasswordResetEmail = async (to, userName, code) => {
  const subject = 'Redefinição de Senha - Zeyra';
  
  const text = `
    Olá ${userName}!
    
    Você solicitou a redefinição de sua senha.
    
    Código de redefinição: ${code}
    
    Se você não solicitou esta redefinição, ignore este email.
    
    Atenciosamente,
    Equipe Zeyra
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">🔐 Redefinição de Senha</h2>
      
      <p>Olá <strong>${userName}</strong>!</p>
      
      <p>Você solicitou a redefinição de sua senha.</p>
      
      <p style="color: #666; font-size: 14px;">
        <strong>Importante:${code}</strong>.
      </p>
      
      <p style="color: #666; font-size: 14px;">
        Se você não solicitou esta redefinição, ignore este email.
      </p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        Atenciosamente,<br>
        <strong>Equipe Zeyra</strong>
      </p>
    </div>
  `;
  
  return await sendEmail(to, subject, text, html);
};

/**
 * Enviar email de notificação de plano
 * @param {string} to - Email do destinatário
 * @param {string} userName - Nome do usuário
 * @param {string} planName - Nome do plano
 * @param {string} action - Ação realizada (atualizado, renovado, cancelado)
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendPlanNotificationEmail = async (to, userName, planName, action) => {
  const subject = `Plano ${action} - Zeyra`;
  
  const text = `
    Olá ${userName}!
    
    Seu plano ${planName} foi ${action} com sucesso.
    
    Acesse sua conta para ver os detalhes: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
    
    Atenciosamente,
    Equipe Zeyra
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">📋 Plano ${action}</h2>
      
      <p>Olá <strong>${userName}</strong>!</p>
      
      <p>Seu plano <strong>${planName}</strong> foi ${action} com sucesso.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
           style="background: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Ver Detalhes
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        Atenciosamente,<br>
        <strong>Equipe Zeyra</strong>
      </p>
    </div>
  `;
  
  return await sendEmail(to, subject, text, html);
};

/**
 * Verificar se as configurações de email estão válidas
 * @returns {Promise<boolean>} True se as configurações estão válidas
 */
export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    console.log('✅ Configuração de email válida');
    return true;
    
  } catch (error) {
    console.error('❌ Configuração de email inválida:', error.message);
    return false;
  }
};

/**
 * Enviar email de teste
 * @param {string} to - Email do destinatário
 * @returns {Promise<Object>} Resultado do envio
 */
export const sendTestEmail = async (to) => {
  const subject = 'Teste de Email - Zeyra';
  
  const text = `
    Este é um email de teste para verificar se a configuração SMTP está funcionando.
    
    Data e hora: ${new Date().toLocaleString('pt-BR')}
    
    Se você recebeu este email, a configuração está funcionando perfeitamente!
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">🧪 Teste de Email</h2>
      
      <p>Este é um email de teste para verificar se a configuração SMTP está funcionando.</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Data e hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      </div>
      
      <p style="color: #27ae60; font-weight: bold;">
        ✅ Se você recebeu este email, a configuração está funcionando perfeitamente!
      </p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        <strong>Zeyra</strong> - Sistema de Email
      </p>
    </div>
  `;
  
  return await sendEmail(to, subject, text, html);
};
