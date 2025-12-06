# Modelos de Dados - Neogen

Este documento descreve os modelos de dados atualizados para o sistema Neogen.

## Modelo User

### Propriedades

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | String | ✅ | Email principal do usuário |
| `phone` | String | ✅ | Número de telefone |
| `name` | String | ✅ | Nome completo do usuário |
| `document` | String | ✅ | CPF/CNPJ (único) |
| `role` | UserRole | ✅ | Papel do usuário (ADM/CLIENT) |
| `isActive` | Boolean | ❌ | Status de ativação (padrão: true) |
| `coin` | Number | ❌ | Saldo de moedas (padrão: 0) |
| `auth.email` | String | ✅ | Email para autenticação |
| `auth.password` | String | ✅ | Senha criptografada |
| `subscribe.plan` | ObjectId | ❌ | Referência ao plano |
| `subscribe.consumedCoins` | Number | ❌ | Moedas consumidas (padrão: 0) |
| `subscribe.consumedSites` | Number | ❌ | Sites consumidos (padrão: 0) |
| `subscribe.startDate` | Date | ❌ | Data de início da assinatura |
| `subscribe.endDate` | Date | ❌ | Data de fim da assinatura |
| `subscribe.isActive` | Boolean | ❌ | Status da assinatura (padrão: false) |

### Métodos

#### `comparePassword(candidatePassword)`
Verifica se a senha fornecida corresponde à senha do usuário.

#### `deactivate()`
Desativa o usuário (define `isActive` como false).

#### `activate()`
Ativa o usuário (define `isActive` como true).

#### `isAdmin()`
Verifica se o usuário é administrador.

#### `getPublicProfile()`
Retorna dados públicos do usuário (sem senha).

#### `hasActiveSubscription()`
Verifica se o usuário tem assinatura ativa.

#### `getSubscriptionInfo()`
Retorna informações completas da assinatura.

#### `consumeCoins(amount)`
Consome uma quantidade específica de moedas.

#### `consumeSite()`
Consome um site da cota do plano.

### Middleware

- **Hash de senha**: Automático antes de salvar
- **Limpeza de dados**: Remove espaços e formata campos
- **Timestamps**: Adiciona `createdAt` e `updatedAt` automaticamente

## Modelo Plan

### Propriedades

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `code` | String | ✅ | Código único do plano |
| `name` | String | ✅ | Nome do plano |
| `coin` | Number | ✅ | Quantidade de moedas incluídas |
| `numSites` | Number | ✅ | Número máximo de sites permitidos |
| `visitLimit` | Number | ✅ | Limite de visitas por site |
| `description` | String | ❌ | Descrição opcional do plano |

### Métodos

#### `isValid()`
Verifica se o plano é válido (todos os campos obrigatórios preenchidos).

#### `getPlanInfo()`
Retorna informações completas do plano.

### Métodos Estáticos

#### `findByCode(code)`
Busca plano por código.

#### `findByCoinRange(minCoins, maxCoins)`
Busca planos por faixa de moedas.

#### `findByNumSites(numSites)`
Busca planos que suportam pelo menos X sites.

#### `findByVisitLimit(visitLimit)`
Busca planos que suportam pelo menos X visitas.

#### `findActivePlans()`
Retorna todos os planos ordenados por preço.

## Enums

### UserRole
```typescript
enum UserRole {
  ADM = "ADM",      // Administrador
  CLIENT = "CLIENT" // Cliente
}
```

## Exemplos de Uso

### Criar um novo usuário
```javascript
import User from '../models/User.js';

const newUser = new User({
  email: 'usuario@exemplo.com',
  phone: '11999999999',
  name: 'Usuário Exemplo',
  document: '12345678901',
  role: 'CLIENT',
  auth: {
    email: 'usuario@exemplo.com',
    password: 'senha123'
  }
});

await newUser.save();
```

### Criar um novo plano
```javascript
import Plan from '../models/Plan.js';

const newPlan = new Plan({
  code: 'BASIC',
  name: 'Plano Básico',
  coin: 50,
  numSites: 3,
  visitLimit: 500,
  description: 'Plano para pequenos projetos'
});

await newPlan.save();
```

### Verificar assinatura ativa
```javascript
const user = await User.findById(userId);
if (user.hasActiveSubscription()) {
  console.log('Usuário tem assinatura ativa');
  const subscriptionInfo = user.getSubscriptionInfo();
  console.log(subscriptionInfo);
}
```

### Consumir recursos
```javascript
const user = await User.findById(userId);

// Consumir moedas
await user.consumeCoins(10);

// Consumir site
await user.consumeSite();
```

## Script de Seed

Para popular o banco com dados de exemplo, execute:

```bash
node scripts/seed.js
```

Este script criará:
- 4 planos (FREE, BASIC, PRO, ENTERPRISE)
- 3 usuários (admin, cliente, pro)
- Assinaturas de exemplo

## Índices

### User
- `role`: Para consultas por papel
- `isActive`: Para consultas por status

### Plan
- `coin`: Para consultas por preço

## Validações

### User
- Email único e válido
- Telefone obrigatório
- Nome entre 2-100 caracteres
- Documento único
- Senha mínima 6 caracteres

### Plan
- Código único entre 3-20 caracteres
- Nome entre 2-100 caracteres
- Moedas, sites e visitas > 0
- Descrição máxima 500 caracteres
