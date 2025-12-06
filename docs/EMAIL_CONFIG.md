# Configuração do Sistema de Email

## Configurações SMTP (Hostinger)

O sistema de email está configurado para usar o servidor SMTP do Hostinger com as seguintes configurações:

- **Host:** smtp.hostinger.com
- **Porta:** 465
- **Criptografia:** SSL/TLS
- **Seguro:** Sim (true)

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env`:

```bash
# Configurações de Email SMTP (Hostinger)
SMTP_USER=seu_email@seudominio.com
SMTP_PASS=sua_senha_smtp
SMTP_FROM=seu_email@seudominio.com

# URL do Frontend (para links nos emails)
FRONTEND_URL=http://localhost:3000
```

## Como Obter as Credenciais SMTP

1. Acesse o painel de controle do Hostinger
2. Vá para "Email" > "Contas de Email"
3. Crie uma nova conta de email ou use uma existente
4. Clique em "Configurações" da conta
5. Copie as informações SMTP:
   - Usuário: email@seudominio.com
   - Senha: senha da conta de email
   - Servidor: smtp.hostinger.com
   - Porta: 465

## Funções Disponíveis

### 1. `sendEmail(to, subject, text, html)`
Envia um email simples com texto e HTML opcional.

### 2. `sendWelcomeEmail(to, userName, password)`
Envia email de boas-vindas para novos usuários.

### 3. `sendPasswordResetEmail(to, userName, resetToken)`
Envia email para redefinição de senha.

### 4. `sendPlanNotificationEmail(to, userName, planName, action)`
Envia notificação sobre mudanças no plano.

### 5. `sendTestEmail(to)`
Envia email de teste para verificar a configuração.

### 6. `verifyEmailConfig()`
Verifica se as configurações de email estão válidas.

## Exemplo de Uso

```javascript
import { 
  sendEmail, 
  sendWelcomeEmail, 
  sendTestEmail,
  verifyEmailConfig 
} from './utils/emailUtils.js';

// Verificar configuração
const isValid = await verifyEmailConfig();

// Enviar email de teste
await sendTestEmail('teste@exemplo.com');

// Enviar email de boas-vindas
await sendWelcomeEmail('usuario@exemplo.com', 'João Silva', 'senha123');

// Enviar email personalizado
await sendEmail(
  'destinatario@exemplo.com',
  'Assunto do Email',
  'Conteúdo em texto',
  '<h1>Conteúdo em HTML</h1>'
);
```

## Testando a Configuração

1. Configure as variáveis de ambiente
2. Execute o servidor
3. Use a função `verifyEmailConfig()` para verificar a conexão
4. Envie um email de teste com `sendTestEmail()`

## Solução de Problemas

### Erro de Autenticação
- Verifique se `SMTP_USER` e `SMTP_PASS` estão corretos
- Confirme se a conta de email está ativa no Hostinger

### Erro de Conexão
- Verifique se a porta 465 não está bloqueada pelo firewall
- Confirme se o servidor SMTP está acessível

### Emails não chegam
- Verifique a pasta de spam
- Confirme se o domínio de origem não está na lista negra
- Teste com diferentes provedores de email

## Segurança

- Nunca commite as credenciais SMTP no Git
- Use variáveis de ambiente para todas as configurações sensíveis
- Considere usar um serviço de email transacional para produção
- Implemente rate limiting para evitar spam
