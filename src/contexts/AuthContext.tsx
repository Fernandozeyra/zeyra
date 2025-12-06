import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Plan {
  _id: string;
  code: string;
  coin: number;
  createdAt: string;
  description: string;
  name: string;
  numSites: number;
  updatedAt: string;
  visitLimit: number;
}

interface Subscribe {
  _id: string;
  consumedCoins: number;
  consumedSites: number;
  endDate: string;
  isActive: boolean;
  plan: Plan;
  startDate: string;
  updatedAt: string;
}

interface User {
  _id: string;
  auth: {
    email: string;
  };
  coin: number;
  createdAt: string;
  document: string;
  email: string;
  isActive: boolean;
  name: string;
  phone: string;
  role: string;
  subscribe: Subscribe;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetchingUser: boolean;
  updateCredit: boolean;
  setUpdateCredit: (value: boolean) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [updateCredit, setUpdateCredit] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    try {
      setIsFetchingUser(true);
      const currentToken = token || localStorage.getItem("authToken");

      if (!currentToken) {
        console.error("Token não encontrado para buscar dados do usuário");
        return;
      }

      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          console.log("Dados do usuário atualizados:", data.data);
        } else {
          console.error("Erro ao buscar dados do usuário:", data.message);
        }
      } else {
        console.error(
          "Erro na requisição para /api/users/me:",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setIsFetchingUser(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { user: userData, token: authToken } = data.data;

        setUser(userData);
        setToken(authToken);
        localStorage.setItem("authToken", authToken);

        // Busca dados atualizados do usuário após o login
        await fetchUserData();

        return { success: true, message: "Login realizado com sucesso!" };
      } else {
        return { success: false, message: data.message || "Erro no login" };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Erro de conexão. Tente novamente." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUpdateCredit(false);
    localStorage.removeItem("authToken");
  };

  const checkAuth = async () => {
    try {
      // Verifica se existe um token no localStorage
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      // Testa o token usando a rota de verificação
      const response = await fetch("/api/auth/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: storedToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Token válido, mantém o usuário logado
          // setUser(data.data);
          setToken(storedToken);

          // Busca dados atualizados do usuário
          await fetchUserData();
        } else {
          // Token inválido, remove do localStorage
          localStorage.removeItem("authToken");
        }
      } else {
        // Erro na verificação, remove o token
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      // Em caso de erro, remove o token para segurança
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  // Effect para monitorar mudanças no updateCredit
  useEffect(() => {
    if (updateCredit && isAuthenticated) {
      fetchUserData();
      setUpdateCredit(false); // Reseta o estado após a execução
    }
  }, [updateCredit, isAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    isFetchingUser,
    updateCredit,
    setUpdateCredit,
    login,
    logout,
    checkAuth,
    fetchUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
