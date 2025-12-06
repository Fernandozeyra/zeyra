const connectDB = require('./config/database');
const initDB = require('./config/initDB');
const userUtils = require('./utils/userUtils');
const coinUtils = require('./utils/coinUtils');
const planUtils = require('./utils/planUtils');

const testDatabase = async () => {
  try {
    console.log('🧪 Iniciando testes do banco de dados...\n');
    
    // Testar conexão
    console.log('1️⃣ Testando conexão com MongoDB...');
    await connectDB();
    console.log('✅ Conexão estabelecida com sucesso!\n');
    
    // Inicializar banco
    console.log('2️⃣ Inicializando banco de dados...');
    await initDB();
    console.log('✅ Banco inicializado!\n');
    
    // Testar operações básicas
    console.log('3️⃣ Testando operações básicas...');
    
    // Listar usuários ativos
    const activeUsers = await userUtils.findActiveUsers();
    console.log(`📋 Usuários ativos encontrados: ${activeUsers.length}`);
    
    // Buscar usuário por email
    const adminUser = await userUtils.findUserByEmail('admin@neogen.com');
    if (adminUser) {
      console.log(`👤 Admin encontrado: ${adminUser.name} (${adminUser.role}) - Coins: ${adminUser.coin}`);
      console.log(`🔐 Auth email: ${adminUser.auth.email}`);
    }
    
    // Testar criação de usuário
    const newUser = await userUtils.createUser({
      email: 'teste@exemplo.com',
      phone: '(11) 77777-7777',
      name: 'Usuário Teste',
      document: '111.222.333-44',
      role: 'CLIENT',
      isActive: true,
      coin: 50,
      auth: {
        email: 'teste@exemplo.com',
        password: 'teste123'
      }
    });
    console.log(`➕ Novo usuário criado: ${newUser.name} - Coins: ${newUser.coin}`);
    console.log(`🔐 Auth email: ${newUser.auth.email}`);
    
    // Testar atualização
    const updatedUser = await userUtils.updateUser(newUser._id, {
      name: 'Usuário Teste Atualizado',
      coin: 75
    });
    console.log(`✏️ Usuário atualizado: ${updatedUser.name} - Coins: ${updatedUser.coin}`);
    
    // Testar funcionalidades de moedas
    console.log('\n4️⃣ Testando funcionalidades de moedas...');
    
    // Adicionar moedas
    const userWithMoreCoins = await coinUtils.addCoins(newUser._id, 25);
    console.log(`💰 Moedas adicionadas: ${userWithMoreCoins.name} agora tem ${userWithMoreCoins.coin} coins`);
    
    // Verificar saldo
    const balance = await coinUtils.getCoinBalance(newUser._id);
    console.log(`💳 Saldo atual: ${balance.name} - ${balance.coinBalance} coins`);
    
    // Remover moedas
    const userWithLessCoins = await coinUtils.removeCoins(newUser._id, 30);
    console.log(`💸 Moedas removidas: ${userWithLessCoins.name} agora tem ${userWithLessCoins.coin} coins`);
    
    // Verificar se tem moedas suficientes
    const hasEnough = await coinUtils.hasEnoughCoins(newUser._id, 50);
    console.log(`🔍 Tem moedas suficientes para 50? ${hasEnough.hasEnough} (Saldo: ${hasEnough.currentBalance})`);
    
    // Testar transferência de moedas
    const clientUser = await userUtils.findUserByEmail('cliente@exemplo.com');
    if (clientUser) {
      const transfer = await coinUtils.transferCoins(newUser._id, clientUser._id, 20);
      console.log(`🔄 Transferência realizada: ${transfer.from.name} → ${transfer.to.name} (${transfer.amount} coins)`);
      console.log(`   ${transfer.from.name}: ${transfer.from.newBalance} coins`);
      console.log(`   ${transfer.to.name}: ${transfer.to.newBalance} coins`);
    }
    
    // Verificar ranking de moedas
    const ranking = await coinUtils.getTopUsersByCoins(5);
    console.log('\n🏆 Ranking de moedas:');
    ranking.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} - ${user.coin} coins (${user.role})`);
    });
    
    // Testar funcionalidades de planos
    console.log('\n5️⃣ Testando funcionalidades de planos...');
    
    // Listar todos os planos
    const allPlans = await planUtils.findAllPlans();
    console.log(`📋 Planos encontrados: ${allPlans.length}`);
    allPlans.forEach(plan => {
      console.log(`   - ${plan.code}: ${plan.coin} coins`);
    });
    
    // Buscar plano por código
    const basicPlan = await planUtils.findPlanByCode('BASIC');
    if (basicPlan) {
      console.log(`🔍 Plano BASIC encontrado: ${basicPlan.coin} coins`);
    }
    
    // Criar novo plano
    const newPlan = await planUtils.createPlan({
      code: 'CUSTOM',
      coin: 150
    });
    console.log(`➕ Novo plano criado: ${newPlan.code} - ${newPlan.coin} coins`);
    
    // Atualizar plano
    const updatedPlan = await planUtils.updatePlan(newPlan._id, {
      coin: 175
    });
    console.log(`✏️ Plano atualizado: ${updatedPlan.code} - ${updatedPlan.coin} coins`);
    
    // Buscar planos por faixa de moedas
    const plansInRange = await planUtils.findPlansByCoinRange(100, 300);
    console.log(`🔍 Planos entre 100-300 coins: ${plansInRange.length}`);
    plansInRange.forEach(plan => {
      console.log(`   - ${plan.code}: ${plan.coin} coins`);
    });
    
    // Obter estatísticas dos planos
    const planStats = await planUtils.getPlanStats();
    console.log(`📊 Estatísticas dos planos:`);
    console.log(`   Total: ${planStats.totalPlans}`);
    console.log(`   Mínimo: ${planStats.minCoins} coins`);
    console.log(`   Máximo: ${planStats.maxCoins} coins`);
    console.log(`   Média: ${Math.round(planStats.avgCoins)} coins`);
    
    // Deletar plano de teste
    await planUtils.deletePlan(newPlan._id);
    console.log(`🗑️ Plano de teste deletado`);
    
    // Testar soft delete
    await userUtils.deleteUser(newUser._id);
    console.log(`\n🗑️ Usuário desativado (soft delete)`);
    
    // Verificar se foi desativado
    const deletedUser = await userUtils.findUserById(newUser._id);
    console.log(`🔍 Usuário após soft delete - isActive: ${deletedUser.isActive}`);
    
    console.log('\n🎉 Todos os testes passaram com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
  } finally {
    // Fechar conexão
    const mongoose = require('mongoose');
    await mongoose.connection.close();
    console.log('\n🔌 Conexão com MongoDB fechada.');
    process.exit(0);
  }
};

// Executar testes
testDatabase();
