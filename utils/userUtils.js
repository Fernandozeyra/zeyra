import User from '../models/User.js';

// Buscar usuário por ID
const findUserById = async (id) => {
  try {
    const user = await User.findById(id).populate([{
      path: 'subscribe.plan',
      select: '-__v'
    },
    {
      path: 'subscribe',
      select: '-__v'
    }  
  ]).select('-__v');
  if (user && user.subscribe.plan) {
     user.coin = (user.subscribe.plan.coin) - (user.subscribe.consumedCoins);
     await user.save();
  }
    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
};

// Buscar usuário por email
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
  }
};

// Buscar usuário por documento
const findUserByDocument = async (document) => {
  try {
    const user = await User.findOne({ document }).populate([{
      path: 'subscribe.plan',
      select: '-__v'
    },
    {
      path: 'subscribe',
      select: '-__v'
    }  
  ]).select('-__v');
    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por documento: ${error.message}`);
  }
};

// Listar todos os usuários ativos
const findActiveUsers = async () => {
  try {
    const users = await User.find({ isActive: true }).select('-__v');
    return users;
  } catch (error) {
    throw new Error(`Erro ao listar usuários ativos: ${error.message}`);
  }
};

// Listar usuários por role
const findUsersByRole = async (role) => {
  try {
    const users = await User.find({ role, isActive: true }).select('-__v');
    return users;
  } catch (error) {
    throw new Error(`Erro ao listar usuários por role: ${error.message}`);
  }
};

// Criar novo usuário
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
};

// Atualizar usuário
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return user;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
};

// Deletar usuário (soft delete - apenas desativa)
const deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    user.isActive = false;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
};

// Ativar usuário
const activateUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    user.isActive = true;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Erro ao ativar usuário: ${error.message}`);
  }
};

// Verificar se email já existe
const isEmailExists = async (email, excludeId = null) => {
  try {
    const query = { email: email.toLowerCase() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const user = await User.findOne(query);
    return !!user;
  } catch (error) {
    throw new Error(`Erro ao verificar email: ${error.message}`);
  }
};

// Verificar se documento já existe
const isDocumentExists = async (document, excludeId = null) => {
  try {
    const query = { document };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const user = await User.findOne(query);
    return !!user;
  } catch (error) {
    throw new Error(`Erro ao verificar documento: ${error.message}`);
  }
};

export {
  findUserById,
  findUserByEmail,
  findUserByDocument,
  findActiveUsers,
  findUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  activateUser,
  isEmailExists,
  isDocumentExists
};
