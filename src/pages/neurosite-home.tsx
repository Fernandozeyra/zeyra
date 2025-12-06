import { Button } from "../components/button";
import { useEffect } from "react";
import {
  ArrowRight,
  Brain,
  Globe,
  Zap,
  TrendingUp,
  CheckCircle,
  Sparkles,
  BarChart3,
} from "lucide-react";

import zeyraLogo from "../assets/alternative-logo.png";

function NeurositeHome() {
  useEffect(() => {
    // Remover restrições de altura do body e root para permitir rolagem
    const root = document.getElementById("root");
    const body = document.body;
    const html = document.documentElement;

    // Esconder fundo holográfico para esta página
    const particlesJs = document.getElementById("particles-js");
    const matrixCode = document.getElementById("matrix-code");

    if (particlesJs) particlesJs.style.display = "none";
    if (matrixCode) matrixCode.style.display = "none";

    body.classList.remove("holographic-bg");
    body.style.backgroundColor = "white";

    if (root) {
      root.style.height = "auto";
      root.style.maxHeight = "none";
      root.style.overflow = "visible";
    }

    body.style.height = "auto";
    body.style.maxHeight = "none";
    body.style.overflowY = "auto";

    html.style.height = "auto";
    html.style.maxHeight = "none";
    html.style.overflowY = "auto";

    // Dimpple Analytics
    (function (g: any, u: any, r: any, i: any, d: any) {
      g.DimppleAnalyticsObject = d;
      if (!(d in g)) {
        g[d] = function () {
          g[d].q.push(arguments);
        };
        g[d].q = [];
      }
      g[d].l = new Date().getTime();
      var script = u.createElement(r);
      script.src = i;
      script.async = true;
      var firstScript = u.getElementsByTagName(r)[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    })(
      window,
      document,
      "script",
      "//api.dimpple.com/public/js/analytics.js?trk=13183.xTMMODM.4b976618",
      "trk"
    );

    // Cleanup: restaurar estilos originais ao desmontar
    return () => {
      // Restaurar fundo holográfico
      if (particlesJs) particlesJs.style.display = "";
      if (matrixCode) matrixCode.style.display = "";
      body.classList.add("holographic-bg");
      body.style.backgroundColor = "";

      if (root) {
        root.style.height = "100%";
        root.style.maxHeight = "100%";
        root.style.overflow = "";
      }
      body.style.height = "100vh";
      body.style.maxHeight = "100%";
      body.style.overflowY = "";
      html.style.height = "100%";
      html.style.maxHeight = "100%";
      html.style.overflowY = "";
    };
  }, []);
  return (
    <div
      className="min-h-screen bg-white"
      style={{ height: "auto", maxHeight: "none", overflow: "visible" }}
    >
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={zeyraLogo} alt="Zeyra" className="h-10 w-10" />
              <span className="text-2xl font-bold gradient-text">Zeyra</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#neurosite"
                className="text-gray-700 hover:text-primary transition"
              >
                Neurosite™
              </a>
              <a
                href="#funcionalidades"
                className="text-gray-700 hover:text-primary transition"
              >
                Funcionalidades
              </a>
              <a
                href="#como-funciona"
                className="text-gray-700 hover:text-primary transition"
              >
                Como Funciona
              </a>
              <Button
                id="btn-header-login"
                variant="ghost"
                className="text-gray-700"
                onClick={() =>
                  (window.location.href = "https://zeyra.io/login")
                }
              >
                Acessar Minha Conta
              </Button>
              <Button
                id="btn-header-planos"
                className="gradient-bg text-white"
                onClick={() =>
                  (window.location.href = "https://zeyra.io/neurosite")
                }
              >
                Ver Planos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="h-4 w-4" />
                Tecnologia Neurosite™
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-black">
                Crie Sites e Páginas que{" "}
                <span className="gradient-text">Convertem Muito Mais</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                A Zeyra usa IA e neurociência para criar páginas de vendas
                otimizadas. Páginas comuns convertem <strong>1-3%</strong>, com
                Neurosite™ você atinge <strong>4-25% de conversão</strong>.
                Venda no Brasil e em mais de 50 países com uma única plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  id="btn-hero-ver-planos"
                  size="lg"
                  className="gradient-bg text-white text-lg px-8"
                  onClick={() =>
                    (window.location.href = "https://zeyra.io/neurosite")
                  }
                >
                  Ver Planos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  id="btn-hero-conhecer-zeyra"
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() =>
                    (window.location.href = "https://zeyra.io/neurosite")
                  }
                >
                  Conhecer a Zeyra
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 md:gap-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    4-25%
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Taxa de Conversão
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    50+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Países Suportados
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    10k+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Sites Criados
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl shadow-2xl p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Brain className="h-32 w-32 mx-auto mb-6 text-primary" />
                  <h3 className="text-3xl font-bold gradient-text mb-4">
                    Neurosite™
                  </h3>
                  <p className="text-lg text-gray-700">
                    IA + Neurociência = Páginas que Convertem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neurosite Section */}
      <section id="neurosite" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Brain className="h-4 w-4" />
              Tecnologia Exclusiva
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              O que é o <span className="gradient-text">Neurosite™</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa tecnologia proprietária combina Inteligência Artificial com
              princípios de neurociência e neuromarketing para criar páginas que
              maximizam conversões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl shadow-xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Brain className="h-32 w-32 mx-auto mb-6 text-primary" />
                <h3 className="text-3xl font-bold gradient-text mb-4">
                  Neurociência + IA
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-8 text-left">
                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-800">
                      CRIATIVIDADE
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-800">
                      TREINAMENTO
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-800">
                      APRENDIZAGEM
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-800">
                      HABILIDADE
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    IA + Neurociência
                  </h3>
                  <p className="text-gray-600">
                    Otimização automática de layout, copy e CTAs baseada em
                    gatilhos mentais e hierarquia visual comprovada.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    De 1-3% para 4-25% de Conversão
                  </h3>
                  <p className="text-gray-600">
                    Páginas comuns convertem apenas 1-2%. Com Neurosite™, você
                    atinge 4-25% em média, podendo chegar a 25% em casos
                    otimizados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    Criação em Minutos
                  </h3>
                  <p className="text-gray-600">
                    Descreva seu produto em linguagem natural e a IA cria uma
                    página completa otimizada para vendas em minutos.
                  </p>
                </div>
              </div>

              <div className="p-6 gradient-bg-subtle rounded-xl border-l-4 border-primary">
                <p className="text-gray-800 font-semibold">
                  "A IA não apenas cria código. Ela pensa na intenção de venda,
                  aplicando gatilhos mentais e princípios de persuasão
                  automaticamente."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Tudo que Você Precisa para{" "}
              <span className="gradient-text">Vender Online</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Zeyra oferece todas as ferramentas necessárias para criar,
              otimizar e escalar suas vendas online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center text-white mb-6">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Criação com IA
              </h3>
              <p className="text-gray-600 mb-4">
                Descreva seu produto e a IA cria uma página completa com copy
                persuasivo, design otimizado e CTAs estratégicos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Vibe-Coding (linguagem natural)
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Modelo Razonador (IA que pensa)
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Edição iterativa em tempo real
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-white mb-6">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Vendas Internacionais
              </h3>
              <p className="text-gray-600 mb-4">
                Expanda suas vendas para mais de 50 países com multilinguismo
                cultural e adaptação automática de conteúdo.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Tradução e adaptação cultural
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Suporte a 50+ idiomas
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  CDN global para velocidade
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-white mb-6">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Otimização Contínua
              </h3>
              <p className="text-gray-600 mb-4">
                Testes A/B automáticos e análise de performance para garantir
                que sua página sempre converta mais.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Testes A/B com IA
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Analytics em tempo real
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Sugestões de melhoria automáticas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Como Funciona a <span className="gradient-text">Zeyra</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Criar um site que vende nunca foi tão simples. Siga 3 passos e
              tenha sua página no ar em minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">
                Descreva Seu Produto
              </h3>
              <p className="text-gray-600">
                Conte para a IA sobre seu produto, público-alvo e objetivos. Use
                linguagem natural, sem precisar de conhecimento técnico.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">
                IA Cria Sua Página
              </h3>
              <p className="text-gray-600">
                O Neurosite™ analisa seu nicho, pesquisa concorrentes e cria uma
                página otimizada com copy persuasivo e design de alta conversão.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">
                Publique e Venda
              </h3>
              <p className="text-gray-600">
                Revise, ajuste se necessário e publique. Sua página fica no ar
                instantaneamente, pronta para converter visitantes em clientes.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              id="btn-como-funciona-planos"
              size="lg"
              className="gradient-bg text-white text-lg px-8"
              onClick={() =>
                (window.location.href = "https://zeyra.io/neurosite")
              }
            >
              Ver Planos e Começar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Globe className="h-4 w-4" />
                Alcance Global
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Venda em <span className="gradient-text">50+ Países</span> sem
                Complicação
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                A Zeyra não apenas traduz seu site. Ela adapta culturalmente o
                conteúdo, imagens e exemplos para cada mercado, garantindo
                máxima relevância e conversão.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-black">
                      Multilinguismo Cultural
                    </h4>
                    <p className="text-gray-600">
                      Não é apenas tradução. É adaptação completa para cada
                      cultura e mercado.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-black">
                      Integração com Gateways Globais
                    </h4>
                    <p className="text-gray-600">
                      Conecte com Stripe, PayPal e outros para aceitar
                      pagamentos em múltiplas moedas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1 text-black">CDN Global</h4>
                    <p className="text-gray-600">
                      Hospedagem turbo com carregamento rápido em qualquer lugar
                      do mundo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl shadow-xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Globe className="h-32 w-32 mx-auto mb-6 text-secondary" />
                <h3 className="text-3xl font-bold gradient-text mb-4">
                  50+ Países
                </h3>
                <p className="text-lg text-gray-700 max-w-md mx-auto">
                  Expanda seu negócio globalmente com multilinguismo cultural e
                  hospedagem turbo em CDN global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Vender Mais?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já estão vendendo mais com
            a Zeyra. Conheça nossos planos e comece hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              id="btn-cta-ver-planos"
              size="lg"
              className="text-lg px-8 bg-white text-gray-900 hover:bg-gray-100"
              onClick={() =>
                (window.location.href = "https://zeyra.io/neurosite")
              }
            >
              Ver Planos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              id="btn-cta-login"
              size="lg"
              className="text-lg px-8 bg-white/10 text-white border-2 border-white hover:bg-white hover:text-gray-900 transition"
              onClick={() => (window.location.href = "https://zeyra.io/login")}
            >
              Acessar Minha Conta
            </Button>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            Planos flexíveis • Suporte especializado • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={zeyraLogo} alt="Zeyra" className="h-8 w-8" />
                <span className="text-2xl font-bold gradient-text">Zeyra</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A plataforma de vendas online com tecnologia Neurosite™ que
                maximiza suas conversões.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a
                  href="mailto:contato@zeyra.io"
                  className="hover:text-white transition"
                >
                  contato@zeyra.io
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#neurosite" className="hover:text-white transition">
                    Neurosite™
                  </a>
                </li>
                <li>
                  <a
                    href="#funcionalidades"
                    className="hover:text-white transition"
                  >
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io/neurosite"
                    className="hover:text-white transition"
                  >
                    Planos
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io"
                    className="hover:text-white transition"
                  >
                    Casos de Sucesso
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://zeyra.io/documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Documentação
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io/prompt-guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Guia de Prompt para IA
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io"
                    className="hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io"
                    className="hover:text-white transition"
                  >
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://zeyra.io"
                    className="hover:text-white transition"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io"
                    className="hover:text-white transition"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io/terms-of-use"
                    className="hover:text-white transition"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="https://zeyra.io/policy-privacy"
                    className="hover:text-white transition"
                  >
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Zeyra. Todos os direitos reservados.</p>
            <p className="mt-2">
              <a
                href="mailto:contato@zeyra.io"
                className="hover:text-white transition"
              >
                contato@zeyra.io
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=63992289287"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Falar no WhatsApp"
      >
        <div className="absolute right-20 bottom-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Estamos Online no WhatsApp!
        </div>
        <div className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center w-16 h-16">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="currentColor"
          >
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.958 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62c0 7.51-6.11 13.62-13.62 13.62zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.117-0.547-0.174-0.776 0.174s-0.892 1.123-1.094 1.347c-0.201 0.231-0.403 0.26-0.749 0.086s-1.461-0.537-2.785-1.711c-1.030-0.915-1.725-2.045-1.927-2.391s-0.022-0.537 0.152-0.711c0.156-0.156 0.346-0.403 0.518-0.605s0.231-0.346 0.346-0.576c0.117-0.231 0.058-0.432-0.028-0.605s-0.776-1.869-1.063-2.556c-0.28-0.672-0.56-0.58-0.776-0.591-0.201-0.010-0.432-0.012-0.662-0.012s-0.605 0.086-0.921 0.432c-0.316 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.564c0.174 0.231 2.421 3.696 5.864 5.186 0.818 0.354 1.458 0.566 1.956 0.724 0.822 0.262 1.569 0.225 2.16 0.136 0.659-0.098 2.049-0.835 2.335-1.642s0.288-1.501 0.201-1.642c-0.086-0.14-0.316-0.231-0.662-0.403z" />
          </svg>
        </div>
      </a>
    </div>
  );
}

export default NeurositeHome;
