# 📊 Documentação do Banco de Dados - Neogen

## 🗄️ Configuração do MongoDB

### Pré-requisitos
- MongoDB instalado e rodando localmente ou acesso a um cluster MongoDB
- Node.js e npm instalados

### Instalação das Dependências
```bash
npm install mongoose dotenv bcryptjs
```

### Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com:

```env
MONGODB_URI=mongodb://localhost:27017/neogen
NODE_ENV=development
PORT=3000
```

## 🏗️ Estrutura do Banco

### Coleção: `users`

#### Schema do Usuário
```javascript
{
  email: String,        // Obrigatório, único, lowercase
  phone: String,        // Obrigatório
  name: String,         // Obrigatório, 2-100 caracteres
  document: String,     // Obrigatório, único (CPF)
  role: String,         // Enum: "ADM" | "CLIENT", default: "CLIENT"
  isActive: Boolean,    // Default: true
  coin: Number,         // Default: 0, mínimo: 0
  auth: {               // ⭐ NOVO - Entidade de autenticação
    email: String,      // Obrigatório, único, lowercase
    password: String    // Obrigatório, mínimo 6 caracteres, hash automático
  },
  createdAt: Date,      // Automático
  updatedAt: Date       // Automático
}
```

### Coleção: `plans`

#### Schema do Plano
```javascript
{
  code: String,         // Obrigatório, único, 3-20 caracteres, uppercase
  coin: Number,         // Obrigatório, mínimo: 1
  createdAt: Date,      // Automático
  updatedAt: Date       // Automático
}
```

#### Índices
- `email`: Para busca rápida por email
- `document`: Para busca rápida por documento
- `role`: Para filtros por tipo de usuário
- `isActive`: Para filtros de usuários ativos
- `code`: Para busca rápida por código do plano
- `coin`: Para filtros por quantidade de moedas
- `auth.email`: Para busca rápida por email de autenticação ⭐ **NOVO**

## 🚀 Como Usar

### 1. Conectar ao Banco
```javascript
const connectDB = require('./config/database');
await connectDB();
```

### 2. Inicializar com Dados de Exemplo
```javascript
const initDB = require('./config/initDB');
await initDB();
```

### 3. Operações com Usuários
```javascript
const userUtils = require('./utils/userUtils');

// Criar usuário
const newUser = await userUtils.createUser({
  email: 'usuario@exemplo.com',
  phone: '(11) 99999-9999',
  name: 'Nome do Usuário',
  document: '123.456.789-00',
  role: 'CLIENT',
  coin: 100,
  auth: {
    email: 'usuario@exemplo.com',
    password: 'senha123'
  }
});

// Buscar usuário por email
const user = await userUtils.findUserByEmail('usuario@exemplo.com');

// Atualizar usuário
const updatedUser = await userUtils.updateUser(userId, {
  name: 'Novo Nome',
  coin: 150
});

// Desativar usuário (soft delete)
await userUtils.deleteUser(userId);

// Ativar usuário
await userUtils.activateUser(userId);
```

### 4. Sistema de Autenticação ⭐ **NOVO**
```javascript
const authUtils = require('./utils/authUtils');

// Autenticar usuário
const authenticatedUser = await authUtils.authenticateUser('email@exemplo.com', 'senha123');

// Verificar se email de auth existe
const emailExists = await authUtils.isAuthEmailExists('email@exemplo.com');

// Alterar senha
await authUtils.changePassword(userId, 'senhaAtual', 'novaSenha123');

// Resetar senha (admin)
await authUtils.resetPassword(userId, 'novaSenha123');

// Verificar sessão
const userSession = await authUtils.verifyUserSession(userId);

// Atualizar email de autenticação
const updatedUser = await authUtils.updateAuthEmail(userId, 'novo@email.com');

// Validar força da senha
const passwordStrength = authUtils.validatePasswordStrength('senha123');
```

### 5. Sistema de Moedas
```javascript
const coinUtils = require('./utils/coinUtils');

// Adicionar moedas
await coinUtils.addCoins(userId, 100);

// Remover moedas
await coinUtils.removeCoins(userId, 50);

// Definir quantidade específica
await coinUtils.setCoins(userId, 200);

// Verificar saldo
const balance = await coinUtils.getCoinBalance(userId);

// Transferir moedas entre usuários
const transfer = await coinUtils.transferCoins(fromUserId, toUserId, 75);

// Verificar se tem moedas suficientes
const hasEnough = await coinUtils.hasEnoughCoins(userId, 100);

// Ranking de usuários por moedas
const ranking = await coinUtils.getTopUsersByCoins(10);

// Resetar moedas de todos os usuários
await coinUtils.resetAllCoins(0);
```

### 6. Sistema de Planos
```javascript
const planUtils = require('./utils/planUtils');

// Criar plano
const newPlan = await planUtils.createPlan({
  code: 'PREMIUM',
  coin: 200
});

// Buscar plano por código
const plan = await planUtils.findPlanByCode('PREMIUM');

// Listar todos os planos
const allPlans = await planUtils.findAllPlans();

// Buscar planos por faixa de moedas
const plansInRange = await planUtils.findPlansByCoinRange(100, 300);

// Atualizar plano
const updatedPlan = await planUtils.updatePlan(planId, {
  coin: 250
});

// Deletar plano
await planUtils.deletePlan(planId);

// Estatísticas dos planos
const stats = await planUtils.getPlanStats();
```

## 🧪 Testando o Banco

### Teste Básico
Execute o arquivo de teste para verificar se tudo está funcionando:

```bash
node test-db.js
```

### Exemplos Completos
Execute os exemplos para ver todas as funcionalidades em ação:

```bash
# Exemplos de usuários e moedas
node examples/userExamples.js

# Exemplos de planos
node examples/planExamples.js
```

