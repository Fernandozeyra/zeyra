import React from "react";
import { toast } from "react-toastify";

interface DownloadButtonProps {
  html: string;
  filename?: string;
  className?: string;
  children?: React.ReactNode;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  html,
  filename = "site.html",
  className = "",
  children,
}) => {
  const downloadHTML = () => {
    if (!html || html.trim() === "") {
      toast("Não há conteúdo HTML para baixar.");
      return;
    }

    try {
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast("Sucesso ao baixar o arquivo.");
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
      toast("Erro ao baixar o arquivo. Tente novamente.");
    }
  };

  return (
    <button
      onClick={downloadHTML}
      className={className}
      title={`Baixar ${filename}`}
    >
      {children}
    </button>
  );
};

export default DownloadButton;
