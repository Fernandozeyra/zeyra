# 🔗 Documentação das Rotas Webhook

## 📋 Visão Geral

Este documento descreve as rotas webhook disponíveis no sistema Neogen. As rotas foram criadas como base para você implementar sua lógica personalizada.

## 🚀 Rotas Disponíveis

### 1. **Webhook Genérico**
```
POST /api/webhook
```

**Descrição**: Rota webhook básica que recebe todas as requisições POST.

**Headers esperados**: Qualquer header HTTP válido
**Body**: Qualquer formato de dados (JSON, form-data, etc.)

**Resposta de sucesso**:
```json
{
  "success": true,
  "message": "Webhook recebido com sucesso",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "received_data": {
    "body": {...},
    "headers": {...},
    "query": {...},
    "method": "POST",
    "url": "/api/webhook"
  }
}
```

### 2. **Webhook com Tipo Dinâmico**
```
POST /api/webhook/:type
```

**Descrição**: Rota webhook que permite diferentes tipos baseados no parâmetro da URL.

**Parâmetros**:
- `:type` - Tipo do webhook (ex: payment, notification, etc.)

**Exemplos de uso**:
- `POST /api/webhook/payment` - Para webhooks de pagamento
- `POST /api/webhook/notification` - Para webhooks de notificação
- `POST /api/webhook/order` - Para webhooks de pedidos

**Resposta de sucesso**:
```json
{
  "success": true,
  "message": "Webhook do tipo 'payment' recebido com sucesso",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "webhook_type": "payment",
  "received_data": {
    "body": {...},
    "headers": {...},
    "query": {...},
    "method": "POST",
    "url": "/api/webhook/payment",
    "params": {
      "type": "payment"
    }
  }
}
```

## 🔧 Como Implementar Sua Lógica

### 1. **Localização das Rotas**
As rotas estão definidas no arquivo `server.js` antes da rota catch-all (`app.get("*")`).

### 2. **Estrutura Básica**
```javascript
app.post('/api/webhook', (req, res) => {
  try {
    // TODO: Implemente sua lógica aqui
    
    // Dados disponíveis:
    const { body, headers, query, method, url } = req;
    
    // Sua lógica personalizada...
    
    res.status(200).json({
      success: true,
      message: 'Processado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno'
    });
  }
});
```

### 3. **Dados Disponíveis**
- **`req.body`**: Corpo da requisição (dados enviados)
- **`req.headers`**: Headers HTTP da requisição
- **`req.query`**: Parâmetros da query string
- **`req.params`**: Parâmetros da URL (para rotas com `:type`)
- **`req.method`**: Método HTTP usado
- **`req.url`**: URL completa da requisição

## 📝 Exemplos de Implementação

### Exemplo 1: Webhook de Pagamento
```javascript
app.post('/api/webhook/payment', (req, res) => {
  try {
    const { amount, currency, status, transaction_id } = req.body;
    
    // Validar dados obrigatórios
    if (!amount || !currency || !status) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios ausentes'
      });
    }
    
    // Processar pagamento
    if (status === 'completed') {
      // Lógica para pagamento confirmado
      console.log(`Pagamento confirmado: ${transaction_id}`);
    }
    
    res.status(200).json({
      success: true,
      message: 'Pagamento processado'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno'
    });
  }
});
```

### Exemplo 2: Webhook de Notificação
```javascript
app.post('/api/webhook/notification', (req, res) => {
  try {
    const { type, message, user_id } = req.body;
    
    // Processar notificação
    switch (type) {
      case 'email':
        // Enviar email
        break;
      case 'sms':
        // Enviar SMS
        break;
      default:
        console.log('Tipo de notificação não reconhecido');
    }
    
    res.status(200).json({
      success: true,
      message: 'Notificação processada'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno'
    });
  }
});
```

## 🧪 Testando as Rotas

### Usando cURL
```bash
# Teste básico
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Teste com tipo
curl -X POST http://localhost:3000/api/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "BRL"}'
```

### Usando Postman
1. **Método**: POST
2. **URL**: `http://localhost:3000/api/webhook`
3. **Headers**: `Content-Type: application/json`
4. **Body**: JSON com seus dados

## 🔒 Segurança e Validação

### Recomendações
1. **Validação de dados**: Sempre valide os dados recebidos
2. **Autenticação**: Considere implementar autenticação (API keys, tokens)
3. **Rate limiting**: Implemente limitação de taxa para evitar spam
4. **Logs**: Mantenha logs de todas as requisições
5. **Tratamento de erros**: Sempre trate erros adequadamente

### Exemplo de Validação
```javascript
app.post('/api/webhook', (req, res) => {
  try {
    // Validar API key
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.WEBHOOK_API_KEY) {
      return res.status(401).json({
        success: false,
        message: 'API key inválida'
      });
    }
    
    // Validar dados obrigatórios
    const { event_type, data } = req.body;
    if (!event_type || !data) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios ausentes'
      });
    }
    
    // Sua lógica aqui...
    
  } catch (error) {
    // Tratamento de erro
  }
});
```

## 📊 Monitoramento

### Logs Automáticos
As rotas já incluem logs automáticos:
- ✅ Headers recebidos
- ✅ Body da requisição
- ✅ Query parameters
- ✅ Timestamp de recebimento
- ✅ Logs de erro

### Exemplo de Log
```
🔔 Webhook recebido
Headers: { 'content-type': 'application/json', ... }
Body: { amount: 100, currency: 'BRL' }
Query params: {}
```

## 🚀 Próximos Passos

1. **Implemente sua lógica** nas rotas existentes
2. **Adicione validações** específicas para seus dados
3. **Implemente autenticação** se necessário
4. **Adicione testes** para suas funcionalidades
5. **Configure monitoramento** e alertas

---

**🎯 Rotas webhook criadas e prontas para implementação!**
