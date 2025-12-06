const User = require('../models/User');

// Adicionar moedas a um usuário
const addCoins = async (userId, amount) => {
  try {
    if (amount <= 0) {
      throw new Error('Quantidade de moedas deve ser maior que zero');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    user.coin += amount;
    await user.save();
    
    return user;
  } catch (error) {
    throw new Error(`Erro ao adicionar moedas: ${error.message}`);
  }
};

// Remover moedas de um usuário
const removeCoins = async (userId, amount) => {
  try {
    if (amount <= 0) {
      throw new Error('Quantidade de moedas deve ser maior que zero');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.coin < amount) {
      throw new Error('Saldo insuficiente de moedas');
    }

    user.coin -= amount;
    await user.save();
    
    return user;
  } catch (error) {
    throw new Error(`Erro ao remover moedas: ${error.message}`);
  }
};

// Definir quantidade específica de moedas
const setCoins = async (userId, amount) => {
  try {
    if (amount < 0) {
      throw new Error('Quantidade de moedas não pode ser negativa');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { coin: amount },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  } catch (error) {
    throw new Error(`Erro ao definir moedas: ${error.message}`);
  }
};

// Verificar saldo de moedas
const getCoinBalance = async (userId) => {
  try {
    const user = await User.findById(userId).select('coin name email');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      coinBalance: user.coin
    };
  } catch (error) {
    throw new Error(`Erro ao verificar saldo: ${error.message}`);
  }
};

// Transferir moedas entre usuários
const transferCoins = async (fromUserId, toUserId, amount) => {
  try {
    if (amount <= 0) {
      throw new Error('Quantidade de moedas deve ser maior que zero');
    }

    // Verificar se ambos os usuários existem
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      throw new Error('Um ou ambos os usuários não foram encontrados');
    }

    if (fromUser.coin < amount) {
      throw new Error('Saldo insuficiente para transferência');
    }

    // Executar transferência
    fromUser.coin -= amount;
    toUser.coin += amount;

    await fromUser.save();
    await toUser.save();

    return {
      from: {
        userId: fromUser._id,
        name: fromUser.name,
        newBalance: fromUser.coin
      },
      to: {
        userId: toUser._id,
        name: toUser.name,
        newBalance: toUser.coin
      },
      amount: amount
    };
  } catch (error) {
    throw new Error(`Erro na transferência: ${error.message}`);
  }
};

// Listar usuários com mais moedas (ranking)
const getTopUsersByCoins = async (limit = 10) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name email coin role')
      .sort({ coin: -1 })
      .limit(limit);

    return users.map((user, index) => ({
      position: index + 1,
      name: user.name,
      email: user.email,
      coin: user.coin,
      role: user.role
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar ranking: ${error.message}`);
  }
};

// Resetar moedas de todos os usuários
const resetAllCoins = async (amount = 0) => {
  try {
    if (amount < 0) {
      throw new Error('Quantidade de moedas não pode ser negativa');
    }

    const result = await User.updateMany(
      { isActive: true },
      { coin: amount }
    );

    return {
      message: `Moedas resetadas para ${amount} para ${result.modifiedCount} usuários`,
      modifiedCount: result.modifiedCount
    };
  } catch (error) {
    throw new Error(`Erro ao resetar moedas: ${error.message}`);
  }
};

// Verificar se usuário tem moedas suficientes
const hasEnoughCoins = async (userId, requiredAmount) => {
  try {
    const user = await User.findById(userId).select('coin name');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      hasEnough: user.coin >= requiredAmount,
      currentBalance: user.coin,
      requiredAmount: requiredAmount,
      difference: user.coin - requiredAmount,
      userName: user.name
    };
  } catch (error) {
    throw new Error(`Erro ao verificar saldo: ${error.message}`);
  }
};

module.exports = {
  addCoins,
  removeCoins,
  setCoins,
  getCoinBalance,
  transferCoins,
  getTopUsersByCoins,
  resetAllCoins,
  hasEnoughCoins
};
