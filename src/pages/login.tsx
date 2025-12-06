import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import {
  FaRobot,
  FaTerminal,
  FaUserAstronaut,
  FaKey,
  FaUserCircle,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaSpinner,
} from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [isRecoverySubmitting, setIsRecoverySubmitting] = useState(false);
  const matrixCodeRef = useRef<HTMLDivElement>(null);

  // Matrix code effect
  useEffect(() => {
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const createMatrixChar = () => {
      if (matrixCodeRef.current) {
        const char = document.createElement("div");
        char.className = "matrix-char";
        char.textContent = chars.charAt(
          Math.floor(Math.random() * chars.length)
        );
        char.style.left = Math.random() * 100 + "%";
        char.style.animationDuration = Math.random() * 5 + 3 + "s";
        char.style.animationDelay = Math.random() * 2 + "s";
        matrixCodeRef.current.appendChild(char);

        // Remove character after animation completes
        setTimeout(() => {
          if (char.parentNode) {
            char.remove();
          }
        }, parseFloat(char.style.animationDuration) * 1000);
      }
    };

    // Create matrix characters periodically
    const matrixInterval = setInterval(createMatrixChar, 100);

    return () => {
      clearInterval(matrixInterval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success(result.message);
        // Redirecionar para a página original ou /generator como padrão
        const from = (location.state as any)?.from?.pathname || "/generator";
        navigate(from);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRecovery = () => {
    setRecoveryStep(1);
    setShowRecoveryModal(true);
    setRecoveryEmail(formData.email || "");
    setRecoveryCode("");
    setRecoveryPassword("");
  };

  const closeRecovery = () => {
    setShowRecoveryModal(false);
  };

  const sendRecoveryCode = async () => {
    if (!recoveryEmail) {
      toast.error("Por favor, informe o email");
      return;
    }
    setIsRecoverySubmitting(true);
    try {
      const res = await fetch("/api/auth/send-code-reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Falha ao enviar código");
      }
      toast.success(data.data?.message || "Código enviado");
      setRecoveryStep(2);
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar código");
    } finally {
      setIsRecoverySubmitting(false);
    }
  };

  const resetPasswordSubmit = async () => {
    if (!recoveryEmail || !recoveryCode || !recoveryPassword) {
      toast.error("Preencha todos os campos");
      return;
    }
    setIsRecoverySubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: recoveryEmail,
          code: recoveryCode,
          password: recoveryPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Falha ao redefinir senha");
      }
      toast.success(data.data?.message || "Senha redefinida com sucesso");
      setShowRecoveryModal(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao redefinir senha");
    } finally {
      setIsRecoverySubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
          
          :root {
            --primary: #00f0ff;
            --secondary: #9600ff;
            --accent: #ff00e6;
            --dark: #0a0a1a;
            --light: #f0f0ff;
          }

          .font-futuristic {
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 1px;
          }

          .cyber-glass {
            background: rgba(15, 15, 35, 0.6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          }

          .cyber-border {
            position: relative;
            border-radius: 16px;
          }

          .cyber-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 2px;
            background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .gradient-text {
            background: linear-gradient(90deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .glow-effect {
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
          }

          .scanline {
            position: relative;
            overflow: hidden;
          }

          .scanline::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(to bottom,
                transparent,
                rgba(0, 240, 255, 0.5),
                transparent);
            animation: scan 8s linear infinite;
            z-index: 10;
          }

          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }

          .cyber-input {
            background: rgba(10, 10, 30, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s;
            font-family: 'Rajdhani', sans-serif;
          }

          .cyber-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.3);
            outline: none;
          }

          .neon-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s;
            z-index: 1;
            border: none;
          }

          .neon-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), transparent);
            transition: all 0.5s;
            z-index: -1;
          }

          .neon-btn:hover::before {
            left: 100%;
          }

          .matrix-code {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: -1;
            overflow: hidden;
          }

          .matrix-code::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background:
                linear-gradient(transparent 80%, rgba(0, 240, 255, 0.1)),
                linear-gradient(90deg, rgba(0, 240, 255, 0.1), transparent 50%, rgba(0, 240, 255, 0.1));
            z-index: 1;
          }

          .matrix-char {
            position: absolute;
            color: rgba(0, 240, 255, 0.7);
            font-family: monospace;
            font-size: 16px;
            animation: matrix-fall linear infinite;
            text-shadow: 0 0 5px rgba(0, 240, 255, 0.7);
          }

          @keyframes matrix-fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }

          .terminal-cursor {
            display: inline-block;
            width: 10px;
            height: 20px;
            background-color: var(--accent);
            animation: blink 1s infinite;
            vertical-align: middle;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          .pulse-animation {
            animation: pulse 2s infinite ease-in-out;
          }

          @keyframes pulse {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.8; transform: scale(1); }
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Matrix Code Background Effect */}
        <div className="matrix-code" ref={matrixCodeRef}></div>

        {/* Main Login Container */}
        <div className="w-full max-w-md relative">
          {/* Floating Logo */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect mb-2">
              <FaRobot className="text-2xl text-white" />
            </div>
          </div>

          {/* Login Card */}
          <div className="cyber-glass cyber-border rounded-2xl overflow-hidden scanline">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-6 px-8 text-center border-b border-gray-800">
              <h2 className="text-2xl font-bold font-futuristic flex items-center justify-center">
                <FaTerminal className="mr-3 text-primary" />
                <span className="gradient-text">ACESSO RESTRITO</span>
              </h2>
              <p className="text-gray-300 mt-2 font-medium">
                Autenticação necessária para continuar
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={onSubmit} className="px-8 py-8">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-medium mb-2 flex items-center"
                >
                  <FaUserAstronaut className="mr-2 text-primary" /> ID de
                  Usuário
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="cyber-input w-full px-4 py-3 pl-10 rounded-lg focus:ring-2 focus:ring-primary outline-none transition placeholder-gray-400"
                    placeholder="seu@id.neovia"
                    required
                  />
                  <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-300 font-medium mb-2 flex items-center"
                >
                  <FaKey className="mr-2 text-primary" /> Senha de Acesso
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="cyber-input w-full px-4 py-3 pl-10 rounded-lg focus:ring-2 focus:ring-primary outline-none transition placeholder-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end mb-6">
                <button
                  id="remember"
                  type="button"
                  onClick={openRecovery}
                  className="text-sm text-primary hover:text-accent"
                >
                  Recuperar acesso?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 neon-btn glow-effect flex items-center justify-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    <span>AUTENTICANDO...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" />
                    <span>AUTENTICAR</span>
                  </>
                )}
              </button>

              {/* Register Link
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Não tem uma conta?{" "}
                  <Link
                    to="/"
                    className="text-primary hover:text-accent font-medium transition-colors"
                  >
                    Crie sua conta
                  </Link>
                </p>
              </div> */}
            </form>

            {/* Footer */}
            <div className="px-8 pb-6 text-center text-sm text-gray-500">
              <p>© 2025 Zeyra. Todos os direitos reservados.</p>
            </div>
          </div>

          {/* Console Status */}
          <div className="cyber-glass mt-4 p-3 rounded-lg text-xs font-mono flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 pulse-animation"></div>
            <span className="text-green-400">SISTEMA ONLINE</span>
            <span className="terminal-cursor ml-1"></span>
          </div>
        </div>
      </div>
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeRecovery}
          ></div>
          <div className="relative z-10 w-full max-w-md cyber-glass cyber-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold gradient-text">
                Recuperar acesso
              </h3>
              <button
                type="button"
                onClick={closeRecovery}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {recoveryStep === 1 ? (
              <>
                <label className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="cyber-input w-full px-4 py-3 rounded-lg mb-4"
                  placeholder="seu@email.com"
                />
                <button
                  type="button"
                  onClick={sendRecoveryCode}
                  disabled={isRecoverySubmitting}
                  className={`w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-4 rounded-lg neon-btn glow-effect ${
                    isRecoverySubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isRecoverySubmitting ? "Enviando..." : "Enviar código"}
                </button>
              </>
            ) : (
              <>
                <label className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={recoveryEmail}
                  disabled
                  className="cyber-input w-full px-4 py-3 rounded-lg mb-4 opacity-70"
                />
                <label className="block text-gray-300 font-medium mb-2">
                  Código recebido
                </label>
                <input
                  type="text"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  className="cyber-input w-full px-4 py-3 rounded-lg mb-4"
                  placeholder="Código"
                />
                <label className="block text-gray-300 font-medium mb-2">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={recoveryPassword}
                  onChange={(e) => setRecoveryPassword(e.target.value)}
                  className="cyber-input w-full px-4 py-3 rounded-lg mb-4"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={resetPasswordSubmit}
                  disabled={isRecoverySubmitting}
                  className={`w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-4 rounded-lg neon-btn glow-effect ${
                    isRecoverySubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isRecoverySubmitting ? "Redefinindo..." : "Redefinir senha"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
