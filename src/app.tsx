import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ZeyraGlobalLanding from "./pages/global";
import GeneratorPage from "./pages/generator";
import LoginPage from "./pages/login";
import PolicyPrivacy from "./pages/policy-privacy";
import TermsOfUse from "./pages/terms-of-use";
import Neurosite from "./pages/neurosite";
import PromptGuide from "./pages/prompt-guide";
import Documentation from "./pages/documentation";
import NeurositeHome from "./pages/neurosite-home";

// Rotas que devem ter fundo branco (sem fundo holográfico)
const WHITE_BG_ROUTES = ["/", "/neurosite"];

// Componente para gerenciar o fundo baseado na rota
const BackgroundManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    const isWhiteBgRoute = WHITE_BG_ROUTES.includes(location.pathname);
    const particlesJs = document.getElementById("particles-js");
    const matrixCode = document.getElementById("matrix-code");
    const body = document.body;

    if (isWhiteBgRoute) {
      // Esconder fundo holográfico
      if (particlesJs) particlesJs.style.display = "none";
      if (matrixCode) matrixCode.style.display = "none";
      body.classList.remove("holographic-bg");
      body.style.backgroundColor = "white";
    } else {
      // Mostrar fundo holográfico
      if (particlesJs) particlesJs.style.display = "";
      if (matrixCode) matrixCode.style.display = "";
      body.classList.add("holographic-bg");
      body.style.backgroundColor = "";
    }
  }, [location.pathname]);

  return <>{children}</>;
};

// Componente para renderizar as rotas
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NeurositeHome />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/policy-privacy" element={<PolicyPrivacy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/prompt-guide" element={<PromptGuide />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/global" element={<ZeyraGlobalLanding />} />
      <Route path="/neurosite" element={<Neurosite />} />
      <Route
        path="/generator"
        element={
          <ProtectedRoute>
            <GeneratorPage />
          </ProtectedRoute>
        }
      />

      {/* Rota para capturar URLs não encontradas */}
      <Route path="*" element={<NeurositeHome />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BackgroundManager>
        <AppRoutes />
      </BackgroundManager>
    </AuthProvider>
  );
}
