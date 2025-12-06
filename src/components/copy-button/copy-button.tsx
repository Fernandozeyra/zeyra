import React from "react";
import { toast } from "react-toastify";

interface CopyButtonProps {
  html: string;
  className?: string;
  children?: React.ReactNode;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  html,
  className = "",
  children,
}) => {
  const copyToClipboard = async () => {
    if (!html || html.trim() === "") {
      toast("Não há conteúdo HTML para copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(html);
      toast("Código copiado para a área de transferência!");
    } catch (error) {
      console.error("Erro ao copiar:", error);
      toast("Erro ao copiar o código. Tente novamente.");
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={className}
      title="Copiar código para a área de transferência"
    >
      {children || "Copiar Código"}
    </button>
  );
};

export default CopyButton;
