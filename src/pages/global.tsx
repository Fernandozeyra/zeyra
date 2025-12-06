import React, { useEffect } from "react";

import logo from "../assets/zeyra-logo-no-bg.png";
import logoSamsung from "../assets/logo-samsung.png";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const ZeyraGlobalLanding: React.FC = () => {
  useEffect(() => {
    // --- Inject external assets into <head> ---
    const head = document.head;

    const ensureScript = (src: string) => {
      const exists = Array.from(
        head.querySelectorAll<HTMLScriptElement>("script[src]")
      ).some((s) => s.src === src);
      if (!exists) {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        head.appendChild(s);
        return s;
      }
      return null;
    };

    // Back Redirect Script - Apenas na Home
    const setBackRedirect = () => {
      // ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
      const link = "https://zeyra.io/";

      function configureBackRedirect(url: string) {
        let urlBackRedirect = url;
        urlBackRedirect = urlBackRedirect =
          urlBackRedirect.trim() +
          (urlBackRedirect.indexOf("?") > 0 ? "&" : "?") +
          document.location.search.replace("?", "").toString();

        history.pushState({}, "", location.href);
        history.pushState({}, "", location.href);
        history.pushState({}, "", location.href);

        const popstateHandler = () => {
          console.log("onpopstate", urlBackRedirect);
          setTimeout(() => {
            location.href = urlBackRedirect;
          }, 1);
        };

        window.addEventListener("popstate", popstateHandler);

        // Retorna função de cleanup
        return () => {
          window.removeEventListener("popstate", popstateHandler);
        };
      }

      return configureBackRedirect(link);
    };

    // Inicializar back redirect
    const cleanupBackRedirect = setBackRedirect();

    const particlesScript = ensureScript(
      "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
    );

    const initParticles = () => {
      const w = window as any;
      if (w.particlesJS) {
        w.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00f0ff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00f0ff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      }
    };

    const onParticlesLoaded = () => initParticles();
    if (particlesScript) {
      particlesScript.addEventListener("load", onParticlesLoaded);
    } else {
      initParticles();
    }

    // Smooth scrolling for internal anchors
    const anchorHandler = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      e.preventDefault();
      const hash = target.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const anchorLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );
    anchorLinks.forEach((a) => a.addEventListener("click", anchorHandler));

    // Back to top button behavior
    const backToTopButton = document.getElementById("backToTop");
    const onScroll = () => {
      if (!backToTopButton) return;
      if (window.pageYOffset > 300) backToTopButton.classList.add("visible");
      else backToTopButton.classList.remove("visible");
    };
    const onBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", onScroll);
    backToTopButton?.addEventListener("click", onBackToTop);

    // Terminal cursor blink
    const cursor = document.querySelector<HTMLElement>(".terminal-cursor");
    const cursorInterval = window.setInterval(() => {
      if (cursor)
        cursor.style.visibility =
          cursor.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500);

    // Loading animation for buttons
    const clickableButtons = Array.from(
      document.querySelectorAll<HTMLElement>(".action-btn, .modern-btn")
    );
    const buttonHandlers = clickableButtons.map((btn) => {
      const handler = () => {
        const original = btn.innerHTML;
        btn.innerHTML = `<span class="loading-animation"></span> Procesando...`;
        window.setTimeout(() => (btn.innerHTML = original), 2000);
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    // Cleanup
    return () => {
      // Limpar back redirect
      if (cleanupBackRedirect) {
        cleanupBackRedirect();
      }

      anchorLinks.forEach((a) => a.removeEventListener("click", anchorHandler));
      window.removeEventListener("scroll", onScroll);
      backToTopButton?.removeEventListener("click", onBackToTop);
      window.clearInterval(cursorInterval);
      buttonHandlers.forEach(({ btn, handler }) =>
        btn.removeEventListener("click", handler)
      );
      if (particlesScript)
        particlesScript.removeEventListener("load", onParticlesLoaded);
    };
  }, []);

  return (
    <div className=" overflow-x-hidden">
      {/* Global styles com sistema de fontes profissional */}
      <style>{`
        /* Importação das fontes Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        /* Sistema de variáveis CSS para fontes */
        :root {
          /* Cores */
          --primary: #00f0ff;
          --secondary: #9600ff;
          --accent: #ff00e6;
          --dark: #0a0a1a;
          --light: #f0f0ff;
          --action: #00ff88;
          --action-hover: #00cc66;
          
          /* Fontes */
          --font-primary: 'Rajdhani', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-display: 'Orbitron', 'Courier New', monospace;
          
          /* Pesos das fontes */
          --font-weight-light: 300;
          --font-weight-normal: 400;
          --font-weight-medium: 500;
          --font-weight-semibold: 600;
          --font-weight-bold: 700;
          --font-weight-black: 900;
          
          /* Tamanhos de fonte */
          --font-size-xs: 0.75rem;
          --font-size-sm: 0.875rem;
          --font-size-base: 1rem;
          --font-size-lg: 1.125rem;
          --font-size-xl: 1.25rem;
          --font-size-2xl: 1.5rem;
          --font-size-3xl: 1.875rem;
          --font-size-4xl: 2.25rem;
          --font-size-5xl: 3rem;
        }
        
        /* Classes de fonte base */
        .font-body {
          font-family: var(--font-primary);
          font-weight: var(--font-weight-normal);
          line-height: 1.6;
        }
        
        .font-display {
          font-family: var(--font-display);
          font-weight: var(--font-weight-bold);
          letter-spacing: 1px;
          line-height: 1.3;
        }
        
        .font-heading {
          font-family: var(--font-display);
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.5px;
        }
        
        .font-ui {
          font-family: var(--font-primary);
          font-weight: var(--font-weight-medium);
        }
        
        /* Classes utilitárias de tamanho */
        .text-xs { font-size: var(--font-size-xs); }
        .text-sm { font-size: var(--font-size-sm); }
        .text-base { font-size: var(--font-size-base); }
        .text-lg { font-size: var(--font-size-lg); }
        .text-xl { font-size: var(--font-size-xl); }
        .text-2xl { font-size: var(--font-size-2xl); }
        .text-3xl { font-size: var(--font-size-3xl); }
        .text-4xl { font-size: var(--font-size-4xl); }
        .text-5xl { font-size: var(--font-size-5xl); }
        
        /* Classes utilitárias de peso */
        .font-light { font-weight: var(--font-weight-light); }
        .font-normal { font-weight: var(--font-weight-normal); }
        .font-medium { font-weight: var(--font-weight-medium); }
        .font-semibold { font-weight: var(--font-weight-semibold); }
        .font-bold { font-weight: var(--font-weight-bold); }
        .font-black { font-weight: var(--font-weight-black); }
        
        /* Helpers para cores */
        .text-primary{color:var(--primary)!important;}
        .bg-primary{background-color:var(--primary)!important;}
        .text-accent{color:var(--accent)!important;}
        .bg-accent{background-color:var(--accent)!important;}
        
        /* Scrollbar styles */
        ::-webkit-scrollbar{width:10px;height:10px;}
        ::-webkit-scrollbar-track{background:rgba(15,15,35,0.5);border-radius:10px;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(var(--primary),var(--accent));border-radius:10px;border:2px solid rgba(15,15,35,0.5);}
        ::-webkit-scrollbar-thumb:hover{background:linear-gradient(var(--accent),var(--primary));}
        
        html{scrollbar-width:thin;scrollbar-color:var(--primary) rgba(15,15,35,0.5);height:100%;}
        body{font-family:var(--font-primary);background-color:var(--dark);color:var(--light);overflow-x:hidden;overflow-y:auto;scroll-behavior:smooth;line-height:1.6;height:100%;}
        #root{height:100%;overflow-y:auto;}
        
        /* Estilos base com sistema de fontes unificado */
        h1,h2,h3,h4,.font-futuristic{font-family:var(--font-display)!important;letter-spacing:1px;line-height:1.3;}
        .hero-title{font-family:var(--font-display)!important;}
        .gradient-text{font-family:var(--font-display)!important;}
        .text-white{font-family:var(--font-primary)!important;}
        
        /* Resto dos estilos mantidos */
        .holographic-bg{position:relative;background:radial-gradient(circle at center, rgba(10,10,30,0.9) 0%, rgba(5,5,15,0.95) 100%);overflow:hidden;}
        .cyber-glass{background:rgba(15,15,35,0.6);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);}
        .cyber-border{position:relative;border-radius:16px;}
        .cyber-border::before{content:'';position:absolute;inset:0;border-radius:16px;padding:2px;background:linear-gradient(135deg,var(--primary),var(--secondary),var(--accent));-webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
        .neon-text{text-shadow:0 0 5px var(--primary),0 0 10px var(--primary),0 0 20px var(--primary);}
        .gradient-text{background:linear-gradient(90deg,var(--primary),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent;}
        .glow-effect{box-shadow:0 0 15px rgba(0,240,255,0.5);}
        .pulse-animation{animation:pulse 2s infinite ease-in-out;}
        @keyframes pulse{0%{opacity:.8;transform:scale(1);}50%{opacity:1;transform:scale(1.05);}100%{opacity:.8;transform:scale(1);}}
        .neon-btn{position:relative;overflow:hidden;transition:all .3s;z-index:1;border:none;}
        .neon-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,240,255,.4),transparent);transition:all .5s;z-index:-1;}
        .neon-btn:hover::before{left:100%;}
        .action-btn{background-color:var(--action);color:#000;font-weight:bold;font-family:var(--font-primary);}
        .action-btn:hover{background-color:var(--action-hover);transform:translateY(-2px);box-shadow:0 5px 15px rgba(0,255,136,0.4);}
        .secondary-btn{background-color:transparent;border:2px solid var(--primary);color:var(--primary);font-family:var(--font-primary);}
        .secondary-btn:hover{background-color:rgba(0,240,255,0.1);}
        .holographic-card{position:relative;transform-style:preserve-3d;perspective:1000px;}
        .holographic-card:hover .card-inner{transform:rotateY(10deg) rotateX(5deg);}
        .card-inner{transition:transform .5s ease;transform-style:preserve-3d;}
        .floating{animation:floating 6s ease-in-out infinite;}
        @keyframes floating{0%{transform:translateY(0)}50%{transform:translateY(-15px)}100%{transform:translateY(0)}}
        .guarantee-badge{position:relative;border:2px solid var(--accent);border-radius:8px;padding:15px;background:rgba(15,15,35,0.8);overflow:hidden;}
        .guarantee-badge::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(to bottom right,transparent 45%,rgba(255,0,230,0.1) 50%,transparent 55%);animation:shine 3s infinite;}
        @keyframes shine{0%{transform:translate(0,0) rotate(0)}100%{transform:translate(100%,100%) rotate(360deg)}}
        .step-item{position:relative;padding-left:60px;margin-bottom:30px;}
        .step-number{position:absolute;left:0;top:0;width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-family:var(--font-display);}
        .benefit-item{display:flex;align-items:flex-start;margin-bottom:20px;}
        .benefit-icon{flex-shrink:0;width:40px;height:40px;border-radius:50%;background:rgba(0,240,255,0.1);display:flex;align-items:center;justify-content:center;margin-right:15px;color:var(--primary);font-size:18px;}
        .price-card{transition:all .3s ease;position:relative;overflow:hidden;}
        .price-card:hover{transform:scale(1.02);}
        .price-card.popular{border:2px solid var(--accent);position:relative;}
        .popular-badge{position:absolute;top:-10px;right:20px;background:var(--accent);color:#fff;padding:5px 15px;border-radius:20px;font-size:.8rem;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-family:var(--font-primary);}
        #particles-js{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;}
        .back-to-top{position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;cursor:pointer;opacity:0;visibility:hidden;transition:all .3s ease;z-index:1000;box-shadow:0 0 15px rgba(0,240,255,0.5);}
        .back-to-top.visible{opacity:1;visibility:visible;}
        .back-to-top:hover{transform:translateY(-5px);box-shadow:0 0 20px rgba(0,240,255,0.8);}
        .ai-image-container{position:relative;margin-top:20px;border-radius:12px;overflow:hidden;border:1px solid rgba(0,240,255,0.2);}
        .ai-image-container img{width:100%;height:auto;display:block;max-width:100%;}
        .ai-image-overlay{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.8));padding:15px;color:#fff;font-size:.9rem;font-family:var(--font-primary);}
        .ai-image-overlay i{color:var(--primary);margin-right:5px;}
        .logo-container{display:flex;align-items:center;}
        .logo-img{width:50px;height:50px;margin-right:12px;object-fit:contain;}
        .hero-title{font-size:2rem;line-height:1.2;}
        @media (min-width:768px){.hero-title{font-size:2.8rem;}}
        .feature-highlight{position:relative;display:inline-block;}
        .feature-highlight::after{content:'';position:absolute;bottom:5px;left:0;width:100%;height:15px;background:linear-gradient(90deg,rgba(0,240,255,0.3),rgba(150,0,255,0.3));z-index:-1;transform:skewX(-15deg);}
        .compact-header{padding-top:1rem;padding-bottom:1rem;}
        @media (min-width:768px){.compact-header{padding-top:1.5rem;padding-bottom:1.5rem;}}
        @media (max-width:767px){.hero-title{font-size:1.8rem;}
        .modern-btn{padding:.8rem 1.5rem;font-size:.9rem;}
        .price-card{margin-bottom:20px;}
        .step-item{padding-left:50px;}
        .step-number{width:35px;height:35px;font-size:.9rem;}
        .benefit-icon{width:35px;height:35px;font-size:16px;}
        }
        @media (max-width:480px){.hero-title{font-size:1.5rem;}
        .modern-btn{padding:.7rem 1.2rem;font-size:.8rem;}
        .guarantee-badge{padding:10px;}
        }
        .modern-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:1rem 2rem;font-weight:bold;text-transform:uppercase;letter-spacing:1px;border-radius:50px;overflow:hidden;transition:all .3s ease;z-index:1;border:none;box-shadow:0 5px 15px rgba(0,240,255,0.3);font-family:var(--font-primary);}
        .modern-btn::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(45deg,var(--primary),var(--accent));z-index:-1;transition:all .3s ease;}
        .modern-btn:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,240,255,0.5);}
        .modern-btn:hover::before{background:linear-gradient(45deg,var(--accent),var(--primary));}
        .modern-btn i{margin-right:10px;font-size:1.2em;}
}
        .loading-animation{display:inline-block;width:20px;height:20px;border:3px solid rgba(255,255,255,.3);border-radius:50%;border-top-color:var(--primary);animation:spin 1s ease-in-out infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .language-flags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;}
        .language-flag{width:30px;height:20px;border-radius:3px;object-fit:cover;cursor:pointer;transition:transform .2s;}
        .language-flag:hover{transform:scale(1.1);}
        .scrollable-content{overflow-y:auto;height:100vh;position:relative;}


      /* Trusted By Section */
      .trusted-by-section {
        padding: 60px 0;
        background: rgba(10, 10, 30, 0.7);
        position: relative;
        overflow: hidden;
      }

      .trusted-by-section::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent,
          var(--primary),
          transparent
        );
      }

      .trusted-by-section::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent,
          var(--primary),
          transparent
        );
      }

      .trusted-by-title {
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: var(--primary);
        margin-bottom: 30px;
        text-align: center;
        position: relative;
        display: inline-block;
        left: 50%;
        transform: translateX(-50%);
      }

      .trusted-by-title::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          var(--primary),
          transparent
        );
      }

      .trusted-logos {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        max-width: 100%;
        overflow: hidden;
      }

      .trusted-logo {
        height: 40px;
        opacity: 0.8;
        transition: all 0.3s ease;
        filter: brightness(0) invert(1);
        max-width: 100%;
        height: auto;
      }

      .trusted-logo:hover {
        opacity: 1;
        transform: scale(1.1);
        filter: brightness(1) invert(0);
      }

      @media (max-width: 768px) {
        .trusted-logos {
          gap: 20px;
        }

        .trusted-logo {
          height: 30px;
        }
      }


       /* Enhanced Language Flags Section */
      .language-section {
        background: rgba(15, 15, 35, 0.5);
        padding: 30px;
        border-radius: 12px;
        margin-top: 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .language-title {
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: var(--primary);
        display: flex;
        align-items: center;
      }

      .language-title i {
        margin-right: 10px;
      }

      .language-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 15px;
      }

      .language-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s ease;
      }

      .language-item:hover {
        transform: translateY(-5px);
      }

      .language-flag-lg {
        width: 50px;
        height: 30px;
        border-radius: 4px;
        object-fit: cover;
        margin-bottom: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .language-name {
        font-size: 0.7rem;
        color: var(--light);
        text-align: center;
      }


      `}</style>

      <div id="particles-js"></div>

      {/* Back to top button */}
      <div className="back-to-top" id="backToTop">
        <i className="fas fa-arrow-up"></i>
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-col relative z-10 scrollable-conten">
        {/* Hero Section */}
        <section className="py-6 lg:pt-12 px-4 lg:px-8 flex-grow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-center items-center">
              <div className="relative max-w-6xl text-center">
                <h1
                  className="hero-title font-bold font-futuristic mb-6"
                  style={{
                    fontFamily: "'Arial', 'Helvetica', sans-serif",
                  }}
                >
                  <span className="gradient-text">
                    Crea páginas de ventas y sitios web en minutos con
                  </span>
                  <br />
                  <span className="text-white">
                    con{" "}
                    <span className="feature-highlight">
                      Inteligencia Artificial
                    </span>
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
                  ZEYRA transforma tu idea en un sitio web profesional completo
                  en cualquier idioma, con alojamiento turbo y diseño moderno —
                  todo hecho automáticamente por nuestra inteligencia artificial
                  multilingüe.
                </p>

                {/* Feature Highlights */}
                <div className="flex flex-col gap-2 sm:flex-row items-center sm:justify-between max-w-md mx-auto">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-primary mr-2"></i>
                      <span className="text-gray-300">
                        Soporte para 50+ idiomas
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-primary mr-2"></i>
                      <span className="text-gray-300">
                        Alojamiento Web Turbo
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-primary mr-2"></i>
                      <span className="text-gray-300">Diseño Responsivo</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-primary mr-2"></i>
                      <span className="text-gray-300">
                        Contenido Automático
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-by-section mt-6 ">
          <div className="container mx-auto">
            <h3 className="trusted-by-title">
              Confiado por negocios innovadores en todo el mundo
            </h3>

            <div className="trusted-logos">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png"
                alt="Google"
                className="trusted-logo"
                style={{ height: "24px", width: "auto" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png"
                alt="Amazon"
                className="trusted-logo"
                style={{ height: "24px", width: "auto" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png"
                alt="Apple"
                className="trusted-logo"
                style={{ height: "24px", width: "auto" }}
              />

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png"
                alt="Windows"
                className="trusted-logo"
                style={{ height: "24px", width: "auto" }}
              />

              <img
                src={logoSamsung}
                alt="Samsung"
                className="trusted-logo"
                style={{ height: "24px", width: "auto" }}
              />
            </div>
          </div>
        </section>

        {/* Language Support Section */}
        <section className="py-6 px-4 lg:px-8  container mx-auto max-w-8xl">
          <div className="container mx-auto">
            <div className="language-section">
              <h3 className="language-title">
                <i className="fas fa-globe-americas"></i> Soporte para +50
                idiomas
              </h3>

              <div className="language-grid">
                {/* European Languages */}
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="Inglês"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Inglês</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/es.png"
                    alt="Espanhol"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Espanhol</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/fr.png"
                    alt="Francês"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Francês</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/de.png"
                    alt="Alemão"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Alemão</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/it.png"
                    alt="Italiano"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Italiano</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/pt.png"
                    alt="Português"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Português</span>
                </div>

                {/* Asian Languages */}
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/cn.png"
                    alt="Chinês"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Chinês</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/jp.png"
                    alt="Japonês"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Japonês</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/kr.png"
                    alt="Coreano"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Coreano</span>
                </div>

                {/* Middle Eastern Languages */}
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/ae.png"
                    alt="Árabe"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Árabe</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/il.png"
                    alt="Hebraico"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Hebraico</span>
                </div>

                {/* Other Major Languages */}
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/ru.png"
                    alt="Russo"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Russo</span>
                </div>
                <div className="language-item">
                  <img
                    src="https://flagcdn.com/w40/in.png"
                    alt="Hindi"
                    className="language-flag-lg"
                  />
                  <span className="language-name">Hindi</span>
                </div>

                {/* Plus more indicator */}
                <div className="language-item">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: "none",
                      border: "1px solid var(--primary)",
                    }}
                  >
                    +50
                  </div>
                  <span className="language-name">Y más</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-8 px-4 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50 container mx-auto max-w-7xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              <span className="gradient-text">¿Cómo Funciona</span>{" "}
              <span className="text-white">ZEYRA?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              En solo 4 simples pasos, tendrás un sitio web profesional en
              cualquier idioma listo para usar.
            </p>
          </div>

          <div className="flex gap-5 flex-wrap flex-col sm:flex-row items-center sm:justify-evenly  mx-auto">
            <div className="step-item w-full sm:max-w-[230px]">
              <div className="step-number">1</div>
              <h3 className="text-xl font-bold font-display mb-3 text-white">
                Elige el Idioma
              </h3>
              <p className="text-gray-300">
                Selecciona un idioma para tu sitio. Nuestra IA soporta más de 50
                lenguas diferentes.
              </p>
            </div>

            <div className="step-item w-full sm:max-w-[300px]">
              <div className="step-number">2</div>
              <h3 className="text-xl font-bold font-display mb-3 text-white">
                Describe Tu Negocio
              </h3>
              <p className="text-gray-300">
                Escribe en lenguaje simple lo que quieres vender o promocionar.
                La IA crea contenido y sugerencias de imágenes editables.
              </p>
            </div>

            <div className="step-item w-full sm:max-w-[300px]">
              <div className="step-number">3</div>
              <h3 className="text-xl font-bold font-display mb-3 text-white">
                IA Crea Automáticamente
              </h3>
              <p className="text-gray-300">
                En segundos, nuestra inteligencia artificial genera un sitio
                completo con diseño profesional en cualquier idioma deseado.
              </p>
            </div>

            <div className="step-item w-full sm:max-w-[280px]">
              <div className="step-number">4</div>
              <h3 className="text-xl font-bold font-display mb-3 text-white">
                Publica con 1 Clic
              </h3>
              <p className="text-gray-300">
                Añade tu Dominio y tu sitio estará alojado en nuestra
                infraestructura turbo. Solo publica y comienza a usar.
              </p>
            </div>
          </div>
        </section>

        {/* Multilingual Features Section */}
        <section className="py-8 px-4 lg:px-8 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-center">
              <span className="gradient-text">Sitios Multilingües</span>{" "}
              <span className="text-white">Hechos con IA</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold font-display mb-4 text-primary">
                  Traducción Automática Avanzada
                </h3>
                <ul className="text-gray-300">
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Contenido generado simultáneamente en los idiomas
                      seleccionados
                    </span>
                  </li>
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>Traducciones contextualizadas para cada mercado</span>
                  </li>
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Soporte para más de 50 idiomas incluyendo español, inglés,
                      francés, alemán, chino y japonés
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Interfaz moderna e intuitiva para editar y publicar tus
                      páginas
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display mb-4 text-primary">
                  Recursos Multilingües
                </h3>
                <ul className="text-gray-300">
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Con html listo en un idioma específico, la IA traduce para
                      cualquier idioma sin necesidad de crear un nuevo sitio o
                      página
                    </span>
                  </li>
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Contenido adaptado y traducido culturalmente para cada
                      país elegido
                    </span>
                  </li>
                  <li className="mb-3 flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      No impone límites culturales, políticos o de género — tú
                      eliges qué comunicar o vender
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <span>
                      Actualizaciones simultáneas en todas las versiones
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-6 px-4 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                <span className="gradient-text">Todo lo que Necesitas</span>{" "}
                <span className="text-white">en una Única Plataforma</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Recursos poderosos para crear, editar y gestionar tus sitios en
                cualquier idioma sin complicaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: "fa-language",
                  title: "Creación Instantánea",
                  desc: "Ten tu sitio o página de ventas profesional en línea en minutos con solo una descripción de tu negocio.",
                },
                {
                  icon: "fa-server",
                  title: "Alojamiento Turbo",
                  desc: "Tus sitios ya quedan alojados en nuestra infraestructura de alto rendimiento.",
                },
                {
                  icon: "fa-globe",
                  title: "Diseño Optimizado por IA",
                  desc: "Diseños modernos, responsivos y adaptados a tu nicho. La inteligencia artificial elige la estructura que más convierte.",
                },
                {
                  icon: "fa-mobile-alt",
                  title: "Diseño Responsivo",
                  desc: "Diseños profesionales que se adaptan perfectamente a cualquier dispositivo.",
                },
                {
                  icon: "fa-brain",
                  title: "Redacción con IA",
                  desc: "Tu sitio ya nace optimizado para Google, con estructura amigable para anuncios y estrategias de tráfico.",
                },
                {
                  icon: "fa-sync-alt",
                  title: "Actualización Simultánea",
                  desc: "Edita textos, imágenes, colores y bloques con pocos clics. Sin necesidad de saber programar.",
                },
                {
                  icon: "fa-user-shield",
                  title: "Independencia Total",
                  desc: "Crea y edita tus sitios cuando quieras, sin depender de traductores o programadores.",
                },
                {
                  icon: "fa-rocket",
                  title: "Lanzamiento Rápido",
                  desc: "Olvídate de plazos largos. Con Zeyra, tu sitio va de cero a online en tiempo récord.",
                },
              ].map((b, idx) => (
                <div className="benefit-item" key={idx}>
                  <div className="benefit-icon">
                    <i className={`fas ${b.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-2 text-white">
                      {b.title}
                    </h3>
                    <p className="text-gray-300">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-6 px-4 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-display mb-4">
                <span className="gradient-text">Elige Tu Plano</span>{" "}
                <span className="text-white">Ideal</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Planes accesibles para todos los tamaños de negocio. Comienza
                hoy mismo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic */}
              <div className="price-card cyber-glass cyber-border font-extralight p-8 rounded-2xl">
                <h3 className="text-xl font-display mb-2 font-bold text-white">
                  Iniciante
                </h3>
                <p className="text-gray-400 mb-6">
                  Para quienes están comenzando
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$9.99</span>{" "}
                  <span className="text-gray-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Hasta 2 idiomas</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>35 Páginas IA (35 Créditos)</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Hasta 10 mil visitas/mes</span>
                  </li>
                  <li className="flex items-center text-gray-500">
                    <i className="fas fa-times-circle mr-2"></i>
                    <span>Idiomas ilimitados</span>
                  </li>
                </ul>
                <a
                  href="https://pay.hotmart.com/B102202694H?off=56zggbz5&checkoutMode=6"
                  target="_blank"
                >
                  <button className="w-full py-3 action-btn text-black rounded-lg font-bold transition cursor-pointer flex items-center justify-center">
                    Comenzar Ahora
                  </button>
                </a>
              </div>

              {/* Popular */}
              <div className="price-card cyber-glass cyber-border p-8 rounded-2xl font-extralight popular">
                {/* <div className="popular-badge">Mais Popular</div> */}
                <h3 className="text-xl font-display mb-2 font-bold text-white">
                  Profesional
                </h3>
                <p className="text-gray-400 mb-6">
                  Ideal para negocios digitales
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$27</span>{" "}
                  <span className="text-gray-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Hasta 5 idiomas</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>75 Páginas IA (75 Créditos)</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Soporte WhatsApp</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Hasta 100 mil visitas/mes</span>
                  </li>
                </ul>
                <a
                  href="https://pay.hotmart.com/B102202694H?off=ts7999av&checkoutMode=6"
                  target="_blank"
                >
                  <button className="w-full py-3 action-btn text-black rounded-lg cursor-pointer font-bold hover:opacity-90 transition flex items-center justify-center gap-5 glow-effect">
                    <i className="fas fa-rocket"></i>
                    Quiero Este Plan
                  </button>
                </a>
              </div>

              {/* Enterprise */}
              <div className="price-card cyber-glass cyber-border font-extralight p-8 rounded-2xl">
                <h3 className="text-xl font-display mb-2 font-bold text-white">
                  Empresarial
                </h3>
                <p className="text-gray-400 mb-6">
                  Para agencias y grandes negocios
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$97</span>{" "}
                  <span className="text-gray-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Idiomas Ilimitados</span>
                  </li>

                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>350 Páginas IA (350 Créditos)</span>
                  </li>

                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Hasta 1 millón de visitas/mes</span>
                  </li>

                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <a
                  href="https://pay.hotmart.com/B102202694H?off=vhbonjdj&checkoutMode=6"
                  target="_blank"
                >
                  <button className="w-full py-3 action-btn text-black rounded-lg font-bold transition flex items-center justify-center">
                    Quiero Este Plan
                  </button>
                </a>
              </div>
            </div>
            <div className="text-center mt-12">
              <div className="inline-flex items-center bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3">
                <i className="fas fa-shield-alt text-accent mr-3"></i>
                <span className="text-gray-300">
                  Garantía de 7 días o tu dinero de vuelta
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 px-4 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto max-w-7xl text-center">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="gradient-text">
                  ¿Listo para Crear Tu Sitio
                </span>{" "}
                <span className="text-white">en Varios Idiomas?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                No pierdas tiempo con traductores y desarrolladores. Deja que
                nuestra IA cree tu sitio profesional en cualquier idioma hoy
                mismo.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#pricing" className="modern-btn">
                  <i className="fas fa-bolt"></i> Quiero Mi Sitio Ahora
                </a>
              </div>
              <div className="mt-6 text-sm text-gray-400 flex items-center justify-center">
                <i className="fas fa-lock mr-2"></i> Compra 100% segura • 7 días
                de garantía
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 lg:px-8 bg-gray-900/50 border-t border-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={logo}
                    alt="ZEYRA Logo"
                    className="logo-img"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold font-display">ZEYRA</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  La plataforma más avanzada para creación de sitios
                  multilingües con inteligencia artificial.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1FvC1dkm66/?mibextid=wwXIfr"
                    target="_blank"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/zeyra.ia/profilecard/?igsh=MXM1OHhwbzBjdmtxcQ=="
                    target="_blank"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold font-display mb-4 text-white">
                  Enlaces Útiles
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Tutoriales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Documentación
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Estado
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dash.ticto.com.br/invitation/affiliation/P89309179"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Afiliados
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold font-display mb-4 text-white">
                  Soporte
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Centro de Ayuda
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contato@zeyra.com.br"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Contacto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Términos de Servicio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/policy-privacy"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      Política de Privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 ZEYRA. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <FloatingWhatsApp phone="6392289287" />
    </div>
  );
};

export default ZeyraGlobalLanding;
