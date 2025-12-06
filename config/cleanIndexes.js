import connectDB from './database.js';
import User from '../models/User.js';
import Plan from '../models/Plan.js';

const cleanIndexes = async () => {
  try {
    // Conectar ao banco
    await connectDB();
    
    console.log('Limpando índices antigos...');
    
    // Listar índices atuais da collection users
    const userIndexes = await User.collection.getIndexes();
    console.log('Índices atuais em users:', Object.keys(userIndexes));
    
    // Lista de índices antigos para remover
    const oldIndexesToRemove = [
      'username_1',
      'hfUsername_1', 
      'email_1',
      'stats.lastLogin_-1',
      'createdAt_-1'
    ];
    
    // Remover índices antigos
    for (const indexName of oldIndexesToRemove) {
      try {
        await User.collection.dropIndex(indexName);
        console.log(`Índice ${indexName} removido com sucesso`);
      } catch (error) {
        if (error.code === 27) {
          console.log(`Índice ${indexName} não existe (ok)`);
        } else {
          console.log(`Erro ao remover índice ${indexName}:`, error.message);
        }
      }
    }
    
    // Listar índices atuais da collection plans
    const planIndexes = await Plan.collection.getIndexes();
    console.log('Índices atuais em plans:', Object.keys(planIndexes));
    
    console.log('Limpeza de índices concluída!');
    
  } catch (error) {
    console.error('Erro ao limpar índices:', error);
  }
};

export default cleanIndexes;

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanIndexes()
    .then(() => {
      console.log('Script de limpeza de índices concluído.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Erro na execução:', error);
      process.exit(1);
    });
}
