import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  document: {
    type: String,
    required: [true, 'Documento é obrigatório'],
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: {
      values: ['ADM', 'CLIENT'],
      message: 'Role deve ser ADM ou CLIENT'
    },
    required: [true, 'Role é obrigatório'],
    default: 'CLIENT'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  coin: {
    type: Number,
    default: 0,
    min: [0, 'Coin não pode ser negativo']
  },
  auth: {
    email: {
      type: String,
      required: [true, 'Email de autenticação é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email de autenticação inválido']
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
      select: false // Não retorna a senha nas consultas por padrão
    },
    codeResetPassword: {
      type: String,
      required: false,
      select: false
    }
  },
  subscribe: {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan'
    },
    consumedCoins: {
      type: Number,
      default: 0,
      min: [0, 'Moedas consumidas não podem ser negativas']
    },
    consumedSites: {
      type: Number,
      default: 0,
      min: [0, 'Sites consumidos não podem ser negativos']
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  collection: 'users'
});

// Índices para melhor performance
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual: projetos do usuário (1:N)
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  // Só hash a senha se ela foi modificada
  if (!this.isModified('auth.password')) {
    return next();
  }
  
  try {
    // Hash da senha com salt de 12 rounds
    const salt = await bcrypt.genSalt(12);
    this.auth.password = await bcrypt.hash(this.auth.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware para limpar dados antes de salvar
userSchema.pre('save', function(next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  if (this.document) {
    this.document = this.document.trim().replace(/\D/g, '');
  }
  if (this.phone) {
    this.phone = this.phone.trim().replace(/\D/g, '');
  }
  if (this.auth && this.auth.email) {
    this.auth.email = this.auth.email.toLowerCase().trim();
  }
  next();
});

// Método para verificar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.auth.password);
  } catch (error) {
    throw new Error('Erro ao comparar senha');
  }
};

// Método para desativar usuário
userSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

// Método para ativar usuário
userSchema.methods.activate = function() {
  this.isActive = true;
  return this.save();
};

// Método para verificar se é admin
userSchema.methods.isAdmin = function() {
  return this.role === 'ADM';
};

// Método para obter dados públicos do usuário (sem senha)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.auth.password;
  return userObject;
};

// Método para verificar se o usuário tem assinatura ativa
userSchema.methods.hasActiveSubscription = function() {
  return this.subscribe && this.subscribe.isActive && 
         this.subscribe.endDate && new Date() <= this.subscribe.endDate;
};

// Método para obter informações da assinatura
userSchema.methods.getSubscriptionInfo = function() {
  if (!this.subscribe) return null;
  
  return {
    plan: this.subscribe.plan,
    consumedCoins: this.subscribe.consumedCoins,
    consumedSites: this.subscribe.consumedSites,
    startDate: this.subscribe.startDate,
    endDate: this.subscribe.endDate,
    isActive: this.subscribe.isActive,
    hasActiveSubscription: this.hasActiveSubscription()
  };
};

// Método para consumir moedas
userSchema.methods.consumeCoins = function(amount) {
  if (this.coin < amount) {
    throw new Error('Moedas insuficientes');
  }
  this.coin -= amount;
  if (this.subscribe) {
    this.subscribe.consumedCoins += amount;
  }
  return this.save();
};

// Método para consumir sites
userSchema.methods.consumeSite = function() {
  if (this.subscribe && this.subscribe.plan && 
      this.subscribe.consumedSites >= this.subscribe.plan.numSites) {
    throw new Error('Limite de sites atingido');
  }
  if (this.subscribe) {
    this.subscribe.consumedSites += 1;
  }
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;
