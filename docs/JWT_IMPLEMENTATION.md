# Implementação JWT no Sistema de Autenticação

## Visão Geral

Este documento descreve a implementação de autenticação JWT (JSON Web Token) no sistema de autenticação do projeto Neogen.

## Funcionalidades Implementadas

### 1. Autenticação com JWT

A função `authenticateUser` foi modificada para gerar e retornar um token JWT após autenticação bem-sucedida.

**Antes:**
```javascript
// Retornava apenas o perfil do usuário
return user.getPublicProfile();
```

**Depois:**
```javascript
// Retorna usuário + token JWT
return {
  user: user.getPublicProfile(),
  token: token,
  expiresIn: JWT_EXPIRES_IN
};
```

### 2. Verificação de Token JWT

#### `verifyJWTToken(token)`
Verifica se um token JWT é válido e retorna o payload decodificado.

```javascript
const { verifyJWTToken } = require('../utils/authUtils');

const result = verifyJWTToken(token);
if (result.valid) {
  console.log('Token válido:', result.payload);
} else {
  console.log('Token inválido:', result.error);
}
```

#### `extractTokenFromHeader(authHeader)`
Extrai o token JWT do header Authorization HTTP.

```javascript
const { extractTokenFromHeader } = require('../utils/authUtils');

const token = extractTokenFromHeader(req.headers.authorization);
if (token) {
  // Token encontrado
} else {
  // Header Authorization inválido ou ausente
}
```

### 3. Verificação de Sessão com Token

A função `verifyUserSession` foi atualizada para aceitar um token JWT opcional:

```javascript
const { verifyUserSession } = require('../utils/authUtils');

// Sem token (comportamento anterior)
const user = await verifyUserSession(userId);

// Com token JWT
const user = await verifyUserSession(userId, token);
```

## Configuração

### Variáveis de Ambiente

Configure as seguintes variáveis no seu arquivo `.env`:

```bash
# Chave secreta para assinar tokens JWT
JWT_SECRET=sua_chave_secreta_jwt_muito_segura_aqui

# Tempo de expiração do token
JWT_EXPIRES_IN=24h
```

**⚠️ IMPORTANTE:** Em produção, sempre use uma chave secreta forte e única para `JWT_SECRET`.

### Valores Padrão

Se as variáveis de ambiente não estiverem configuradas, o sistema usará:

- `JWT_SECRET`: `'sua_chave_secreta_jwt_padrao'`
- `JWT_EXPIRES_IN`: `'24h'`

## Estrutura do Token JWT

O token JWT contém as seguintes informações:

```javascript
{
  userId: "ID_do_usuário",
  email: "email@exemplo.com",
  role: "papel_do_usuário",
  isActive: true,
  iat: 1234567890,        // Timestamp de criação
  exp: 1234654290         // Timestamp de expiração
}
```

## Exemplo de Uso

### 1. Autenticação de Usuário

```javascript
const { authenticateUser } = require('../utils/authUtils');

try {
  const result = await authenticateUser('usuario@exemplo.com', 'senha123');
  
  console.log('Usuário autenticado:', result.user);
  console.log('Token JWT:', result.token);
  console.log('Expira em:', result.expiresIn);
  
  // Armazenar token para uso posterior
  localStorage.setItem('authToken', result.token);
  
} catch (error) {
  console.error('Erro na autenticação:', error.message);
}
```

### 2. Verificação de Token em Middleware

```javascript
const { verifyJWTToken, extractTokenFromHeader } = require('../utils/authUtils');

const authMiddleware = (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }
    
    const tokenVerification = verifyJWTToken(token);
    if (!tokenVerification.valid) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    // Adicionar informações do usuário ao request
    req.user = tokenVerification.payload;
    next();
    
  } catch (error) {
    return res.status(401).json({ error: 'Erro na autenticação' });
  }
};
```

### 3. Verificação de Sessão com Token

```javascript
const { verifyUserSession } = require('../utils/authUtils');

const checkUserSession = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = extractTokenFromHeader(req.headers.authorization);
    
    const user = await verifyUserSession(userId, token);
    res.json({ user });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

## Segurança

### Boas Práticas

1. **Chave Secreta Forte**: Use uma chave secreta longa e aleatória em produção
2. **Expiração de Token**: Configure um tempo de expiração apropriado
3. **HTTPS**: Sempre use HTTPS em produção para transmitir tokens
4. **Armazenamento Seguro**: Armazene tokens de forma segura no cliente
5. **Validação**: Sempre valide tokens antes de processar requisições

### Validações Implementadas

- Verificação de assinatura do token
- Verificação de expiração
- Verificação de correspondência entre token e usuário
- Tratamento de erros de validação

## Dependências

O projeto agora inclui:

```json
{
  "jsonwebtoken": "^9.0.0"
}
```

## Compatibilidade

As modificações são totalmente compatíveis com o código existente:

- Funções existentes mantêm a mesma assinatura
- Novas funcionalidades são opcionais
- Comportamento padrão é preservado quando tokens não são fornecidos

## Próximos Passos

1. Configurar variáveis de ambiente para produção
2. Implementar middleware de autenticação
3. Adicionar refresh tokens se necessário
4. Implementar logout e invalidação de tokens
5. Adicionar testes para funcionalidades JWT