## 📁 Estrutura de Arquivos

```
config/
├── database.js      # Configuração de conexão
├── initDB.js        # Inicialização do banco
└── env.example      # Exemplo de variáveis de ambiente

models/
├── User.js          # Modelo Mongoose do usuário
└── Plan.js          # Modelo Mongoose do plano

utils/
├── types.ts         # Interfaces TypeScript
├── userUtils.js     # Utilitários para operações CRUD
├── coinUtils.js     # Sistema de moedas
├── planUtils.js     # Sistema de planos
└── authUtils.js     # Sistema de autenticação ⭐ **NOVO**

examples/
├── userExamples.js  # Exemplos de usuários e moedas
└── planExamples.js  # Exemplos de planos

test-db.js           # Arquivo de teste básico
```

## 🔒 Validações e Segurança

### Validações Automáticas
- **Email**: Formato válido, único, lowercase
- **Nome**: 2-100 caracteres, trim automático
- **Documento**: Único, trim automático
- **Telefone**: Trim automático
- **Role**: Apenas "ADM" ou "CLIENT"
- **Coin**: Número não negativo, default: 0
- **Code**: 3-20 caracteres, único, uppercase automático
- **Plan Coin**: Número mínimo 1
- **Auth Email**: Formato válido, único, lowercase ⭐ **NOVO**
- **Auth Password**: Mínimo 6 caracteres, hash automático ⭐ **NOVO**

### Middleware de Segurança
- Limpeza automática de dados (trim, lowercase, uppercase)
- Hash automático de senhas com bcrypt (12 rounds) ⭐ **NOVO**
- Timestamps automáticos
- Soft delete para usuários (não remove dados permanentemente)
- Senhas não retornadas nas consultas por padrão ⭐ **NOVO**

## 💰 Sistema de Moedas

### Funcionalidades Principais
- **Adicionar Moedas**: Incrementa o saldo do usuário
- **Remover Moedas**: Decrementa o saldo (com validação de saldo)
- **Definir Moedas**: Define um valor específico
- **Transferir Moedas**: Entre usuários com validações
- **Verificar Saldo**: Consulta o saldo atual
- **Ranking**: Lista usuários ordenados por moedas
- **Operações em Lote**: Reset de moedas para todos os usuários

### Validações de Moedas
- Não permite valores negativos
- Verifica saldo suficiente antes de remover
- Valida usuários existentes antes de transferir
- Logs de todas as operações

## 🔐 Sistema de Autenticação ⭐ **NOVO**

### Funcionalidades Principais
- **Autenticação**: Login com email e senha
- **Hash de Senhas**: Criptografia automática com bcrypt
- **Validação de Senha**: Verificação de força e requisitos
- **Alteração de Senha**: Com validação de senha atual
- **Reset de Senha**: Para administradores
- **Verificação de Sessão**: Validação de usuário ativo
- **Gestão de Email**: Atualização de email de autenticação

### Validações de Autenticação
- Email único para autenticação
- Senha mínima de 6 caracteres
- Hash automático com salt de 12 rounds
- Verificação de força da senha
- Validação de formato de email

## 📋 Sistema de Planos

### Funcionalidades Principais
- **Criar Planos**: Com código único e quantidade de moedas
- **Buscar Planos**: Por código, ID ou faixa de moedas
- **Atualizar Planos**: Modificar quantidade de moedas
- **Deletar Planos**: Remoção permanente
- **Filtros Avançados**: Por faixa de moedas, acima/abaixo de valores
- **Estatísticas**: Total, mínimo, máximo, média de moedas
- **Ordenação**: Por quantidade de moedas

### Validações de Planos
- Código único e obrigatório
- 3-20 caracteres para código
- Uppercase automático
- Mínimo 1 moeda
- Trim automático

## 🚨 Tratamento de Erros

Todas as operações incluem tratamento de erros adequado:
- Validação de dados
- Verificação de unicidade
- Mensagens de erro descritivas
- Logs de operações
- Validação de saldo de moedas
- Validação de códigos de planos
- Validação de credenciais de autenticação ⭐ **NOVO**

## 📊 Monitoramento

O banco inclui:
- Logs de conexão
- Logs de operações
- Contadores de usuários e planos
- Status de conexão
- Rastreamento de transações de moedas
- Estatísticas de planos
- Logs de autenticação ⭐ **NOVO**

## 🔧 Comandos Úteis

### Verificar Status do MongoDB
```bash
# Local
mongosh

# Ou verificar se está rodando
sudo systemctl status mongod
```

### Backup do Banco
```bash
mongodump --db neogen --out ./backup
```

### Restaurar Banco
```bash
mongorestore --db neogen ./backup/neogen
```

## 📚 Casos de Uso

### Sistema de Recompensas
- Usuários ganham moedas por atividades
- Ranking para gamificação
- Transferências entre usuários

### Sistema de Pagamentos
- Verificação de saldo antes de compras
- Dedução automática de moedas
- Histórico de transações

### Sistema de Planos
- Diferentes níveis de assinatura
- Planos com quantidades variadas de moedas
- Filtros por faixa de preço
- Estatísticas de uso

### Sistema de Autenticação ⭐ **NOVO**
- Login seguro com email e senha
- Hash automático de senhas
- Validação de força de senha
- Gestão de credenciais
- Verificação de sessões

### Sistema de Webhooks
- Integração com sistemas externos
- Processamento de pagamentos
- Notificações em tempo real
- Sincronização de dados

### Gestão de Usuários
- Diferentes níveis de acesso (ADM/CLIENT)
- Ativação/desativação de usuários
- Relatórios e estatísticas
- Autenticação segura ⭐ **NOVO**
