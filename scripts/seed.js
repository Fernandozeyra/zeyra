import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Plan from '../models/Plan.js';
import bcrypt from 'bcryptjs';

// Carregar variáveis de ambiente
dotenv.config();

const seedPlans = async () => {
  console.log('🌱 Criando planos...');
  
  const plans = [
    {
      code: 'FREE',
      name: 'Plano Gratuito',
      coin: 5,
      numSites: 1,
      visitLimit: 10,
      description: 'Plano básico para começar'
    },
    {
      code: 'BASIC',
      name: 'Plano Básico',
      coin: 50,
      numSites: 3,
      visitLimit: 500,
      description: 'Plano intermediário para pequenos projetos'
    },
    {
      code: 'PRO',
      name: 'Plano Profissional',
      coin: 200,
      numSites: 10,
      visitLimit: 2000,
      description: 'Plano avançado para projetos profissionais'
    },
    {
      code: 'ENTERPRISE',
      name: 'Plano Empresarial',
      coin: 1000,
      numSites: 50,
      visitLimit: 10000,
      description: 'Plano para grandes empresas e projetos'
    }
  ];

  try {
    // Limpar planos existentes
    await Plan.deleteMany({});
    
    // Criar novos planos
    const createdPlans = await Plan.insertMany(plans);
    console.log(`✅ ${createdPlans.length} planos criados com sucesso!`);
    
    return createdPlans;
  } catch (error) {
    console.error('❌ Erro ao criar planos:', error);
    throw error;
  }
};

const seedUsers = async (plans) => {
  console.log('👥 Criando usuários...');
  
  const basicPlan = plans.find(p => p.code === 'BASIC');
  const proPlan = plans.find(p => p.code === 'PRO');
  
  const users = [
    {
      email: 'admin@neogen.com',
      phone: '11999999999',
      name: 'Administrador',
      document: '12345678901',
      role: 'ADM',
      isActive: true,
      coin: 1000,
      auth: {
        email: 'admin@neogen.com',
        password: 'admin123'
      }
    },
    {
      email: 'cliente@neogen.com',
      phone: '11888888888',
      name: 'Cliente Exemplo',
      document: '98765432100',
      role: 'CLIENT',
      isActive: true,
      coin: 100,
      auth: {
        email: 'cliente@neogen.com',
        password: 'cliente123'
      },
      subscribe: {
        plan: basicPlan._id,
        consumedCoins: 25,
        consumedSites: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        isActive: true
      }
    },
    {
      email: 'pro@neogen.com',
      phone: '11777777777',
      name: 'Usuário Pro',
      document: '11122233344',
      role: 'CLIENT',
      isActive: true,
      coin: 500,
      auth: {
        email: 'pro@neogen.com',
        password: 'pro123'
      },
      subscribe: {
        plan: proPlan._id,
        consumedCoins: 100,
        consumedSites: 3,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        isActive: true
      }
    }
  ];

  try {
    // Limpar usuários existentes
    await User.deleteMany({});
    
    // Hash das senhas
    for (const user of users) {
      const salt = await bcrypt.genSalt(12);
      user.auth.password = await bcrypt.hash(user.auth.password, salt);
    }
    
    // Criar novos usuários
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} usuários criados com sucesso!`);
    
    return createdUsers;
  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
    throw error;
  }
};

const main = async () => {
  try {
    console.log('🚀 Iniciando seed do banco de dados...');
    
    // Conectar ao banco
    await connectDB();
    console.log('✅ Conectado ao banco de dados');
    
    // Criar planos
    const plans = await seedPlans();
    
    // Criar usuários
    await seedUsers(plans);
    
    console.log('🎉 Seed concluído com sucesso!');
    console.log('\n📋 Dados criados:');
    console.log('- Planos: FREE, BASIC, PRO, ENTERPRISE');
    console.log('- Usuários: admin@neogen.com, cliente@neogen.com, pro@neogen.com');
    console.log('\n🔑 Senhas padrão:');
    console.log('- admin@neogen.com: admin123');
    console.log('- cliente@neogen.com: cliente123');
    console.log('- pro@neogen.com: pro123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  }
};

main();
