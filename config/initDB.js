import connectDB from './database.js';
import User from '../models/User.js';
import Plan from '../models/Plan.js';

const initDB = async () => {
  try {
    // Conectar ao banco
    await connectDB();
    
    // Verificar se já existem usuários
    const userCount = await User.countDocuments();
    const planCount = await Plan.countDocuments();
    
    if (planCount === 2) {
      console.log('Inicializando banco de dados com planos de exemplo...');
      
      // Criar planos de exemplo com as novas propriedades
      const plans = [
        {
          code: 'OB6E36CA6',
          name: 'Teste',
          coin: 5,
          numSites: 1,
          visitLimit: 10,
          description: 'Plano Teste'
        },
        {
          code: 'O6905784E',
          name: 'Plano Start',
          coin: 35,
          numSites: 1,
          visitLimit: 10000,
          description: 'Plano Inicial Para Pequenos Projetos'
        },
        {
          code: 'O6EEDA811',
          name: 'Plano | Profissional',
          coin: 75,
          numSites: 3,
          visitLimit: 100000,
          description: 'Plano avançado para projetos profissionais'
        },
        {
          code: 'O39902A4F',
          name: 'Plano Empresarial',
          coin: 1000000,
          numSites: 1000000,
          visitLimit: 1000000,
          description: 'Plano para empresas e projetos grandes'
        }
      ];
      
      for (const planData of plans) {
        const plan = new Plan(planData);
        await plan.save();
        console.log(`Plano criado: ${plan.code} - ${plan.name} - ${plan.coin} coins`);
      }
      
      console.log('Planos de exemplo criados com sucesso!');
    } else {
      console.log('Planos já existem. Pulando criação de planos de exemplo.');
    }
    
    // if (userCount === 0) {
      console.log('Inicializando banco de dados com usuários de exemplo...');
      
      // Buscar planos para criar assinaturas
      const basicPlan = await Plan.findOne({ code: 'OB6E36CA6' });
      
      // // Criar usuário admin padrão
      // const adminUser = new User({
      //   email: 'admin@neogen.com',
      //   phone: '(11) 99999-9999',
      //   name: 'Administrador',
      //   document: '123.456.789-00',
      //   role: 'ADM',
      //   isActive: true,
      //   coin: 1000,
      //   auth: {
      //     email: 'admin@neogen.com',
      //     password: 'admin123'
      //   }
      // });
      
      // await adminUser.save();
      // console.log('Usuário admin criado:', adminUser.email);
      
      // Criar usuário cliente de exemplo com assinatura
      const clientUser = new User({
        email: 'cliente@exemplo.com',
        phone: '(11) 88888-8888',
        name: 'Cliente Exemplo',
        document: '987.654.321-00',
        role: 'CLIENT',
        isActive: true,
        coin: 100,
        auth: {
          email: 'cliente@exemplo.com',
          password: 'cliente123'
        },
        subscribe: basicPlan ? {
          plan: basicPlan._id,
          consumedCoins: 0,
          consumedSites: 0,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
          isActive: true
        } : undefined
      });
      
      await clientUser.save();
      console.log('Usuário cliente criado:', clientUser.email);
      

      
      console.log('Usuários de exemplo criados com sucesso!');
    // } else {
    //   console.log('Usuários já existem. Pulando criação de usuários de exemplo.');
    // }
    
    console.log('Banco de dados inicializado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
};

export default initDB;

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  initDB()
    .then(() => {
      console.log('Script de inicialização concluído.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Erro na execução:', error);
      process.exit(1);
    });
}
