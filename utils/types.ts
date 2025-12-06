export interface Auth {
  preferred_username: string;
  picture: string;
  name: string;
  isLocalUse?: boolean;
}

export enum UserRole {
  ADM = "ADM",
  CLIENT = "CLIENT"
}

export interface User {
  _id?: string;
  email: string;
  phone?: string;
  name: string;
  document: string;
  role: UserRole;
  isActive: boolean;
  coin: number;
  auth: {
    email: string;
    password: string;
  };
  subscribe?: {
    plan: Plan | string; // Pode ser o objeto Plan ou o ID como string
    consumedCoins: number;
    consumedSites: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Plan {
  _id?: string;
  code: string;
  name: string;
  coin: number;
  numSites: number;
  visitLimit: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para resposta de API
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Interface para paginação
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Interface para filtros de usuário
export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}

// Interface para filtros de plano
export interface PlanFilters {
  minCoins?: number;
  maxCoins?: number;
  minSites?: number;
  maxSites?: number;
}
