const connectDB = require('../config/database');
const userUtils = require('../utils/userUtils');
const coinUtils = require('../utils/coinUtils');

// Exemplos de uso do sistema de usuários e moedas
const userExamples = async () => {
  try {
    console.log('🚀 Exemplos de uso do sistema de usuários e moedas\n');
    
    // Conectar ao banco
    await connectDB();
    console.log('✅ Conectado ao banco de dados\n');
    
    // 1. Criar diferentes tipos de usuários
    console.log('📝 1. Criando usuários de exemplo...');
    
    const developer = await userUtils.createUser({
      email: 'dev@neogen.com',
      phone: '(11) 99999-8888',
      name: 'Desenvolvedor',
      document: '111.111.111-11',
      role: 'CLIENT',
      coin: 500,
      auth: {
        email: 'dev@neogen.com',
        password: 'dev123'
      }
    });
    console.log(`   👨‍💻 ${developer.name} criado com ${developer.coin} coins`);
    console.log(`   🔐 Auth email: ${developer.auth.email}`);
    
    const designer = await userUtils.createUser({
      email: 'design@neogen.com',
      phone: '(11) 88888-7777',
      name: 'Designer',
      document: '222.222.222-22',
      role: 'CLIENT',
      coin: 300,
      auth: {
        email: 'design@neogen.com',
        password: 'design123'
      }
    });
    console.log(`   🎨 ${designer.name} criado com ${designer.coin} coins`);
    console.log(`   🔐 Auth email: ${designer.auth.email}`);
    
    const manager = await userUtils.createUser({
      email: 'manager@neogen.com',
      phone: '(11) 77777-6666',
      name: 'Gerente',
      document: '333.333.333-33',
      role: 'ADM',
      coin: 1000,
      auth: {
        email: 'manager@neogen.com',
        password: 'manager123'
      }
    });
    console.log(`   👔 ${manager.name} criado com ${manager.coin} coins`);
    console.log(`   🔐 Auth email: ${manager.auth.email}`);
    
    // 2. Operações com moedas
    console.log('\n💰 2. Operações com moedas...');
    
    // Adicionar moedas por bom trabalho
    await coinUtils.addCoins(developer._id, 100);
    console.log(`   🎯 ${developer.name} recebeu 100 coins por bom trabalho`);
    
    // Remover moedas por serviço
    await coinUtils.removeCoins(designer._id, 50);
    console.log(`   💸 ${designer.name} gastou 50 coins em um serviço`);
    
    // Definir moedas específicas
    await coinUtils.setCoins(manager._id, 1500);
    console.log(`   ⚡ ${manager.name} teve suas moedas ajustadas para 1500`);
    
    // 3. Transferências entre usuários
    console.log('\n🔄 3. Transferências entre usuários...');
    
    // Manager doa moedas para o desenvolvedor
    const donation = await coinUtils.transferCoins(manager._id, developer._id, 200);
    console.log(`   🎁 ${donation.from.name} doou ${donation.amount} coins para ${donation.to.name}`);
    
    // Designer paga pelo serviço do desenvolvedor
    const payment = await coinUtils.transferCoins(designer._id, developer._id, 75);
    console.log(`   💳 ${designer.name} pagou ${payment.amount} coins para ${developer.name}`);
    
    // 4. Verificações e consultas
    console.log('\n🔍 4. Verificações e consultas...');
    
    // Verificar saldos
    const devBalance = await coinUtils.getCoinBalance(developer._id);
    const designBalance = await coinUtils.getCoinBalance(designer._id);
    const managerBalance = await coinUtils.getCoinBalance(manager._id);
    
    console.log(`   💰 Saldos atuais:`);
    console.log(`      ${devBalance.name}: ${devBalance.coinBalance} coins`);
    console.log(`      ${designBalance.name}: ${designBalance.coinBalance} coins`);
    console.log(`      ${managerBalance.name}: ${managerBalance.coinBalance} coins`);
    
    // Verificar se tem moedas suficientes
    const canAfford = await coinUtils.hasEnoughCoins(developer._id, 1000);
    console.log(`   🔍 ${developer.name} pode pagar 1000 coins? ${canAfford.hasEnough ? 'Sim' : 'Não'}`);
    
    // 5. Ranking de moedas
    console.log('\n🏆 5. Ranking de moedas...');
    
    const topUsers = await coinUtils.getTopUsersByCoins(10);
    console.log(`   📊 Top ${topUsers.length} usuários por moedas:`);
    topUsers.forEach((user, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
      console.log(`      ${medal} ${index + 1}. ${user.name} - ${user.coin} coins (${user.role})`);
    });
    
    // 6. Operações em lote
    console.log('\n📦 6. Operações em lote...');
    
    // Resetar moedas de todos os usuários para 100
    const resetResult = await coinUtils.resetAllCoins(100);
    console.log(`   🔄 ${resetResult.message}`);
    
    // Verificar novos saldos
    const newDevBalance = await coinUtils.getCoinBalance(developer._id);
    const newDesignBalance = await coinUtils.getCoinBalance(designer._id);
    const newManagerBalance = await coinUtils.getCoinBalance(manager._id);
    
    console.log(`   💰 Novos saldos após reset:`);
    console.log(`      ${newDevBalance.name}: ${newDevBalance.coinBalance} coins`);
    console.log(`      ${newDesignBalance.name}: ${newDesignBalance.coinBalance} coins`);
    console.log(`      ${newManagerBalance.name}: ${newManagerBalance.coinBalance} coins`);
    
    // 7. Buscas e filtros
    console.log('\n🔎 7. Buscas e filtros...');
    
    // Buscar usuários por role
    const admins = await userUtils.findUsersByRole('ADM');
    const clients = await userUtils.findUsersByRole('CLIENT');
    
    console.log(`   👑 Administradores: ${admins.length}`);
    admins.forEach(admin => {
      console.log(`      - ${admin.name} (${admin.email}) - ${admin.coin} coins`);
      console.log(`        🔐 Auth: ${admin.auth.email}`);
    });
    
    console.log(`   👥 Clientes: ${clients.length}`);
    clients.forEach(client => {
      console.log(`      - ${client.name} (${client.email}) - ${client.coin} coins`);
      console.log(`        🔐 Auth: ${client.auth.email}`);
    });
    
    console.log('\n🎉 Exemplos executados com sucesso!');
    
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
userExamples();
