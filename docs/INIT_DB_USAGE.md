# Comando de Inicialização do Banco de Dados

## Visão Geral

Este documento explica como usar o comando `init-db` para inicializar o banco de dados com dados de exemplo.

## Comando Disponível

### NPM Script

```bash
npm run init-db
```

### Execução Direta

```bash
node config/initDB.js
```

## O que o Comando Faz

### 1. Conexão com o Banco
- Conecta ao MongoDB usando a variável de ambiente `MONGODB_URI`
- Se não configurada, usa `mongodb://localhost:27017/neogen` como padrão

### 2. Verificação de Dados Existentes
- Verifica se já existem usuários no banco
- Verifica se já existem planos no banco
- Evita duplicação de dados

### 3. Criação de Usuários de Exemplo (se necessário)

#### Usuário Administrador
```javascript
{
  email: 'admin@neogen.com',
  phone: '(11) 99999-9999',
  name: 'Administrador',
  document: '123.456.789-00',
  role: 'ADM',
  isActive: true,
  coin: 1000,
  auth: {
    email: 'admin@neogen.com',
    password: 'admin123'
  }
}
```

#### Usuário Cliente
```javascript
{
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
  }
}
```

### 4. Criação de Planos de Exemplo (se necessário)

```javascript
[
  { code: 'O6905784E', coin: 50 },
  { code: 'O6EEDA811', coin: 100 },
  { code: 'O39902A4F', coin: 200 },
  { code: 'OB6E36CA6', coin: 500 }
]
```

## Configuração

### Variáveis de Ambiente

Configure no seu arquivo `.env`:

```bash
# URI de conexão com MongoDB
MONGODB_URI=mongodb://localhost:27017/neogen

# Ou para MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/neogen
```

### Valores Padrão

Se `MONGODB_URI` não estiver configurada:
- **Desenvolvimento local**: `mongodb://localhost:27017/neogen`
- **Produção**: Configure sempre a variável de ambiente

## Casos de Uso

### 1. Primeira Execução
```bash
npm run init-db
# Cria usuários e planos de exemplo
```

### 2. Execuções Subsequentes
```bash
npm run init-db
# Verifica dados existentes e não duplica
```

### 3. Reset do Banco (Desenvolvimento)
```bash
# Primeiro, limpe o banco manualmente
# Depois execute:
npm run init-db
```

## Saída do Comando

### Sucesso
```
MongoDB conectado: [host]
Usuários já existem. Pulando criação de usuários de exemplo.
Planos já existem. Pulando criação de planos de exemplo.
Banco de dados inicializado com sucesso!
Script de inicialização concluído.
```

### Erro de Conexão
```
Erro ao conectar com MongoDB: [mensagem de erro]
```

### Erro na Execução
```
Erro na execução: [mensagem de erro]
```

## Segurança

### Dados de Exemplo
- **NÃO USE** as senhas padrão em produção
- **ALTERE** as credenciais após a primeira execução
- **REMOVA** usuários de exemplo em ambiente de produção

### Credenciais Padrão
- **Admin**: `admin@neogen.com` / `admin123`
- **Cliente**: `cliente@exemplo.com` / `cliente123`

## Troubleshooting

### Erro de Conexão
1. Verifique se o MongoDB está rodando
2. Confirme a URI de conexão
3. Verifique credenciais (se aplicável)

### Erro de Permissão
1. Verifique se o usuário tem acesso ao banco
2. Confirme se o banco existe

### Dados Não Criados
1. Verifique logs de erro
2. Confirme se não há dados existentes
3. Verifique permissões de escrita

## Integração com CI/CD

### Script de Setup
```bash
#!/bin/bash
# setup-db.sh
npm run init-db
```

### Docker
```dockerfile
# No Dockerfile
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run init-db
```

## Próximos Passos

1. **Configurar variáveis de ambiente** para produção
2. **Alterar senhas padrão** após primeira execução
3. **Implementar scripts de migração** para futuras atualizações
4. **Adicionar validações** de dados antes da criação
5. **Implementar rollback** em caso de erro
