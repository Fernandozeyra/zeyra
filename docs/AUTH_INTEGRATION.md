# Integração de Autenticação com JWT

## Visão Geral

Este documento descreve a integração completa entre a página de login (`/login`) e a rota de autenticação (`/api/auth/login`) do backend, incluindo o sistema de gerenciamento de estado e proteção de rotas.

## Arquitetura da Solução

### 1. Contexto de Autenticação (`AuthContext`)

O `AuthContext` gerencia todo o estado de autenticação da aplicação:

```typescript
interface AuthContextType {
  user: User | null;           // Dados do usuário logado
  token: string | null;         // Token JWT
  isAuthenticated: boolean;     // Status de autenticação
  isLoading: boolean;           // Estado de carregamento
  login: (email, password) => Promise<{success, message}>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
```

### 2. Rota de Autenticação (`/api/auth/login`)

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response de Sucesso:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "usuario@exemplo.com",
      "name": "Nome do Usuário",
      "role": "CLIENT",
      "isActive": true,
      "coin": 100
    },
    "token": "jwt_token_aqui",
    "expiresIn": "24h"
  }
}
```

**Response de Erro:**
```json
{
  "success": false,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Email ou senha incorretos"
}
```

## Componentes Implementados

### 1. `AuthProvider`

Wrapper que fornece o contexto de autenticação para toda a aplicação:

```tsx
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      {/* Sua aplicação aqui */}
    </AuthProvider>
  );
}
```

### 2. `ProtectedRoute`

Componente que protege rotas que requerem autenticação:

```tsx
import ProtectedRoute from "./components/ProtectedRoute";

<Route 
  path="/generator" 
  element={
    <ProtectedRoute>
      <GeneratorPage />
    </ProtectedRoute>
  } 
/>
```

### 3. `UserHeader`

Header que exibe informações do usuário logado:

```tsx
import UserHeader from "./components/UserHeader";

// Adicionado automaticamente em páginas protegidas
<UserHeader />
```

## Como Usar

### 1. Login do Usuário

```tsx
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  
  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    
    if (result.success) {
      // Login bem-sucedido
      navigate("/generator");
    } else {
      // Exibir erro
      toast.error(result.message);
    }
  };
}
```

### 2. Verificar Status de Autenticação

```tsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) return <div>Carregando...</div>;
  
  if (!isAuthenticated) {
    return <div>Faça login para continuar</div>;
  }
  
  return <div>Bem-vindo, {user?.name}!</div>;
}
```

### 3. Logout

```tsx
import { useAuth } from "../contexts/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      logout();
    }
  };
  
  return <button onClick={handleLogout}>Sair</button>;
}
```

## Fluxo de Autenticação

### 1. Processo de Login

```
Usuário → Página Login → Formulário → /api/auth/login → JWT Token → Redirecionamento
```

1. Usuário acessa `/login`
2. Preenche email e senha
3. Frontend chama `/api/auth/login`
4. Backend valida credenciais e retorna JWT
5. Frontend armazena token e dados do usuário
6. Usuário é redirecionado para página original ou `/generator`

### 2. Proteção de Rotas

```
Rota Protegida → ProtectedRoute → Verifica Auth → Renderiza ou Redireciona
```

1. Usuário tenta acessar rota protegida
2. `ProtectedRoute` verifica status de autenticação
3. Se autenticado: renderiza componente
4. Se não autenticado: redireciona para `/login`

### 3. Verificação de Token

```
Request → Verifica Token → Valida JWT → Permite ou Bloqueia
```

1. Frontend envia token em headers
2. Backend verifica assinatura e expiração
3. Se válido: permite acesso
4. Se inválido: retorna 401

## Configuração

### 1. Variáveis de Ambiente

```bash
# Backend (.env)
JWT_SECRET=sua_chave_secreta_jwt_muito_segura
JWT_EXPIRES_IN=24h
MONGODB_URI=mongodb://localhost:27017/neogen
```

### 2. Rotas Protegidas

Atualize `src/app.tsx` para proteger rotas:

```tsx
<Route 
  path="/generator" 
  element={
    <ProtectedRoute>
      <GeneratorPage />
    </ProtectedRoute>
  } 
/>
```

### 3. Adicionar UserHeader

Em páginas que devem mostrar informações do usuário:

```tsx
import UserHeader from "../components/UserHeader";

function MyPage() {
  return (
    <div>
      <UserHeader />
      {/* Conteúdo da página */}
    </div>
  );
}
```

## Segurança

### 1. Armazenamento de Token

- Token JWT é armazenado em `localStorage`
- **⚠️ IMPORTANTE:** Em produção, considere usar `httpOnly` cookies

### 2. Validação de Token

- Backend valida assinatura e expiração
- Frontend verifica existência antes de fazer requests

### 3. Proteção de Rotas

- Rotas sensíveis são protegidas por `ProtectedRoute`
- Redirecionamento automático para login

## Tratamento de Erros

### 1. Erros de Login

```tsx
try {
  const result = await login(email, password);
  if (result.success) {
    // Sucesso
  } else {
    toast.error(result.message);
  }
} catch (error) {
  toast.error("Erro de conexão. Tente novamente.");
}
```

### 2. Erros de Autenticação

```tsx
// Token expirado ou inválido
if (response.status === 401) {
  logout(); // Limpa estado e redireciona
}
```

## Exemplos de Uso

### 1. Página de Login Completa

```tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success(result.message);
        const from = location.state?.from?.pathname || "/generator";
        navigate(from);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
    </form>
  );
}
```

### 2. Componente com Autenticação

```tsx
import { useAuth } from "../contexts/AuthContext";

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Faça login para ver seu perfil</div>;
  }

  return (
    <div>
      <h2>Perfil de {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Coins: {user?.coin}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## Troubleshooting

### 1. Token Não Persiste

- Verifique se `localStorage` está funcionando
- Confirme se o token está sendo retornado pelo backend

### 2. Rotas Não Protegidas

- Verifique se `ProtectedRoute` está envolvendo o componente
- Confirme se `AuthProvider` está no nível correto

### 3. Erros de CORS

- Verifique configuração do proxy no `vite.config.ts`
- Confirme se o backend está aceitando requests do frontend

### 4. Usuário Não Redireciona

- Verifique se `navigate()` está sendo chamado
- Confirme se não há loops de redirecionamento

## Próximos Passos

1. **Implementar refresh tokens** para renovação automática
2. **Adicionar middleware de autenticação** no backend
3. **Implementar recuperação de senha**
4. **Adicionar validação de força de senha**
5. **Implementar rate limiting** para tentativas de login
6. **Adicionar logs de auditoria** para ações sensíveis
7. **Implementar logout em múltiplas abas**
8. **Adicionar testes automatizados** para fluxos de autenticação
