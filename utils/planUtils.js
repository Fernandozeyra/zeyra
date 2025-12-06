const Plan = require('../models/Plan');

// Criar novo plano
const createPlan = async (planData) => {
  try {
    const plan = new Plan(planData);
    const savedPlan = await plan.save();
    return savedPlan;
  } catch (error) {
    throw new Error(`Erro ao criar plano: ${error.message}`);
  }
};

// Buscar plano por ID
const findPlanById = async (id) => {
  try {
    const plan = await Plan.findById(id);
    return plan;
  } catch (error) {
    throw new Error(`Erro ao buscar plano: ${error.message}`);
  }
};

// Buscar plano por código
const findPlanByCode = async (code) => {
  try {
    const plan = await Plan.findByCode(code);
    return plan;
  } catch (error) {
    throw new Error(`Erro ao buscar plano por código: ${error.message}`);
  }
};

// Listar todos os planos
const findAllPlans = async () => {
  try {
    const plans = await Plan.find().sort({ coin: 1 });
    return plans;
  } catch (error) {
    throw new Error(`Erro ao listar planos: ${error.message}`);
  }
};

// Buscar planos por faixa de moedas
const findPlansByCoinRange = async (minCoins, maxCoins) => {
  try {
    const plans = await Plan.findByCoinRange(minCoins, maxCoins);
    return plans;
  } catch (error) {
    throw new Error(`Erro ao buscar planos por faixa de moedas: ${error.message}`);
  }
};

// Atualizar plano
const updatePlan = async (id, updateData) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return plan;
  } catch (error) {
    throw new Error(`Erro ao atualizar plano: ${error.message}`);
  }
};

// Deletar plano
const deletePlan = async (id) => {
  try {
    const plan = await Plan.findByIdAndDelete(id);
    return plan;
  } catch (error) {
    throw new Error(`Erro ao deletar plano: ${error.message}`);
  }
};

// Verificar se código já existe
const isCodeExists = async (code, excludeId = null) => {
  try {
    const query = { code: code.toUpperCase() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const plan = await Plan.findOne(query);
    return !!plan;
  } catch (error) {
    throw new Error(`Erro ao verificar código: ${error.message}`);
  }
};

// Buscar planos ordenados por moedas (crescente)
const findPlansOrderedByCoins = async (limit = null) => {
  try {
    let query = Plan.find().sort({ coin: 1 });
    if (limit) {
      query = query.limit(limit);
    }
    const plans = await query;
    return plans;
  } catch (error) {
    throw new Error(`Erro ao buscar planos ordenados: ${error.message}`);
  }
};

// Buscar planos com moedas acima de um valor
const findPlansAboveCoins = async (minCoins) => {
  try {
    const plans = await Plan.find({ coin: { $gte: minCoins } }).sort({ coin: 1 });
    return plans;
  } catch (error) {
    throw new Error(`Erro ao buscar planos acima de ${minCoins} moedas: ${error.message}`);
  }
};

// Buscar planos com moedas abaixo de um valor
const findPlansBelowCoins = async (maxCoins) => {
  try {
    const plans = await Plan.find({ coin: { $lte: maxCoins } }).sort({ coin: 1 });
    return plans;
  } catch (error) {
    throw new Error(`Erro ao buscar planos abaixo de ${maxCoins} moedas: ${error.message}`);
  }
};

// Contar total de planos
const countPlans = async () => {
  try {
    const count = await Plan.countDocuments();
    return count;
  } catch (error) {
    throw new Error(`Erro ao contar planos: ${error.message}`);
  }
};

// Obter estatísticas dos planos
const getPlanStats = async () => {
  try {
    const stats = await Plan.aggregate([
      {
        $group: {
          _id: null,
          totalPlans: { $sum: 1 },
          minCoins: { $min: '$coin' },
          maxCoins: { $max: '$coin' },
          avgCoins: { $avg: '$coin' },
          totalCoins: { $sum: '$coin' }
        }
      }
    ]);
    
    return stats[0] || {
      totalPlans: 0,
      minCoins: 0,
      maxCoins: 0,
      avgCoins: 0,
      totalCoins: 0
    };
  } catch (error) {
    throw new Error(`Erro ao obter estatísticas: ${error.message}`);
  }
};

module.exports = {
  createPlan,
  findPlanById,
  findPlanByCode,
  findAllPlans,
  findPlansByCoinRange,
  updatePlan,
  deletePlan,
  isCodeExists,
  findPlansOrderedByCoins,
  findPlansAboveCoins,
  findPlansBelowCoins,
  countPlans,
  getPlanStats
};
