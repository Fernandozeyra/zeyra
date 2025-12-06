const connectDB = require('../config/database');
const planUtils = require('../utils/planUtils');

// Exemplos de uso da entidade Plan
const planExamples = async () => {
  try {
    console.log('🚀 Exemplos de uso da entidade Plan\n');
    
    // Conectar ao banco
    await connectDB();
    console.log('✅ Conectado ao banco de dados\n');
    
    // 1. Criar diferentes tipos de planos
    console.log('📝 1. Criando planos de exemplo...');
    
    const starterPlan = await planUtils.createPlan({
      code: 'STARTER',
      coin: 25
    });
    console.log(`   🚀 Plano ${starterPlan.code} criado com ${starterPlan.coin} coins`);
    
    const proPlan = await planUtils.createPlan({
      code: 'PRO',
      coin: 150
    });
    console.log(`   ⚡ Plano ${proPlan.code} criado com ${proPlan.coin} coins`);
    
    const businessPlan = await planUtils.createPlan({
      code: 'BUSINESS',
      coin: 400
    });
    console.log(`   💼 Plano ${businessPlan.code} criado com ${businessPlan.coin} coins`);
    
    const ultimatePlan = await planUtils.createPlan({
      code: 'ULTIMATE',
      coin: 750
    });
    console.log(`   👑 Plano ${ultimatePlan.code} criado com ${ultimatePlan.coin} coins`);
    
    // 2. Operações de busca
    console.log('\n🔍 2. Operações de busca...');
    
    // Buscar plano por código
    const foundPlan = await planUtils.findPlanByCode('PRO');
    if (foundPlan) {
      console.log(`   🔍 Plano PRO encontrado: ${foundPlan.coin} coins`);
    }
    
    // Listar todos os planos
    const allPlans = await planUtils.findAllPlans();
    console.log(`   📋 Total de planos: ${allPlans.length}`);
    allPlans.forEach(plan => {
      console.log(`      - ${plan.code}: ${plan.coin} coins`);
    });
    
    // 3. Buscas por faixa de moedas
    console.log('\n💰 3. Buscas por faixa de moedas...');
    
    // Planos com até 100 coins
    const affordablePlans = await planUtils.findPlansBelowCoins(100);
    console.log(`   💸 Planos até 100 coins: ${affordablePlans.length}`);
    affordablePlans.forEach(plan => {
      console.log(`      - ${plan.code}: ${plan.coin} coins`);
    });
    
    // Planos com 200+ coins
    const premiumPlans = await planUtils.findPlansAboveCoins(200);
    console.log(`   💎 Planos com 200+ coins: ${premiumPlans.length}`);
    premiumPlans.forEach(plan => {
      console.log(`      - ${plan.code}: ${plan.coin} coins`);
    });
    
    // Planos entre 100-500 coins
    const midRangePlans = await planUtils.findPlansByCoinRange(100, 500);
    console.log(`   🎯 Planos entre 100-500 coins: ${midRangePlans.length}`);
    midRangePlans.forEach(plan => {
      console.log(`      - ${plan.code}: ${plan.coin} coins`);
    });
    
    // 4. Operações de atualização
    console.log('\n✏️ 4. Operações de atualização...');
    
    // Atualizar plano existente
    const updatedPlan = await planUtils.updatePlan(starterPlan._id, {
      coin: 30
    });
    console.log(`   ✏️ Plano ${updatedPlan.code} atualizado: ${updatedPlan.coin} coins`);
    
    // 5. Estatísticas e análises
    console.log('\n📊 5. Estatísticas e análises...');
    
    // Estatísticas gerais
    const stats = await planUtils.getPlanStats();
    console.log(`   📈 Estatísticas dos planos:`);
    console.log(`      Total de planos: ${stats.totalPlans}`);
    console.log(`      Mínimo de coins: ${stats.minCoins}`);
    console.log(`      Máximo de coins: ${stats.maxCoins}`);
    console.log(`      Média de coins: ${Math.round(stats.avgCoins)}`);
    console.log(`      Total de coins: ${stats.totalCoins}`);
    
    // Contar planos
    const totalPlans = await planUtils.countPlans();
    console.log(`   🔢 Total de planos no sistema: ${totalPlans}`);
    
    // 6. Ordenação e filtros
    console.log('\n🔢 6. Ordenação e filtros...');
    
    // Planos ordenados por moedas (crescente)
    const orderedPlans = await planUtils.findPlansOrderedByCoins(5);
    console.log(`   📊 Top 5 planos por moedas (crescente):`);
    orderedPlans.forEach((plan, index) => {
      console.log(`      ${index + 1}. ${plan.code}: ${plan.coin} coins`);
    });
    
    // 7. Validações e verificações
    console.log('\n✅ 7. Validações e verificações...');
    
    // Verificar se código já existe
    const codeExists = await planUtils.isCodeExists('PRO');
    console.log(`   🔍 Código 'PRO' já existe? ${codeExists ? 'Sim' : 'Não'}`);
    
    // Verificar se código não existe
    const newCodeExists = await planUtils.isCodeExists('NEWCODE');
    console.log(`   🔍 Código 'NEWCODE' já existe? ${newCodeExists ? 'Sim' : 'Não'}`);
    
    // 8. Simulação de sistema de assinaturas
    console.log('\n💳 8. Simulação de sistema de assinaturas...');
    
    const subscriptionPlans = [
      { code: 'MONTHLY', coin: 50 },
      { code: 'QUARTERLY', coin: 140 },
      { code: 'YEARLY', coin: 500 }
    ];
    
    console.log(`   📅 Planos de assinatura criados:`);
    for (const planData of subscriptionPlans) {
      const plan = await planUtils.createPlan(planData);
      console.log(`      - ${plan.code}: ${plan.coin} coins`);
    }
    
    // 9. Limpeza e organização
    console.log('\n🧹 9. Limpeza e organização...');
    
    // Deletar planos de teste
    const plansToDelete = [starterPlan._id, proPlan._id, businessPlan._id, ultimatePlan._id];
    
    for (const planId of plansToDelete) {
      await planUtils.deletePlan(planId);
      console.log(`   🗑️ Plano deletado`);
    }
    
    // Deletar planos de assinatura
    const subscriptionPlansToDelete = await planUtils.findPlansByCode(['MONTHLY', 'QUARTERLY', 'YEARLY']);
    for (const plan of subscriptionPlansToDelete) {
      await planUtils.deletePlan(plan._id);
      console.log(`   🗑️ Plano de assinatura ${plan.code} deletado`);
    }
    
    console.log('\n🎉 Exemplos de planos executados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante os exemplos:', error.message);
  } finally {
    // Fechar conexão
    const mongoose = require('mongoose');
    await mongoose.connection.close();
    console.log('\n🔌 Conexão com MongoDB fechada.');
    process.exit(0);
  }
};

// Executar exemplos
planExamples();
