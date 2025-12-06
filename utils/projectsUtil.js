import Project from "../models/Project.js";

/**
 * Utilitários para gerenciar projetos
 */
export class ProjectsUtil {
  /**
   * Criar um novo projeto
   * @param {Object} projectData - Dados do projeto
   * @param {string} projectData.name - Nome do projeto
   * @param {string} projectData.data - Conteúdo/dados do projeto
   * @param {string} projectData.user - ID do usuário
   * @returns {Promise<Object>} Projeto criado
   */
  static async createProject(projectData) {
    try {
      const project = new Project(projectData);
      const savedProject = await project.save();

      // Popula o campo user com dados básicos
      await savedProject.populate("user", "name email");

      return {
        success: true,
        data: savedProject,
        message: "Projeto criado com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao criar projeto",
      };
    }
  }

  /**
   * Listar projetos por userId
   * @param {string} userId - ID do usuário
   * @param {Object} options - Opções de paginação e filtros
   * @param {number} options.page - Página atual (padrão: 1)
   * @param {number} options.limit - Limite por página (padrão: 10)
   * @param {string} options.sortBy - Campo para ordenação (padrão: 'createdAt')
   * @param {string} options.sortOrder - Ordem de classificação (padrão: 'desc')
   * @returns {Promise<Object>} Lista de projetos paginada
   */
  static async getProjectsByUserId(userId, options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = options;

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

      const [projects, total] = await Promise.all([
        Project.find({ user: userId })
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate("user", "name email"),
        Project.countDocuments({ user: userId }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          projects,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Projetos listados com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao listar projetos:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao listar projetos",
      };
    }
  }

  /**
   * Buscar projeto por ID
   * @param {string} projectId - ID do projeto
   * @param {string} userId - ID do usuário (para verificação de permissão)
   * @returns {Promise<Object>} Projeto encontrado
   */
  static async getProjectById(projectId, userId) {
    try {
      const project = await Project.findOne({
        _id: projectId,
        user: userId,
      }).populate("user", "name email");

      if (!project) {
        return {
          success: false,
          message: "Projeto não encontrado ou sem permissão de acesso",
        };
      }

      return {
        success: true,
        data: project,
        message: "Projeto encontrado com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao buscar projeto:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao buscar projeto",
      };
    }
  }

  /**
   * Editar projeto
   * @param {string} projectId - ID do projeto
   * @param {string} userId - ID do usuário
   * @param {Object} updateData - Dados para atualização
   * @param {string} updateData.name - Novo nome do projeto (opcional)
   * @param {string} updateData.data - Novos dados do projeto (opcional)
   * @returns {Promise<Object>} Projeto atualizado
   */
  static async updateProject(projectId, userId, updateData) {
    try {
      // Verifica se o projeto existe e pertence ao usuário
      const existingProject = await Project.findOne({
        _id: projectId,
        user: userId,
      });

      if (!existingProject) {
        return {
          success: false,
          message: "Projeto não encontrado ou sem permissão de edição",
        };
      }

      // Atualiza apenas os campos fornecidos
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      ).populate("user", "name email");

      return {
        success: true,
        data: updatedProject,
        message: "Projeto atualizado com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao atualizar projeto",
      };
    }
  }

  /**
   * Deletar projeto
   * @param {string} projectId - ID do projeto
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object>} Resultado da operação
   */
  static async deleteProject(projectId, userId) {
    try {
      // Verifica se o projeto existe e pertence ao usuário
      const existingProject = await Project.findOne({
        _id: projectId,
        user: userId,
      });

      if (!existingProject) {
        return {
          success: false,
          message: "Projeto não encontrado ou sem permissão de exclusão",
        };
      }

      await Project.findByIdAndDelete(projectId);

      return {
        success: true,
        message: "Projeto deletado com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao deletar projeto",
      };
    }
  }

  /**
   * Contar projetos por usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object>} Contagem de projetos
   */
  static async countProjectsByUserId(userId) {
    try {
      const count = await Project.countDocuments({ user: userId });

      return {
        success: true,
        data: { count },
        message: "Contagem realizada com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao contar projetos:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro ao contar projetos",
      };
    }
  }

  /**
   * Buscar projetos por nome (busca parcial)
   * @param {string} userId - ID do usuário
   * @param {string} searchTerm - Termo de busca
   * @param {Object} options - Opções de paginação
   * @returns {Promise<Object>} Projetos encontrados
   */
  static async searchProjectsByName(userId, searchTerm, options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = options;

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

      const regex = new RegExp(searchTerm, "i"); // Busca case-insensitive

      const [projects, total] = await Promise.all([
        Project.find({
          user: userId,
          name: { $regex: regex },
        })
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate("user", "name email"),
        Project.countDocuments({
          user: userId,
          name: { $regex: regex },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          projects,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Busca realizada com sucesso!",
      };
    } catch (error) {
      console.error("Erro na busca de projetos:", error);
      return {
        success: false,
        error: error.message,
        message: "Erro na busca de projetos",
      };
    }
  }
}

// Exporta métodos individuais para uso direto
export const {
  createProject,
  getProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
  countProjectsByUserId,
  searchProjectsByName,
} = ProjectsUtil;
