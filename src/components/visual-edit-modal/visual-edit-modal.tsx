import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

interface VisualEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedElement: HTMLElement | null;
  onUpdateElement: (updates: ElementUpdates) => void;
}

interface ElementUpdates {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  src?: string; // para imagens
  alt?: string; // para imagens
  href?: string; // para links
  target?: string; // para links (target="_blank", etc.)
}

function VisualEditModal({
  isOpen,
  onClose,
  selectedElement,
  onUpdateElement,
}: VisualEditModalProps) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("16");
  const [fontWeight, setFontWeight] = useState("normal");
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");
  const [linkHref, setLinkHref] = useState("");
  const [linkTarget, setLinkTarget] = useState("_self");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para valores originais (para comparação)
  const [originalValues, setOriginalValues] = useState<{
    text: string;
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: string;
    imageSrc: string;
    imageAlt: string;
    linkHref: string;
    linkTarget: string;
  }>({
    text: "",
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "16",
    fontWeight: "normal",
    imageSrc: "",
    imageAlt: "",
    linkHref: "",
    linkTarget: "_self",
  });

  // Extrair propriedades do elemento selecionado
  useEffect(() => {
    if (selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement);

      const currentText =
        selectedElement.tagName !== "IMG"
          ? selectedElement.textContent || ""
          : "";
      const currentColor = rgbToHex(computedStyle.color);
      const currentBackgroundColor = rgbToHex(computedStyle.backgroundColor);
      const currentFontSize = (
        parseInt(computedStyle.fontSize) || 16
      ).toString();
      const currentFontWeight = computedStyle.fontWeight;
      const currentImageSrc =
        selectedElement.tagName === "IMG"
          ? (selectedElement as HTMLImageElement).src || ""
          : "";
      const currentImageAlt =
        selectedElement.tagName === "IMG"
          ? (selectedElement as HTMLImageElement).alt || ""
          : "";

      // Definir valores atuais
      setText(currentText);
      setColor(currentColor);
      setBackgroundColor(currentBackgroundColor);
      setFontSize(currentFontSize);
      setFontWeight(currentFontWeight);
      setImageSrc(currentImageSrc);
      setImageAlt(currentImageAlt);

      // Definir valores dos links se for um elemento <a>
      if (selectedElement.tagName === "A") {
        const anchorElement = selectedElement as HTMLAnchorElement;
        setLinkHref(anchorElement.href || "");
        setLinkTarget(anchorElement.target || "_self");
      } else {
        setLinkHref("");
        setLinkTarget("_self");
      }

      // Salvar valores originais para comparação
      setOriginalValues({
        text: currentText,
        color: currentColor,
        backgroundColor: currentBackgroundColor,
        fontSize: currentFontSize,
        fontWeight: currentFontWeight,
        imageSrc: currentImageSrc,
        imageAlt: currentImageAlt,
        linkHref:
          selectedElement.tagName === "A"
            ? (selectedElement as HTMLAnchorElement).href || ""
            : "",
        linkTarget:
          selectedElement.tagName === "A"
            ? (selectedElement as HTMLAnchorElement).target || "_self"
            : "_self",
      });
    }
  }, [selectedElement]);

  // Converter RGB para HEX
  const rgbToHex = (rgb: string): string => {
    if (rgb.startsWith("#")) return rgb;
    if (rgb === "rgba(0, 0, 0, 0)" || rgb === "transparent") return "#ffffff";

    const matches = rgb.match(/\d+/g);
    if (!matches) return "#000000";

    const [r, g, b] = matches.map(Number);
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  // Upload de arquivo
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
      }
    }
  };

  // Aplicar mudanças (apenas as que foram modificadas)
  const handleApply = () => {
    const updates: ElementUpdates = {};
    let hasChanges = false;

    // Verificar mudanças em imagens
    if (selectedElement?.tagName === "IMG") {
      if (imageSrc !== originalValues.imageSrc) {
        updates.src = imageSrc;
        hasChanges = true;
      }
      if (imageAlt !== originalValues.imageAlt) {
        updates.alt = imageAlt;
        hasChanges = true;
      }
    } else if (selectedElement?.tagName === "A") {
      // Verificar mudanças em links
      if (text !== originalValues.text) {
        updates.text = text;
        hasChanges = true;
      }
      if (linkHref !== originalValues.linkHref) {
        updates.href = linkHref;
        hasChanges = true;
      }
      if (linkTarget !== originalValues.linkTarget) {
        updates.target = linkTarget;
        hasChanges = true;
      }
    } else {
      // Verificar mudanças em texto
      if (text !== originalValues.text) {
        updates.text = text;
        hasChanges = true;
      }
    }

    // Verificar mudanças de estilo
    if (color !== originalValues.color) {
      updates.color = color;
      hasChanges = true;
    }

    if (backgroundColor !== originalValues.backgroundColor) {
      updates.backgroundColor = backgroundColor;
      hasChanges = true;
    }

    if (fontSize !== originalValues.fontSize) {
      updates.fontSize = `${fontSize}px`;
      hasChanges = true;
    }

    if (fontWeight !== originalValues.fontWeight) {
      updates.fontWeight = fontWeight;
      hasChanges = true;
    }

    // Aplicar apenas se houver mudanças
    if (hasChanges) {
      onUpdateElement(updates);
      toast.success("Elemento atualizado com sucesso!");
      console.log("Mudanças aplicadas:", updates);
    } else {
      toast.info("Nenhuma alteração foi detectada.");
      console.log("Nenhuma mudança detectada");
    }

    onClose();
  };

  // Função para resetar alterações
  const handleReset = () => {
    setText(originalValues.text);
    setColor(originalValues.color);
    setBackgroundColor(originalValues.backgroundColor);
    setFontSize(originalValues.fontSize);
    setFontWeight(originalValues.fontWeight);
    setImageSrc(originalValues.imageSrc);
    setImageAlt(originalValues.imageAlt);
    setLinkHref(originalValues.linkHref);
    setLinkTarget(originalValues.linkTarget);
    toast.info("Alterações resetadas para valores originais.");
  };

  // Verificar se há mudanças
  const hasAnyChanges = () => {
    return (
      text !== originalValues.text ||
      color !== originalValues.color ||
      backgroundColor !== originalValues.backgroundColor ||
      fontSize !== originalValues.fontSize ||
      fontWeight !== originalValues.fontWeight ||
      imageSrc !== originalValues.imageSrc ||
      imageAlt !== originalValues.imageAlt ||
      linkHref !== originalValues.linkHref ||
      linkTarget !== originalValues.linkTarget
    );
  };

  // Função para verificar se um campo foi modificado
  const isFieldChanged = (
    field: keyof typeof originalValues,
    currentValue: string
  ): boolean => {
    return currentValue !== originalValues[field];
  };

  // Classe CSS para campos modificados
  const getFieldClassName = (isChanged: boolean): string => {
    return `w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:border-primary outline-none transition-all ${
      isChanged ? "border-accent shadow-accent/20 shadow-lg" : "border-gray-700"
    }`;
  };

  if (!isOpen || !selectedElement) return null;

  const isImage = selectedElement.tagName === "IMG";
  const isLink = selectedElement.tagName === "A";
  const elementType = isImage ? "Imagem" : isLink ? "Link" : "Texto";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-futuristic gradient-text">
            <i className="fas fa-edit mr-2"></i>
            Editar {elementType}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* Edição de Imagem */}
          {isImage && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Modo de Upload
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUploadMode("url")}
                    className={`px-4 py-2 rounded-lg transition ${
                      uploadMode === "url"
                        ? "bg-primary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <i className="fas fa-link mr-2"></i>
                    URL
                  </button>
                  <button
                    onClick={() => setUploadMode("file")}
                    className={`px-4 py-2 rounded-lg transition ${
                      uploadMode === "file"
                        ? "bg-primary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload
                  </button>
                </div>
              </div>

              {uploadMode === "url" ? (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    className={getFieldClassName(
                      isFieldChanged("imageSrc", imageSrc)
                    )}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Upload da Imagem
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
                  >
                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                    Selecionar Arquivo
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className={getFieldClassName(
                    isFieldChanged("imageAlt", imageAlt)
                  )}
                  placeholder="Descrição da imagem"
                />
              </div>

              {imageSrc && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Preview
                  </label>
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="max-w-full h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              )}
            </div>
          )}

          {/* Edição de Texto */}
          {!isImage && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Texto</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={getFieldClassName(isFieldChanged("text", text))}
                rows={3}
                placeholder="Digite o texto aqui..."
              />
            </div>
          )}

          {/* Edição de Links */}
          {isLink && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  URL do Link
                </label>
                <input
                  type="url"
                  value={linkHref}
                  onChange={(e) => setLinkHref(e.target.value)}
                  className={getFieldClassName(
                    isFieldChanged("linkHref", linkHref)
                  )}
                  placeholder="https://exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Comportamento do Link
                </label>
                <select
                  value={linkTarget}
                  onChange={(e) => setLinkTarget(e.target.value)}
                  className={getFieldClassName(
                    isFieldChanged("linkTarget", linkTarget)
                  )}
                >
                  <option value="_self">Mesma aba</option>
                  <option value="_blank">Nova aba</option>
                  <option value="_parent">Frame pai</option>
                  <option value="_top">Topo da janela</option>
                </select>
              </div>
            </div>
          )}

          {/* Formatação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Cor do Texto
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-700 bg-gray-800"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={`flex-1 px-3 py-2 bg-gray-800 border rounded-lg text-white focus:border-primary outline-none transition-all ${
                    isFieldChanged("color", color)
                      ? "border-accent shadow-accent/20 shadow-lg"
                      : "border-gray-700"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Cor de Fundo
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-700 bg-gray-800"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className={`flex-1 px-3 py-2 bg-gray-800 border rounded-lg text-white focus:border-primary outline-none transition-all ${
                    isFieldChanged("backgroundColor", backgroundColor)
                      ? "border-accent shadow-accent/20 shadow-lg"
                      : "border-gray-700"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Tamanho da Fonte (px)
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className={getFieldClassName(
                  isFieldChanged("fontSize", fontSize)
                )}
                min="8"
                max="72"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Peso da Fonte
              </label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className={getFieldClassName(
                  isFieldChanged("fontWeight", fontWeight)
                )}
              >
                <option value="normal">Normal</option>
                <option value="bold">Negrito</option>
                <option value="lighter">Mais Leve</option>
                <option value="bolder">Mais Pesado</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700">
          <div className="flex gap-2">
            {hasAnyChanges() && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-colors"
                title="Resetar todas as alterações"
              >
                <i className="fas fa-undo mr-2"></i>
                Resetar
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className={`px-4 py-2 rounded-lg transition-colors ${
                hasAnyChanges()
                  ? "bg-primary hover:bg-primary/80 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!hasAnyChanges()}
            >
              <i className="fas fa-check mr-2"></i>
              Aplicar{" "}
              {hasAnyChanges()
                ? `(${
                    Object.values({
                      text: text !== originalValues.text,
                      color: color !== originalValues.color,
                      backgroundColor:
                        backgroundColor !== originalValues.backgroundColor,
                      fontSize: fontSize !== originalValues.fontSize,
                      fontWeight: fontWeight !== originalValues.fontWeight,
                      imageSrc: imageSrc !== originalValues.imageSrc,
                      imageAlt: imageAlt !== originalValues.imageAlt,
                      linkHref: linkHref !== originalValues.linkHref,
                      linkTarget: linkTarget !== originalValues.linkTarget,
                    }).filter(Boolean).length
                  } alteração${
                    Object.values({
                      text: text !== originalValues.text,
                      color: color !== originalValues.color,
                      backgroundColor:
                        backgroundColor !== originalValues.backgroundColor,
                      fontSize: fontSize !== originalValues.fontSize,
                      fontWeight: fontWeight !== originalValues.fontWeight,
                      imageSrc: imageSrc !== originalValues.imageSrc,
                      imageAlt: imageAlt !== originalValues.imageAlt,
                      linkHref: linkHref !== originalValues.linkHref,
                      linkTarget: linkTarget !== originalValues.linkTarget,
                    }).filter(Boolean).length > 1
                      ? "ões"
                      : ""
                  })`
                : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualEditModal;
