import React from "react";
import whatsappIcon from "../assets/whatsapp.png";

type FloatingWhatsAppProps = {
  phone?: string;
  message?: string;
};

const buildWhatsAppLink = (phone: string, message?: string) => {
  const onlyDigits = phone.replace(/\D/g, "");
  const withCountry = onlyDigits.startsWith("55")
    ? onlyDigits
    : `55${onlyDigits}`;
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${withCountry}${query}`;
};

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone = "6392289287",
  message = "Olá! Vim pelo site e gostaria de saber mais.",
}) => {
  const href = buildWhatsAppLink(phone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1001,
        cursor: "pointer",
      }}
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        style={{
          width: 56,
          height: 56,
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </a>
  );
};

export default FloatingWhatsApp;
