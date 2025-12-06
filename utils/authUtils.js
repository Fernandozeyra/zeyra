import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendPasswordResetEmail } from './emailUtils.js';

dotenv.config();

// Configuração JWT
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_jwt_padrao';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Autenticar usuário por email e senha
const authenticateUser = async (email, password) => {
  try {
    // Buscar usuário por email de autenticação incluindo a senha
    const user = await User.findOne({ 'auth.email': email.toLowerCase() }).select('+auth.password');
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    if (!user.isActive) {
      throw new Error('Usuário inativo');
    }
    
    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }
    
    // Gerar token JWT
    const tokenPayload = {
      userId: user._id,
      email: user.auth.email,
      role: user.role,
      isActive: user.isActive
    };
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // Retornar usuário sem senha e token JWT
    return {
      user: user.getPublicProfile(),
      token: token,
      expiresIn: JWT_EXPIRES_IN
    };
    
  } catch (error) {
    throw new Error(`Erro na autenticação: ${error.message}`);
  }
};

// Verificar se email de autenticação já existe
const isAuthEmailExists = async (email, excludeId = null) => {
  try {
    const query = { 'auth.email': email.toLowerCase() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const user = await User.findOne(query);
    return !!user;
  } catch (error) {
    throw new Error(`Erro ao verificar email de autenticação: ${error.message}`);
  }
};

// Alterar senha do usuário
const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    if (newPassword.length < 6) {
      throw new Error('Nova senha deve ter pelo menos 6 caracteres');
    }
    
    // Buscar usuário com senha
    const user = await User.findById(userId).select('+auth.password');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    // Verificar senha atual
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error('Senha atual incorreta');
    }
    
    // Atualizar senha
    user.auth.password = newPassword;
    await user.save();
    
    return { message: 'Senha alterada com sucesso' };
    
  } catch (error) {
    throw new Error(`Erro ao alterar senha: ${error.message}`);
  }
};

// Resetar senha (para administradores)
// const resetPassword = async (userId, newPassword) => {
//   try {
//     if (newPassword.length < 6) {
//       throw new Error('Nova senha deve ter pelo menos 6 caracteres');
//     }
    
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error('Usuário não encontrado');
//     }
    
//     // Atualizar senha
//     user.auth.password = newPassword;
//     await user.save();
    
//     return { message: 'Senha resetada com sucesso' };
    
//   } catch (error) {
//     throw new Error(`Erro ao resetar senha: ${error.message}`);
//   }
// };

const sendCodeResetPassword = async (email) => {
  const user = await User.findOne({ 'auth.email': email.toLowerCase() });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  const code = Math.floor(100000 + Math.random() * 900000);
  user.auth.codeResetPassword = code;
  await user.save();
  await sendPasswordResetEmail(user.auth.email, user.name, code);
  return { message: 'Código de redefinição de senha enviado com sucesso' };
};

const resetPassword = async (email, code, password) => {
  const user = await User.findOne({ 'auth.email': email.toLowerCase() }).select('+auth.codeResetPassword');
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  if (user.auth.codeResetPassword !== code) {
    throw new Error('Código de redefinição de senha inválido');
  }
  user.auth.password = password;
  user.auth.codeResetPassword = null;
  await user.save();
  return { message: 'Senha resetada com sucesso' };
};

// Verificar e decodificar token JWT
const verifyJWTToken = (token) => {
  try {
    console.log(JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

// Extrair token do header Authorization
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' do início
};

// Verificar se usuário está autenticado (verificar token/sessão)
const verifyUserSession = async (userId, token = null) => {
  try {
    // Se um token foi fornecido, verificar primeiro
    if (token) {
      const tokenVerification = verifyJWTToken(token);
      if (!tokenVerification.valid) {
        throw new Error(`Token inválido: ${tokenVerification.error}`);
      }
      
      // Verificar se o token pertence ao usuário correto
      if (tokenVerification.payload.userId !== userId.toString()) {
        throw new Error('Token não corresponde ao usuário');
      }
    }
    
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    if (!user.isActive) {
      throw new Error('Usuário inativo');
    }
    
    return user.getPublicProfile();
    
  } catch (error) {
    throw new Error(`Erro ao verificar sessão: ${error.message}`);
  }
};

// Buscar usuário por email de autenticação
const findUserByAuthEmail = async (email) => {
  try {
    const user = await User.findOne({ 'auth.email': email.toLowerCase() });
    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por email de autenticação: ${error.message}`);
  }
};

// Atualizar email de autenticação
const updateAuthEmail = async (userId, newEmail) => {
  try {
    // Verificar se novo email já existe
    const emailExists = await isAuthEmailExists(newEmail, userId);
    if (emailExists) {
      throw new Error('Email de autenticação já está em uso');
    }
    
    // Validar formato do email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(newEmail)) {
      throw new Error('Formato de email inválido');
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 'auth.email': newEmail.toLowerCase() },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    return user.getPublicProfile();
    
  } catch (error) {
    throw new Error(`Erro ao atualizar email de autenticação: ${error.message}`);
  }
};

// Gerar hash de senha (para uso externo)
const hashPassword = async (password) => {
  try {
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }
    
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
    
  } catch (error) {
    throw new Error(`Erro ao gerar hash da senha: ${error.message}`);
  }
};

// Verificar força da senha
const validatePasswordStrength = (password) => {
  const validations = {
    length: password.length >= 6,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(validations).filter(Boolean).length;
  
  return {
    isValid: score >= 3,
    score: score,
    validations: validations,
    strength: score === 4 ? 'forte' : score === 3 ? 'média' : 'fraca'
  };
};
const createUserSession = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw new Error('Usuário inválido ou inativo');
    }
    
    // Simular criação de sessão
    const session = {
      userId: user._id,
      email: user.auth.email,
      role: user.role,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    };
    
    return session;
    
  } catch (error) {
    throw new Error(`Erro ao criar sessão: ${error.message}`);
  }
};


export {
  authenticateUser,
  isAuthEmailExists,
  changePassword,
  verifyUserSession,
  findUserByAuthEmail,
  updateAuthEmail,
  hashPassword,
  validatePasswordStrength,
  createUserSession,
  verifyJWTToken,
  extractTokenFromHeader,
  sendCodeResetPassword,
  resetPassword
};
