import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FaUserAstronaut, FaSignOutAlt, FaCrown } from "react-icons/fa";

// Componente Mini Spinner
const MiniSpinner = () => (
  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
);

export function InfoUser() {
  const { user, isFetchingUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fechar popover quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Se não houver usuário autenticado, não renderiza nada
  if (!user) {
    return null;
  }

  return (
    <div className="relative " ref={popoverRef}>
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center neon-btn cursor-pointer transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isFetchingUser}
        >
          <i className="fas fa-user-astronaut mr-2"></i>
          <span className="hidden md:inline">Usuário</span>
        </button>

        <div className="flex items-center justify-between p-2 gap-5 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">Créditos</span>
          </div>
          <span className="text-white font-medium text-sm">
            {isFetchingUser ? <MiniSpinner /> : user.coin}
          </span>
        </div>
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUserAstronaut className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {user.name}
                </h3>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-3 space-y-3">
            {/* Plano */}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <FaCrown className="text-yellow-500 text-sm" />
                <span className="text-gray-300 text-sm">Plano</span>
              </div>
              <span className="text-white font-medium text-sm capitalize">
                {user?.subscribe?.plan.name}
              </span>
            </div>

            {/* Moedas */}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Créditos</span>
              </div>
              <span className="text-white font-medium text-sm">
                {isFetchingUser ? <MiniSpinner /> : user.coin}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-gray-300 text-sm">Status</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  user.isActive ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.isActive ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>

          {/* Footer com botão de logout */}
          <div className="px-4 py-3 border-t border-gray-700 bg-gray-800 rounded-b-lg">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center cursor-pointer space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <FaSignOutAlt className="text-sm" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
