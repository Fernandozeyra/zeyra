"use client";

import { useEffect } from "react";

export default function Neurosite() {
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
    body.style.backgroundColor = "#f8f9fb";

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
      style={{
        fontFamily:
          '"Sora", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#1a1a2e",
        backgroundColor: "#f8f9fb",
      }}
    >
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          scroll-behavior: smooth;
        }

        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Geist:wght@300;400;500;600;700&display=swap');
        
        /* Corrigir fonte itálica */
        * {
          font-style: normal !important;
        }

        /* Animações */
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 197, 255, 0.6);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes borderGlow {
          0% {
            border-color: #00d4ff;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1);
          }
          50% {
            border-color: #7c3aed;
            box-shadow: 0 0 40px rgba(124, 58, 237, 0.6), inset 0 0 30px rgba(124, 58, 237, 0.15);
          }
          100% {
            border-color: #00d4ff;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1);
          }
        }

        @keyframes buttonPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 12px 48px rgba(0, 212, 255, 0.6);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #f8f9fb 0%, #f0f4ff 50%, #f8f9fb 100%);
          padding: 120px 20px 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -15%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 10s ease-in-out infinite reverse;
        }

        .hero-content {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-text {
          animation: fadeInDown 0.8s ease-out;
        }

        .hero-text h1 {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          color: #1a1a2e;
          letter-spacing: -1px;
          font-family: 'Sora', sans-serif;
        }

        .hero-text h1 .highlight {
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .hero-subtitle {
          font-size: 18px;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 48px;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        .hero-cta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 40px;
        }

        .btn {
          padding: 16px 40px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Sora', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.4s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.35);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(34, 197, 255, 0.45);
        }

        .btn-primary:active {
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: #22c5ff;
          border: 2px solid #22c5ff;
          font-weight: 600;
        }

        .btn-secondary:hover {
          background: rgba(34, 197, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.2);
        }

        .btn-whatsapp {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.4);
          transition: all 0.4s ease;
          z-index: 999;
          font-size: 28px;
          border: none;
        }

        .btn-whatsapp:hover {
          transform: scale(1.15) translateY(-5px);
          box-shadow: 0 12px 32px rgba(34, 197, 255, 0.5);
        }

        .trust-text {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 14px;
          color: #718096;
          margin-top: 32px;
          font-weight: 500;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .trust-item::before {
          content: '✓';
          color: #10b981;
          font-weight: 800;
          font-size: 16px;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideInRight 0.8s ease-out;
          position: relative;
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 48px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.6);
          animation: float 4s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #22c5ff 0%, #8b5cf6 100%);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          text-align: center;
        }

        .stat-item {
          text-align: center;
          animation: bounceIn 0.6s ease-out;
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 12px;
          font-family: 'Sora', sans-serif;
        }

        .stat-label {
          font-size: 12px;
          color: #a0aec0;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
          font-family: 'Geist', sans-serif;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease-out;
        }

        .section-header h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 24px;
          color: #1a1a2e;
          line-height: 1.25;
          letter-spacing: -0.5px;
          font-family: 'Sora', sans-serif;
        }

        .section-header h2 .highlight {
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 17px;
          color: #4a5568;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
          letter-spacing: 0.2px;
        }

        /* Comparison Section */
        .comparison {
          background: #ffffff;
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .comparison::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .comparison-card {
          border-radius: 20px;
          padding: 48px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: #f8f9fb;
          border: 2px solid #e8eef7;
          animation: fadeInUp 0.8s ease-out;
        }

        .comparison-card.new {
          border: 2px solid #22c5ff;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          box-shadow: 0 8px 32px rgba(34, 197, 255, 0.15);
        }

        .comparison-card:hover {
          transform: translateY(-8px);
          border-color: #22c5ff;
          box-shadow: 0 12px 40px rgba(34, 197, 255, 0.2);
        }

        .badge-recommended {
          position: absolute;
          top: -16px;
          right: 40px;
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          color: #fff;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(34, 197, 255, 0.3);
        }

        .card-header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 2px solid #e8eef7;
        }

        .card-header h3 {
          font-size: 28px;
          color: #1a1a2e;
          margin-bottom: 10px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
        }

        .card-subtitle {
          color: #a0aec0;
          font-size: 15px;
          margin: 0;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        .comparison-items {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .comparison-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          animation: slideInLeft 0.6s ease-out;
        }

        .item-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        }

        .item-value {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
          font-family: 'Sora', sans-serif;
        }

        .item-label {
          font-size: 14px;
          color: #a0aec0;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        /* Global Reach Section */
        .global-reach {
          background: linear-gradient(180deg, #f8f9fb 0%, #f0f4ff 100%);
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .global-reach::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .global-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .globe-container {
          text-align: center;
          position: relative;
          animation: slideInLeft 0.8s ease-out;
        }

        .globe-icon {
          font-size: 240px;
          line-height: 1;
          margin-bottom: 40px;
          opacity: 0.95;
          animation: float 6s ease-in-out infinite;
        }

        .language-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .language-badge {
          background: #ffffff;
          border: 1.5px solid #e8eef7;
          padding: 10px 16px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #4a5568;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Geist', sans-serif;
        }

        .language-badge:hover {
          border-color: #22c5ff;
          background: rgba(34, 197, 255, 0.08);
          transform: translateY(-4px);
        }

        .language-badge.more {
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          color: #fff;
          border-color: transparent;
          font-weight: 700;
        }

        .global-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          animation: slideInRight 0.8s ease-out;
        }

        .global-feature-card {
          background: #ffffff;
          border: 1.5px solid #e8eef7;
          border-radius: 16px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .global-feature-card:hover {
          border-color: #22c5ff;
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.15);
          transform: translateX(8px);
        }

        .feature-icon-large {
          font-size: 44px;
          flex-shrink: 0;
          line-height: 1;
        }

        .global-feature-card h3 {
          color: #1a1a2e;
          font-size: 18px;
          margin-bottom: 8px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
        }

        .global-feature-card p {
          color: #4a5568;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        /* How It Works Section */
        .how-it-works {
          background: #ffffff;
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .how-it-works::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -15%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .step-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 40px;
          align-items: center;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          border: 1.5px solid #e8eef7;
          border-radius: 16px;
          padding: 48px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          animation: slideUp 0.8s ease-out;
        }

        .step-card:hover {
          border-color: #22c5ff;
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.15);
          transform: translateX(8px);
        }

        .step-number {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(34, 197, 255, 0.3);
          font-family: 'Sora', sans-serif;
        }

        .step-content h3 {
          color: #1a1a2e;
          margin-bottom: 12px;
          font-size: 22px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
        }

        .step-content p {
          color: #4a5568;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        .step-visual {
          font-size: 64px;
          flex-shrink: 0;
          opacity: 0.9;
          line-height: 1;
          animation: float 4s ease-in-out infinite;
        }

        /* Features Section */
        .features {
          background: linear-gradient(180deg, #f8f9fb 0%, #f0f4ff 100%);
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .features::before {
          content: '';
          position: absolute;
          bottom: -30%;
          right: -15%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: 80px;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .feature-card {
          background: #ffffff;
          border: 1.5px solid #e8eef7;
          border-radius: 16px;
          padding: 48px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #22c5ff 0%, #8b5cf6 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-12px);
          border-color: #22c5ff;
          box-shadow: 0 12px 32px rgba(34, 197, 255, 0.2);
        }

        .feature-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
        }

        .feature-header h3 {
          color: #1a1a2e;
          font-size: 20px;
          margin: 0;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
        }

        .feature-description {
          color: #4a5568;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 28px;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .feature-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .check-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-radius: 8px;
          color: #22c5ff;
          font-weight: 800;
          font-size: 15px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-item div {
          flex: 1;
          color: #4a5568;
          line-height: 1.6;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        .feature-item strong {
          color: #1a1a2e;
          display: block;
          margin-bottom: 2px;
          font-weight: 600;
        }

        /* Social Proof Section */
        .social-proof {
          background: #ffffff;
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .social-proof::after {
          content: '';
          position: absolute;
          top: -20%;
          right: -15%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 80px;
          margin-bottom: 80px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          border: 1.5px solid #e8eef7;
          border-radius: 16px;
          padding: 40px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fadeInUp 0.8s ease-out;
        }

        .testimonial-card:hover {
          border-color: #22c5ff;
          box-shadow: 0 8px 24px rgba(34, 197, 255, 0.15);
          transform: translateY(-8px);
        }

        .testimonial-text {
          font-size: 16px;
          color: #2d3748;
          line-height: 1.8;
          margin-bottom: 32px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .author-avatar {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(34, 197, 255, 0.3);
        }

        .author-name {
          font-weight: 700;
          color: #1a1a2e;
          font-size: 16px;
          font-family: 'Sora', sans-serif;
        }

        .author-role {
          color: #a0aec0;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 30px;
        }  z-index: 1;
        }

        .stat-box {
          text-align: center;
          padding: 40px 32px;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%);
          border: 1.5px solid #d4e4ff;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: bounceIn 0.6s ease-out;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 160px;
        }

        .stat-box:hover {
          transform: translateY(-8px);
          border-color: #00d4ff;
          box-shadow: 0 8px 24px rgba(0, 212, 255, 0.15);
        }

        .stat-value {
          font-size: 44px;
          font-weight: 800;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          line-height: 1;
          font-family: 'Sora', sans-serif;
          white-space: nowrap;
        }

        .stat-label {
          font-size: 15px;
          color: #4a5568;
          font-weight: 600;
          font-family: 'Geist', sans-serif;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .stat-value {
            font-size: 36px;
          }
          .stat-label {
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .stat-box {
            padding: 32px 24px;
            min-height: 140px;
          }
          .stat-value {
            font-size: 32px;
          }
          .stat-label {
            font-size: 13px;
          }
        }

        /* Pricing Section */
        .pricing {
          background: linear-gradient(180deg, #f5f7ff 0%, #f0f4ff 100%);
          padding: 120px 20px 100px;
          position: relative;
          overflow: hidden;
        }

        .pricing::before {
          content: '';
          position: absolute;
          top: 0;
          left: -15%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-top: 100px;
          margin-bottom: 100px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .pricing-card {
          background: #ffffff;
          border: 2.5px solid #00d4ff;
          border-radius: 24px;
          padding: 52px 40px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.8s ease-out, borderGlow 3s ease-in-out infinite;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1);
        }

        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pricing-card:hover::before {
          transform: scaleX(1);
        }

        .pricing-card.featured {
          border: 3px solid #00d4ff;
          border-radius: 24px;
          box-shadow: 
            0 0 0 1px rgba(0, 212, 255, 0.3),
            0 0 30px rgba(0, 212, 255, 0.8),
            0 0 60px rgba(0, 212, 255, 0.6),
            inset 0 0 40px rgba(0, 212, 255, 0.2),
            0 20px 100px rgba(0, 212, 255, 0.4);
          transform: scale(1.12);
          background: #ffffff;
          animation: fadeInUp 0.8s ease-out, borderGlowProIntense 2s ease-in-out infinite;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }


        @keyframes borderGlowProIntense {
          0% {
            box-shadow: 
              0 0 0 1px rgba(0, 212, 255, 0.3),
              0 0 30px rgba(0, 212, 255, 0.8),
              0 0 60px rgba(0, 212, 255, 0.6),
              inset 0 0 40px rgba(0, 212, 255, 0.2),
              0 20px 100px rgba(0, 212, 255, 0.4);
            transform: scale(1.12);
          }
          50% {
            box-shadow: 
              0 0 0 2px rgba(124, 58, 237, 0.5),
              0 0 50px rgba(124, 58, 237, 1),
              0 0 80px rgba(124, 58, 237, 0.8),
              inset 0 0 50px rgba(124, 58, 237, 0.3),
              0 30px 120px rgba(124, 58, 237, 0.5);
            transform: scale(1.14);
          }
          100% {
            box-shadow: 
              0 0 0 1px rgba(0, 212, 255, 0.3),
              0 0 30px rgba(0, 212, 255, 0.8),
              0 0 60px rgba(0, 212, 255, 0.6),
              inset 0 0 40px rgba(0, 212, 255, 0.2),
              0 20px 100px rgba(0, 212, 255, 0.4);
            transform: scale(1.12);
          }
        }


        .pricing-card:hover {
          border-color: #00d4ff;
          box-shadow: 0 12px 40px rgba(0, 212, 255, 0.2);
          transform: translateY(-12px);
        }

        .pricing-card.featured:hover {
          transform: scale(1.16) translateY(-16px);
          box-shadow: 
            0 0 0 3px rgba(0, 212, 255, 0.6),
            0 0 50px rgba(0, 212, 255, 1),
            0 0 100px rgba(124, 58, 237, 0.9),
            inset 0 0 60px rgba(0, 212, 255, 0.4),
            0 40px 160px rgba(0, 212, 255, 0.8);
        }



        .pricing-header {
          margin-bottom: 32px;
        }

        .pricing-name {
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 12px;
          font-family: 'Sora', sans-serif;
          letter-spacing: -0.3px;
        }

        .pricing-description {
          color: #a0aec0;
          font-size: 14px;
          margin-bottom: 28px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        .pricing-price {
          font-size: 52px;
          font-weight: 800;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
          line-height: 1;
          font-family: 'Sora', sans-serif;
          letter-spacing: -1px;
        }

        .pricing-period {
          color: #a0aec0;
          font-size: 14px;
          margin-bottom: 40px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        .pricing-features {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 48px;
          flex-grow: 1;
        }

        .pricing-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #4a5568;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
          line-height: 1.5;
        }

        .pricing-feature::before {
          content: '';
          display: none;
        }

        .pricing-cta {
          width: 100%;
          padding: 18px 28px;
          border-radius: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(34, 197, 255, 0.2);
        }

        .pricing-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.4s ease;
          z-index: 0;
        }

        .pricing-cta:hover::before {
          left: 100%;
        }

        .pricing-cta span {
          position: relative;
          z-index: 1;
        }

        .pricing-cta.primary {
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          color: #ffffff;
          box-shadow: 0 8px 28px rgba(0, 212, 255, 0.5);
          position: relative;
          font-weight: 800;
        }

        .pricing-cta.primary::after {
          content: '→';
          position: absolute;
          right: 28px;
          font-size: 18px;
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 1;
        }

        .pricing-cta.primary:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(34, 197, 255, 0.5);
        }

        .pricing-cta.primary:hover::after {
          transform: translateX(6px);
        }

        .pricing-cta.secondary {
          background: transparent;
          color: #00d4ff;
          border: 2.5px solid #00d4ff;
          font-weight: 800;
          box-shadow: 0 0 0 rgba(0, 212, 255, 0);
        }

        .pricing-cta.secondary::after {
          content: '→';
          position: absolute;
          right: 28px;
          font-size: 18px;
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 0.8;
        }

        .pricing-cta.secondary:hover {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
          transform: translateY(-8px);
          box-shadow: 0 8px 28px rgba(0, 212, 255, 0.4);
          border-color: #7c3aed;
          color: #7c3aed;
        }

        .pricing-cta.secondary:hover::after {
          transform: translateX(6px);
          opacity: 1;
        }

        .pricing-cta-starter-btn {
          width: 100%;
          padding: 16px 28px;
          border-radius: 14px;
          font-weight: 800;
          border: 2px solid #00d4ff;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          background: transparent;
          color: #00d4ff;
          box-shadow: 0 4px 16px rgba(0, 212, 255, 0.15);
        }

        .pricing-cta-starter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
          z-index: 0;
        }

        .pricing-cta-starter-btn::after {
          content: '→';
          position: relative;
          font-size: 16px;
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 0.8;
        }

        .pricing-cta-starter-btn:hover {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%);
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0, 212, 255, 0.25);
          border-color: #7c3aed;
          color: #7c3aed;
        }

        .pricing-cta-starter-btn:hover::before {
          left: 100%;
        }

        .pricing-cta-starter-btn:hover::after {
          transform: translateX(4px);
          opacity: 1;
        }

        .pricing-cta-pro-btn {
          width: 100%;
          padding: 16px 28px;
          border-radius: 14px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          color: #ffffff;
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
          animation: buttonPulse 2s ease-in-out infinite;
        }

        .pricing-cta-pro-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
          z-index: 0;
        }

        .pricing-cta-pro-btn::after {
          content: '→';
          position: relative;
          font-size: 16px;
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 1;
        }

        .pricing-cta-pro-btn:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0, 212, 255, 0.5);
        }

        .pricing-cta-pro-btn:hover::before {
          left: 100%;
        }

        .pricing-cta-pro-btn:hover::after {
          transform: translateX(4px);
        }

        .pricing-cta-business-btn {
          width: 100%;
          padding: 16px 28px;
          border-radius: 14px;
          font-weight: 800;
          border: 2px solid #00d4ff;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          background: transparent;
          color: #00d4ff;
          box-shadow: 0 4px 16px rgba(0, 212, 255, 0.15);
        }

        .pricing-cta-business-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
          z-index: 0;
        }

        .pricing-cta-business-btn::after {
          content: '→';
          position: relative;
          font-size: 16px;
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 0.8;
        }

        .pricing-cta-business-btn:hover {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%);
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0, 212, 255, 0.25);
          border-color: #7c3aed;
          color: #7c3aed;
        }

        .pricing-cta-business-btn:hover::before {
          left: 100%;
        }

        .pricing-cta-business-btn:hover::after {
          transform: translateX(4px);
          opacity: 1;
        }

        .pricing-cta-business-btn:hover::after {
          transform: translateX(6px);
          opacity: 1;
        }

        /* Guarantee Section */
        .guarantee-section {
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 2px solid #22c5ff;
          border-radius: 16px;
          padding: 48px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: slideUp 0.8s ease-out;
        }

        .guarantee-section h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 16px;
          font-family: 'Sora', sans-serif;
        }

        .guarantee-section p {
          color: #4a5568;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
          padding: 100px 20px;
          color: #1a1a2e;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -15%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .cta-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(34, 197, 255, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          color: #22c5ff;
          padding: 10px 24px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.6px;
          margin-bottom: 32px;
          text-transform: uppercase;
          border: 1px solid #22c5ff;
          font-family: 'Sora', sans-serif;
          animation: pulse 2s ease-in-out infinite;
        }

        .cta-section h2 {
          font-size: 52px;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          font-family: 'Sora', sans-serif;
          position: relative;
          z-index: 1;
        }

        .cta-section p {
          font-size: 18px;
          margin-bottom: 40px;
          color: #4a5568;
          line-height: 1.8;
          font-weight: 400;
          font-family: 'Geist', sans-serif;
          position: relative;
          z-index: 1;
        }

        .cta-benefits {
          margin-top: 40px;
          font-size: 15px;
          color: #4a5568;
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          font-weight: 600;
          font-family: 'Geist', sans-serif;
          position: relative;
          z-index: 1;
        }

        .cta-benefits div::before {
          content: '✓ ';
          color: #10b981;
          font-weight: 800;
        }

        /* Footer */
        .footer {
          background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 100%);
          color: #ffffff;
          padding: 60px 20px 30px;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 60px;
          margin-bottom: 60px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .footer-section h4 {
          font-size: 16px;
          margin-bottom: 28px;
          font-weight: 700;
          letter-spacing: -0.3px;
          font-family: 'Sora', sans-serif;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section li {
          margin-bottom: 14px;
        }

        .footer-section a {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
        }

        .footer-section a:hover {
          color: #22c5ff;
          transform: translateX(4px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 40px;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
          position: relative;
          z-index: 1;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-text h1 {
            font-size: 48px;
          }

          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .global-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.featured {
            transform: scale(1);
            box-shadow: 
              0 0 0 1px rgba(0, 212, 255, 0.3),
              0 0 20px rgba(0, 212, 255, 0.5),
              0 0 30px rgba(0, 212, 255, 0.3),
              inset 0 0 20px rgba(0, 212, 255, 0.1),
              0 10px 40px rgba(0, 212, 255, 0.2);
          }

          .pricing-card.featured:hover {
            transform: scale(1) translateY(-8px);
            box-shadow: 
              0 0 0 2px rgba(0, 212, 255, 0.4),
              0 0 25px rgba(0, 212, 255, 0.6),
              0 0 40px rgba(124, 58, 237, 0.4),
              inset 0 0 25px rgba(0, 212, 255, 0.15),
              0 15px 50px rgba(0, 212, 255, 0.3);
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-showcase {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-header h2 {
            font-size: 40px;
          }

          .step-card {
            grid-template-columns: auto 1fr;
          }

          .step-visual {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-text h1 {
            font-size: 36px;
          }

          .section-header h2 {
            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .stats-showcase {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .cta-section h2 {
            font-size: 36px;
          }

          .hero {
            padding: 80px 20px 60px;
          }

          .comparison {
            padding: 80px 20px;
          }

          .global-reach {
            padding: 80px 20px;
          }

          .how-it-works {
            padding: 80px 20px;
          }

          .features {
            padding: 80px 20px;
          }

          .social-proof {
            padding: 80px 20px;
          }

          .pricing {
            padding: 80px 20px;
          }

          .pricing-card.featured {
            transform: scale(1) !important;
            margin: 0;
            animation: fadeInUp 0.8s ease-out !important;
          }

          .pricing-card.featured:hover {
            transform: scale(1) translateY(-4px) !important;
          }

          .pricing-card {
            padding: 40px 24px;
          }

          .pricing-price {
            font-size: 42px;
          }

          .cta-section {
            padding: 80px 20px;
          }

          .trust-text {
            flex-direction: column;
            align-items: flex-start;
          }

          .cta-benefits {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
          }

          .globe-icon {
            font-size: 160px;
          }

          .hero-card {
            padding: 40px 24px;
          }

          .step-card {
            padding: 32px;
          }

          .comparison-grid {
            gap: 32px;
          }

          .comparison-card {
            padding: 32px;
          }

          .global-content {
            gap: 60px;
          }

          .global-features {
            gap: 20px;
          }

          .testimonials-grid {
            gap: 32px;
          }

          .pricing-grid {
            gap: 32px;
          }

          .hero-visual {
            animation: none;
          }
        }
      `}</style>

      {/* WhatsApp Button */}
      <a
        className="btn-whatsapp"
        id="whatsapp-btn"
        href="https://api.whatsapp.com/send?phone=63992289287&utm_content=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C&sck=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C&src=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale conosco no WhatsApp"
      >
        💬
      </a>

      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id="hero-title">
              PARE DE OTIMIZAR e Criar
              <br />
              <span className="highlight">Tudo do ZERO.</span>
              <br />
              Comece com que
              <br />
              <span className="highlight">já Funciona com Precisão.</span>
            </h1>
            <p className="hero-subtitle" id="hero-subtitle">
              Com a tecnologia NeuroSite™, a Zeyra cria uma página definitiva em
              qualquer idioma do mundo, precisa, direta e projetada para
              conversão real. Nada de tentativas. Nada de otimização infinita.
              Uma página. Pronta. Forte. E feita para vender.
            </p>
            <div className="hero-cta">
              <a
                className="btn btn-primary"
                id="hero-cta-primary"
                href="#pricing-section"
              >
                Ver Planos e Começar
              </a>
              <a
                className="btn btn-secondary"
                id="hero-cta-secondary"
                href="#comparison-section"
              >
                Conhecer a Zeyra
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">10</div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "Poppins",
                      marginBottom: "12px",
                    }}
                  >
                    Mil+
                  </div>
                  <div className="stat-label">Páginas Criadas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4-</div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "Poppins",
                      marginBottom: "12px",
                    }}
                  >
                    25%
                  </div>
                  <div className="stat-label">Taxa de Conversão</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Idiomas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison" id="comparison-section">
        <div className="section-header">
          <h2 id="comparison-title">
            DO ACHISMO À PRECISÃO: <br />{" "}
            <span className="highlight">
              {" "}
              O Salto do Marketing Manual para o NeuroSite™
            </span>
          </h2>
          <p className="section-subtitle" id="comparison-subtitle">
            O NeuroSite™ não é uma ferramenta, é um sistema. Veja como nosso{" "}
            {""}
            <strong>exclusivo mecanismo</strong> transforma o processo de
            criação de páginas de vendas de um esforço manual e demorado em uma
            ciência de conversão rápida e precisa.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card" id="comparison-card-old">
            <div className="card-header">
              <h3>Leadpage Comum</h3>
              <p className="card-subtitle">O que você tem hoje</p>
            </div>

            <div className="comparison-items">
              <div className="comparison-item">
                <div className="item-icon">⏱️</div>
                <div>
                  <div className="item-value">1-4 semanas</div>
                  <div className="item-label">Tempo de Criação</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">❌</div>
                <div>
                  <div className="item-value">Design genérico</div>
                  <div className="item-label">Aparência amadora</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">📉</div>
                <div>
                  <div className="item-value">Sem otimização</div>
                  <div className="item-label">Conversão baixa</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">💰</div>
                <div>
                  <div className="item-value">Custos altos</div>
                  <div className="item-label">
                    Hospedagem e manutenção{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Em Breve
                    </span>
                  </div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">🔍</div>
                <div>
                  <div className="item-value">Invisível</div>
                  <div className="item-label">Sem SEO</div>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-card new" id="comparison-card-new">
            <div className="badge-recommended">Recomendado</div>
            <div className="card-header">
              <h3>Leadpage Zeyra</h3>
              <p className="card-subtitle">O que você terá</p>
            </div>

            <div className="comparison-items">
              <div className="comparison-item">
                <div className="item-icon">⚡</div>
                <div>
                  <div className="item-value">Minutos</div>
                  <div className="item-label">Tempo de Criação</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">✨</div>
                <div>
                  <div className="item-value">Design profissional</div>
                  <div className="item-label">Nível de agência</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">📈</div>
                <div>
                  <div className="item-value">Otimização automática</div>
                  <div className="item-label">Conversão máxima</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">🎯</div>
                <div>
                  <div className="item-value">
                    Hospedagem inclusa{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Em Breve
                    </span>
                  </div>
                  <div className="item-label">Infraestrutura turbo</div>
                </div>
              </div>

              <div className="comparison-item">
                <div className="item-icon">🚀</div>
                <div>
                  <div className="item-value">SEO otimizado</div>
                  <div className="item-label">Visibilidade garantida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="global-reach" id="global-section">
        <div className="section-header">
          <h2 id="global-title">
            Venda em <span className="highlight">Qualquer Idioma do Mundo</span>
          </h2>
          <p className="section-subtitle" id="global-subtitle">
            Expanda seu negócio globalmente com páginas de vendas que falam a
            língua e a cultura do seu cliente.
          </p>
        </div>

        <div className="global-content">
          <div className="globe-container">
            <div className="globe-icon">🌍</div>
            <div className="language-badges">
              <span className="language-badge">🇧🇷 Português</span>
              <span className="language-badge">🇺🇸 English</span>
              <span className="language-badge">🇪🇸 Español</span>
              <span className="language-badge">🇫🇷 Français</span>
              <span className="language-badge">🇩🇪 Deutsch</span>
              <span className="language-badge">🇮🇹 Italiano</span>
              <span className="language-badge">🇯🇵 日本語</span>
              <span className="language-badge">🇨🇳 中文</span>
              <span className="language-badge">🇰🇷 한국어</span>
              <span className="language-badge">🇷🇺 Русский</span>
              <span className="language-badge more">+40 idiomas</span>
            </div>
          </div>

          <div>
            <div className="global-features">
              <div className="global-feature-card" id="global-feature-1">
                <div className="feature-icon-large">🗣️</div>
                <div>
                  <h3>Tradução Inteligente com IA</h3>
                  <p>
                    Não é apenas tradução literal. Nossa IA adapta o conteúdo
                    para cada cultura, mantendo o poder de persuasão e os
                    gatilhos mentais que convertem.
                  </p>
                </div>
              </div>

              <div className="global-feature-card" id="global-feature-2">
                <div className="feature-icon-large">🎯</div>
                <div>
                  <h3>Adaptação Cultural Automática</h3>
                  <p>
                    Cores, imagens, exemplos e até o tom de voz são ajustados
                    automaticamente para ressoar com cada mercado específico.
                  </p>
                </div>
              </div>

              <div className="global-feature-card" id="global-feature-3">
                <div className="feature-icon-large">⚡</div>
                <div>
                  <h3>Criação Simultânea em Múltiplos Idiomas</h3>
                  <p>
                    Crie sua página em português e tenha versões em inglês,
                    espanhol, francês e mais 47 idiomas prontas em minutos.
                  </p>
                </div>
              </div>

              <div className="global-feature-card" id="global-feature-4">
                <div className="feature-icon-large">🚀</div>
                <div>
                  <h3>SEO Otimizado para Cada Região</h3>
                  <p>
                    Cada versão da sua página é otimizada para os mecanismos de
                    busca locais, garantindo visibilidade máxima em cada país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            zIndex: 1,
            background:
              "linear-gradient(135deg, rgba(34, 197, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
            border: "2px solid rgba(34, 197, 255, 0.25)",
            borderRadius: "20px",
            padding: "60px 48px",
          }}
        >
          <h3
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: "16px",
              fontFamily: "Sora",
              lineHeight: "1.3",
              letterSpacing: "0px",
              fontStyle: "normal",
            }}
          >
            Expanda Suas Vendas para{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22c5ff 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mais de 50 Países
            </span>
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: "#4a5568",
              marginBottom: "32px",
              lineHeight: "1.6",
              fontFamily: "Geist",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Crie sua página em português e tenha versões em 50+ idiomas prontas
            em minutos. Sem complicação, sem barreiras.
          </p>
          <a
            className="btn btn-primary"
            id="global-cta-btn"
            style={{ fontSize: "15px", padding: "14px 40px" }}
            href="#pricing-section"
          >
            Ver Planos e Começar
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-section">
        <div className="section-header">
          <h2 id="how-title">Como Funciona a Zeyra?</h2>
          <p className="section-subtitle" id="how-subtitle">
            Criar um site que vende nunca foi tão simples. Com a Zeyra, sua
            página estará no ar e gerando resultados em apenas 3 passos:
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card" id="step-1">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Descreva Seu Produto</h3>
              <p>
                Conte à nossa IA sobre seu produto, público-alvo e objetivos.
                Sem complicação, sem código.
              </p>
            </div>
            <div className="step-visual">💬</div>
          </div>

          <div className="step-card" id="step-2">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>IA Cria Sua Página</h3>
              <p>
                O Neurosite™ analisa seu nicho, pesquisa concorrentes e constrói
                uma página otimizada com copy persuasivo e design de alta
                conversão.
              </p>
            </div>
            <div className="step-visual">🤖</div>
          </div>

          <div className="step-card" id="step-3">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Publique e Venda</h3>
              <p>
                Revise, faça ajustes finos se desejar e publique. Sua página
                estará online instantaneamente, pronta para transformar
                visitantes em clientes.
              </p>
            </div>
            <div className="step-visual">🚀</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features-section">
        <div className="section-header">
          <h2 id="features-title">Recursos e Diferenciais</h2>
          <p className="section-subtitle" id="features-subtitle">
            Tudo que você precisa para criar páginas que vendem e escalar seu
            negócio globalmente.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card" id="feature-card-1">
            <div className="feature-header">
              <div className="feature-icon">🧠</div>
              <h3>Criação Inteligente com IA</h3>
            </div>
            <p className="feature-description">
              Nossa IA vai além da criação de código. Ela pensa na intenção de
              venda, aplicando gatilhos mentais e princípios de persuasão
              automaticamente.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Vibe-Coding:</strong> Crie com linguagem natural, sem
                  precisar de habilidades técnicas.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Modelo Razonador:</strong> Uma IA que compreende
                  profundamente o seu negócio e a intenção de venda.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Edição Iterativa:</strong> Ajuste e refine sua página
                  em tempo real com feedback inteligente.
                </div>
              </div>
            </div>
          </div>

          <div className="feature-card" id="feature-card-2">
            <div className="feature-header">
              <div className="feature-icon">🌐</div>
              <h3>Vendas Sem Fronteiras</h3>
            </div>
            <p className="feature-description">
              Expanda seu negócio globalmente sem complicações. A Zeyra adapta
              seu conteúdo para cada cultura, garantindo relevância e conversão
              máximas.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Multilinguismo Cultural:</strong> Adaptação completa
                  para mais de 50 idiomas e culturas.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Integração Global:</strong> Conecte-se a gateways como
                  Stripe e PayPal para aceitar pagamentos em múltiplas moedas.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>CDN Global:</strong> Carregamento turbo em qualquer
                  lugar do mundo.
                </div>
              </div>
            </div>
          </div>

          {/* <div className="feature-card" id="feature-card-3">
            <div className="feature-header">
              <div className="feature-icon">📊</div>
              <h3>Otimização Contínua</h3>
            </div>
            <p className="feature-description">
              Nunca pare de vender mais. Nossa plataforma otimiza suas páginas
              automaticamente, garantindo que você esteja sempre à frente.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Testes A/B com IA:</strong> A inteligência artificial
                  testa e encontra as melhores combinações para você.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Analytics em Tempo Real:</strong> Monitore o
                  desempenho e tome decisões baseadas em dados.
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">✓</div>
                <div>
                  <strong>Sugestões Automáticas:</strong> Receba recomendações
                  para otimizar ainda mais suas conversões.
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof" id="social-proof-section">
        <div className="section-header">
          <h2 id="social-title">O Que Nossos Clientes Dizem</h2>
          <p className="section-subtitle" id="social-subtitle">
            Resultados reais de empreendedores que transformaram seus negócios
            com a Zeyra.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card" id="testimonial-1">
            <p className="testimonial-text">
              "Com a Zeyra, nosso faturamento triplicou em 2 meses. A IA não
              apenas criou um site bonito, mas uma verdadeira máquina de
              vendas."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍💼</div>
              <div>
                <div className="author-name">Carlos Silva</div>
                <div className="author-role">CEO, TechStart</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card" id="testimonial-2">
            <p className="testimonial-text">
              "Lançamos nossa campanha global em 5 idiomas em uma semana, algo
              que levaria meses. A adaptação cultural da Zeyra é
              impressionante."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍💼</div>
              <div>
                <div className="author-name">Maria Santos</div>
                <div className="author-role">
                  Diretora de Marketing, GlobalBiz
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="stats-showcase"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            marginTop: "80px",
            marginBottom: "80px",
            maxWidth: "1400px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0 20px",
          }}
        >
          <div className="stat-box" id="stat-box-1">
            <div className="stat-value">10 Mil+</div>
            <div className="stat-label">Páginas Criadas</div>
          </div>
          <div className="stat-box" id="stat-box-2">
            <div className="stat-value">50+</div>
            <div className="stat-label">Países Atendidos</div>
          </div>
          <div className="stat-box" id="stat-box-3">
            <div className="stat-value">3x</div>
            <div className="stat-label">Aumento Médio em Vendas</div>
          </div>
          <div className="stat-box" id="stat-box-4">
            <div className="stat-value">4-25%</div>
            <div className="stat-label">Taxa de Conversão</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing-section">
        <div className="section-header">
          <h2 id="pricing-title">Escolha Seu Plano</h2>
          <p className="section-subtitle" id="pricing-subtitle">
            Planos flexíveis para empreendedores e empresas de todos os
            tamanhos.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card" id="pricing-card-1">
            <div className="pricing-header">
              <h3 className="pricing-name">Starter</h3>
              <p className="pricing-description">Para começar</p>
            </div>
            <div className="pricing-price">
              R$ 29<span style={{ fontSize: "24px" }}>,99</span>
            </div>
            <p className="pricing-period">/mês</p>
            <div className="pricing-features">
              <div className="pricing-feature">✓ Até 2 idiomas</div>
              <div className="pricing-feature">
                ✓ 35 Páginas IA (35 Créditos)
              </div>
              <div className="pricing-feature">
                ✓ Até 10 mil visitas/mês{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Em Breve
                </span>
              </div>
              <div className="pricing-feature">
                ✓ Hospedagem inclusa{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Em Breve
                </span>
              </div>
              <div className="pricing-feature">
                ✓ SSL gratuito{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Em Breve
                </span>
              </div>
            </div>
            <a
              className="pricing-cta secondary"
              id="btn-pricing-starter-begin"
              href="https://payment.ticto.app/O6905784E"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Começar Agora</span>
            </a>
          </div>

          <div className="pricing-card featured" id="pricing-card-2">
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: "0 4px 12px rgba(0, 212, 255, 0.3)",
              }}
            >
              🔥 Mais Vendido
            </div>
            <div className="pricing-header">
              <h3 className="pricing-name">Pro</h3>
              <p className="pricing-description">Mais vendas</p>
            </div>
            <div className="pricing-price">
              R$ 69<span style={{ fontSize: "24px" }}>,99</span>
            </div>
            <p className="pricing-period">/mês</p>
            <div className="pricing-features">
              <div className="pricing-feature">✓ Até 5 idiomas</div>
              <div className="pricing-feature">
                ✓ 75 Páginas IA (75 Créditos)
              </div>
              <div className="pricing-feature">✓ Até 100 mil visitas/mês</div>
              <div className="pricing-feature">✓ Suporte WhatsApp</div>
              <div className="pricing-feature">✓ Editor visual avançado</div>
              <div
                className="pricing-feature"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📊 Analytics{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Em Breve
                </span>
              </div>
            </div>
            <a
              className="pricing-cta primary"
              id="btn-pricing-pro-begin"
              href="https://payment.ticto.app/O6EEDA811"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Começar Agora</span>
            </a>
          </div>

          <div className="pricing-card" id="pricing-card-3">
            <div className="pricing-header">
              <h3 className="pricing-name">Business</h3>
              <p className="pricing-description">Escala total</p>
            </div>
            <div className="pricing-price">
              R$ 199<span style={{ fontSize: "24px" }}>,99</span>
            </div>
            <p className="pricing-period">/mês</p>
            <div className="pricing-features">
              <div className="pricing-feature">✓ Idiomas ilimitados</div>
              <div className="pricing-feature">
                ✓ 350 Páginas IA (350 Créditos)
              </div>
              <div className="pricing-feature">
                ✓ Até 1 milhão de visitas/mês
              </div>
              <div className="pricing-feature">✓ Suporte prioritário</div>
              <div className="pricing-feature">✓ Gerente de conta dedicado</div>
              <div
                className="pricing-feature"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📊 Analytics{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Em Breve
                </span>
              </div>
            </div>
            <a
              className="pricing-cta secondary"
              id="btn-pricing-business-begin"
              href="https://payment.ticto.app/O39902A4F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Começar Agora</span>
            </a>
          </div>
        </div>

        <div className="guarantee-section" id="guarantee-section">
          <h3>🛡️ Garantia de Satisfação</h3>
          <p>
            Se você não sentir o poder da Zeyra em seus resultados, devolvemos
            seu dinheiro. Simples assim.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* <div className="cta-badge" id="cta-badge">
            🎉 Oferta Especial de Lançamento
          </div> */}
          <h2 id="cta-title">
            Sua Jornada para o Sucesso Digital Começa Agora. Sem Riscos.
          </h2>
          <p id="cta-subtitle">
            Você está a <strong>um clique</strong> de transformar sua ideia em
            um <strong>negócio de alta performance</strong>.
          </p>
          <a
            className="btn btn-primary"
            id="cta-main-btn"
            href="#pricing-section"
          >
            Ver Planos e Começar Agora
          </a>
          <div className="cta-benefits">
            <div>Cancele quando quiser</div>
            <div>Suporte 24/7</div>
            <div>Garantia de 7 dias</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-section" id="footer-section-1">
            <h4>Zeyra</h4>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                lineHeight: "1.6",
                marginBottom: "20px",
                fontFamily: "Inter",
              }}
            >
              Páginas de vendas com IA e Neurociência que convertem 4x mais.
            </p>
          </div>
          <div className="footer-section" id="footer-section-2">
            <h4>Contato</h4>
            <ul>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=63992289287&utm_content=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C&sck=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C&src=%7C16f0b51e-d79e-4858-8c79-fb022f36d751%7Cfb.1.1756251725702.42815349628155495%7C"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contato@zeyra.com">Email</a>
              </li>
            </ul>
          </div>
          <div className="footer-section" id="footer-section-3">
            <h4>Legal</h4>
            <ul>
              {/* <li>
                <a href="https://zeyra.io/terms-of-use">Termos de Uso</a>
              </li> */}
              <li>
                <a href="https://zeyra.io/terms-of-use">Políticas</a>
              </li>
              <li>
                <a href="https://zeyra.io/policy-privacy">
                  Política de Reembolso
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section" id="footer-section-4">
            <h4>Redes Sociais</h4>
            <ul>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" id="footer-bottom">
          <p>© 2025 Zeyra. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
