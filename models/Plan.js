import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Código do plano é obrigatório'],
    unique: true,
    trim: true,
    uppercase: true,
    minlength: [3, 'Código deve ter pelo menos 3 caracteres'],
    maxlength: [20, 'Código não pode exceder 20 caracteres']
  },
  name: {
    type: String,
    required: [true, 'Nome do plano é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  coin: {
    type: Number,
    required: [true, 'Quantidade de moedas é obrigatória'],
    min: [1, 'Quantidade de moedas deve ser maior que zero']
  },
  numSites: {
    type: Number,
    required: [true, 'Número de sites é obrigatório'],
    min: [1, 'Número de sites deve ser maior que zero']
  },
  visitLimit: {
    type: Number,
    required: [true, 'Limite de visitas é obrigatório'],
    min: [1, 'Limite de visitas deve ser maior que zero']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Descrição não pode exceder 500 caracteres']
  }
  
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  collection: 'plans'
});

// Índices para melhor performance
planSchema.index({ coin: 1 });

// Middleware para limpar dados antes de salvar
planSchema.pre('save', function(next) {
  if (this.code) {
    this.code = this.code.trim().toUpperCase();
  }
  next();
});

// Método para verificar se o plano é válido
planSchema.methods.isValid = function() {
  return this.coin > 0 && this.code && this.code.length >= 3 && 
         this.name && this.name.length >= 2 && 
         this.numSites > 0 && this.visitLimit > 0;
};

// Método para obter informações do plano
planSchema.methods.getPlanInfo = function() {
  return {
    code: this.code,
    name: this.name,
    coin: this.coin,
    numSites: this.numSites,
    visitLimit: this.visitLimit,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Método estático para buscar plano por código
planSchema.statics.findByCode = function(code) {
  return this.findOne({ code: code.toUpperCase() });
};

// Método estático para buscar planos por faixa de moedas
planSchema.statics.findByCoinRange = function(minCoins, maxCoins) {
  return this.find({
    coin: {
      $gte: minCoins,
      $lte: maxCoins
    }
  }).sort({ coin: 1 });
};

// Método estático para buscar planos por número de sites
planSchema.statics.findByNumSites = function(numSites) {
  return this.find({ numSites: { $gte: numSites } }).sort({ coin: 1 });
};

// Método estático para buscar planos por limite de visitas
planSchema.statics.findByVisitLimit = function(visitLimit) {
  return this.find({ visitLimit: { $gte: visitLimit } }).sort({ coin: 1 });
};

// Método estático para buscar planos ativos
planSchema.statics.findActivePlans = function() {
  return this.find().sort({ coin: 1 });
};

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
