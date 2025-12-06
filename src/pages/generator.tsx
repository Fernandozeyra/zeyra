/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";
import {
  useEvent,
  useLocalStorage,
  useMount,
  useSearchParam,
  useUnmount,
} from "react-use";
import { toast } from "react-toastify";
import { defaultHTML } from "../../utils/consts";
import AskAI from "../components/ask-ai/ask-ai";
import { Auth } from "../../utils/types";
import Preview from "../components/preview/preview";
import DownloadButton from "../components/download-button/download-button";
import logo from "../assets/zeyra-circle.png";
import CopyButton from "../components/copy-button/copy-button";
import VisualEditModal from "../components/visual-edit-modal/visual-edit-modal";
import type {} from "../components/visual-edit-modal/visual-edit-modal";
import { InfoUser } from "../components/info-user/infoUser";

function GeneratorPage() {
  const [htmlStorage, , removeHtmlStorage] = useLocalStorage("html_content");
  const remix = useSearchParam("remix");

  const preview = useRef<HTMLDivElement>(null);
  const editor = useRef<HTMLDivElement>(null);
  const resizer = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const viewIframeRef = useRef<HTMLIFrameElement | null>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  // const [, setError] = useState(false);
  const [html, setHtml] = useState((htmlStorage as string) ?? defaultHTML);
  const [isAiWorking, setisAiWorking] = useState(false);
  const [, setAuth] = useState<Auth | undefined>(undefined);
  const [, setCurrentView] = useState<"editor" | "preview">("editor");
  const [, setPrompts] = useState<string[]>([]);
  const [showVisualEditModal, setShowVisualEditModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );
  const [visualEditMode, setVisualEditMode] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [projects, setProjects] = useState<
    Array<{
      _id: string;
      name: string;
      data: string;
      createdAt: string;
      updatedAt: string;
    }>
  >([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsPage, setProjectsPage] = useState(1);
  const [projectsTotalPages, setProjectsTotalPages] = useState(1);
  const [projectsLimit] = useState(10);
  const [showDeleteProjectConfirm, setShowDeleteProjectConfirm] =
    useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showViewContentModal, setShowViewContentModal] = useState(false);
  const hasBackupRef = useRef(false);

  const backupCurrentHtml = async (force = false) => {
    try {
      if (hasBackupRef.current && !force) return;
      const token = localStorage.getItem("authToken");
      if (!token) return;
      await fetch("/api/editor/backup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ html }),
      }).catch(() => undefined);
      hasBackupRef.current = true;
    } catch {
      // noop
    }
  };

  const fetchMe = async () => {
    const res = await fetch("/api/me");
    if (res.ok) {
      const data = await res.json();
      setAuth(data);
    } else {
      setAuth(undefined);
    }
  };

  const fetchRemix = async () => {
    if (!remix) return;
    const res = await fetch(`/api/remix/${remix}`);
    if (res.ok) {
      const data = await res.json();
      if (data.html) {
        setHtml(data.html);
        toast.success("Remix content loaded successfully.");
      }
    } else {
      toast.error("Failed to load remix content.");
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("remix");
    window.history.replaceState({}, document.title, url.toString());
  };

  /**
   * Resets the layout based on screen size
   * - For desktop: Sets editor to 1/3 width and preview to 2/3
   * - For mobile: Removes inline styles to let CSS handle it
   */
  const resetLayout = () => {
    if (!editor.current || !preview.current) return;

    // lg breakpoint is 1024px based on useBreakpoint definition and Tailwind defaults
    if (window.innerWidth >= 1024) {
      // Set initial 1/3 - 2/3 sizes for large screens, accounting for resizer width
      const resizerWidth = resizer.current?.offsetWidth ?? 8; // w-2 = 0.5rem = 8px
      const availableWidth = window.innerWidth - resizerWidth;
      const initialEditorWidth = availableWidth / 3; // Editor takes 1/3 of space
      const initialPreviewWidth = availableWidth - initialEditorWidth; // Preview takes 2/3
      editor.current.style.width = `${initialEditorWidth}px`;
      preview.current.style.width = `${initialPreviewWidth}px`;
    } else {
      // Remove inline styles for smaller screens, let CSS flex-col handle it
      editor.current.style.width = "";
      preview.current.style.width = "";
    }
  };

  /**
   * Handles resizing when the user drags the resizer
   * Ensures minimum widths are maintained for both panels
   */
  const handleResize = (e: MouseEvent) => {
    if (!editor.current || !preview.current || !resizer.current) return;

    const resizerWidth = resizer.current.offsetWidth;
    const minWidth = 100; // Minimum width for editor/preview
    const maxWidth = window.innerWidth - resizerWidth - minWidth;

    const editorWidth = e.clientX;
    const clampedEditorWidth = Math.max(
      minWidth,
      Math.min(editorWidth, maxWidth)
    );
    const calculatedPreviewWidth =
      window.innerWidth - clampedEditorWidth - resizerWidth;

    editor.current.style.width = `${clampedEditorWidth}px`;
    preview.current.style.width = `${calculatedPreviewWidth}px`;
  };

  const handleMouseDown = () => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleSaveProject = async () => {
    const trimmedName = projectName.trim();
    if (!trimmedName) {
      toast.error("Informe um nome para o projeto.");
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Você precisa estar logado para salvar o projeto.");
      return;
    }
    try {
      setIsSaving(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          
        },
        body: JSON.stringify({ name: trimmedName, data: html }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(result?.message || "Falha ao salvar o projeto.");
      }
      toast.success("Projeto salvo com sucesso!");
      setShowSaveModal(false);
      setProjectName("");
    } catch (error) {
      const message =
        (error as any)?.message?.toString?.() ?? "Erro ao salvar o projeto.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchProjects = async (page = 1) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Você precisa estar logado para ver seus projetos.");
      return;
    }
    try {
      setProjectsLoading(true);
      const res = await fetch(
        `/api/projects?page=${page}&limit=${projectsLimit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(result?.message || "Falha ao carregar projetos.");
      }
      const payload = result?.data;
      const dataContainer = payload?.data ? payload.data : payload;
      setProjects(dataContainer?.projects || []);
      const pagination = dataContainer?.pagination || {
        currentPage: 1,
        totalPages: 1,
      };
      setProjectsPage(pagination.currentPage || 1);
      setProjectsTotalPages(pagination.totalPages || 1);
    } catch (error) {
      const message =
        (error as any)?.message?.toString?.() ?? "Erro ao carregar projetos.";
      toast.error(message);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Você precisa estar logado para excluir o projeto.");
      return;
    }
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/projects/${projectToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(result?.message || "Falha ao excluir o projeto.");
      }
      toast.success("Projeto excluído com sucesso!");
      setShowDeleteProjectConfirm(false);
      setProjectToDelete(null);
      if (projects.length <= 1 && projectsPage > 1) {
        await fetchProjects(projectsPage - 1);
      } else {
        await fetchProjects(projectsPage);
      }
    } catch (error) {
      const message =
        (error as any)?.message?.toString?.() ?? "Erro ao excluir o projeto.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Função para lidar com cliques em elementos do preview
  const handleElementClick = (element: HTMLElement) => {
    console.log("handleElementClick called with element:", element);
    setSelectedElement(element);
    setShowVisualEditModal(true);
  };

  // Função para atualizar elementos no HTML
  type ElementUpdates = {
    text?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: string;
    src?: string;
    alt?: string;
    href?: string;
    target?: string;
  };

  const updateElement = async (updates: ElementUpdates) => {
    if (!selectedElement) return;

    // Criar um parser DOM para trabalhar com o HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Encontrar o elemento correspondente no HTML
    const xpath = getElementXPath(selectedElement);
    const targetElement = getElementByXPath(doc, xpath);

    if (targetElement) {
      // Aplicar as atualizações
      if (updates.text && targetElement.tagName !== "IMG") {
        targetElement.textContent = updates.text;
      }

      if (updates.src && targetElement.tagName === "IMG") {
        targetElement.setAttribute("src", updates.src);
      }

      if (updates.alt && targetElement.tagName === "IMG") {
        targetElement.setAttribute("alt", updates.alt);
      }

      // Aplicar atualizações de links
      if (updates.href && targetElement.tagName === "A") {
        targetElement.setAttribute("href", updates.href);
      }

      if (updates.target && targetElement.tagName === "A") {
        targetElement.setAttribute("target", updates.target);
      }

      // Aplicar estilos
      let style = targetElement.getAttribute("style") || "";

      if (updates.color) {
        style = updateStyleProperty(style, "color", updates.color);
      }

      if (updates.backgroundColor) {
        style = updateStyleProperty(
          style,
          "background-color",
          updates.backgroundColor
        );
      }

      if (updates.fontSize) {
        style = updateStyleProperty(style, "font-size", updates.fontSize);
      }

      if (updates.fontWeight) {
        style = updateStyleProperty(style, "font-weight", updates.fontWeight);
      }

      if (style) {
        targetElement.setAttribute("style", style);
      }

      // Salvar backup antes de aplicar alteração (forçado)
      await backupCurrentHtml(true);
      // Atualizar o HTML
      setHtml(doc.documentElement.outerHTML);
    }
  };

  // Função para obter o XPath de um elemento
  const getElementXPath = (element: HTMLElement): string => {
    if (element.id !== "") {
      return 'id("' + element.id + '")';
    }
    if (element === element.ownerDocument.body) {
      return "/html/body";
    }

    let ix = 0;
    const siblings = element.parentNode?.childNodes || [];

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element) {
        return (
          getElementXPath(element.parentElement!) +
          "/" +
          element.tagName.toLowerCase() +
          "[" +
          (ix + 1) +
          "]"
        );
      }
      if (
        sibling.nodeType === 1 &&
        (sibling as Element).tagName === element.tagName
      ) {
        ix++;
      }
    }
    return "";
  };

  // Função para obter elemento por XPath
  const getElementByXPath = (doc: Document, xpath: string): Element | null => {
    try {
      const result = doc.evaluate(
        xpath,
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      return result.singleNodeValue as Element;
    } catch {
      // Fallback: tentar encontrar por tag e posição
      const parts = xpath.split("/").filter(Boolean);
      let current: Element | Document = doc;

      for (const part of parts) {
        if (part.includes("id(")) {
          const id = part.match(/id\("([^"]+)"\)/)?.[1];
          if (id) {
            current = doc.getElementById(id) || current;
          }
        } else if (part.includes("[")) {
          const [tag, indexStr] = part.split("[");
          const index = parseInt(indexStr.replace("]", "")) - 1;
          const elements: HTMLCollectionOf<Element> = (
            current as Element
          ).getElementsByTagName(tag);
          if (elements[index]) {
            current = elements[index];
          }
        } else {
          const elements: HTMLCollectionOf<Element> = (
            current as Element
          ).getElementsByTagName(part);
          if (elements[0]) {
            current = elements[0];
          }
        }
      }

      return current as Element;
    }
  };

  // Função para atualizar propriedade de estilo
  const updateStyleProperty = (
    styleString: string,
    property: string,
    value: string
  ): string => {
    const styles = styleString.split(";").filter((s) => s.trim());
    const propertyIndex = styles.findIndex((s) =>
      s.trim().startsWith(property + ":")
    );

    const newProperty = `${property}: ${value}`;

    if (propertyIndex >= 0) {
      styles[propertyIndex] = newProperty;
    } else {
      styles.push(newProperty);
    }

    return styles.join("; ") + (styles.length > 0 ? ";" : "");
  };

  // Prevent accidental navigation away when AI is working or content has changed
  useEvent("beforeunload", (e) => {
    if (isAiWorking || html !== defaultHTML) {
      e.preventDefault();
      return "";
    }
  });

  // Initialize component on mount
  useMount(() => {
    // Fetch user data
    fetchMe();
    fetchRemix();

    // Restore content from storage if available
    if (htmlStorage) {
      removeHtmlStorage();
      toast.warn("Previous HTML content restored from local storage.");
    }

    // Set initial layout based on window size
    resetLayout();

    // Attach event listeners
    if (!resizer.current) return;
    resizer.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("resize", resetLayout);
  });

  // Clean up event listeners on unmount
  useUnmount(() => {
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleMouseUp);
    if (resizer.current) {
      resizer.current.removeEventListener("mousedown", handleMouseDown);
    }
    window.removeEventListener("resize", resetLayout);
  });

  // Bloquear navegação de links dentro do iframe do modal de visualização
  useEffect(() => {
    if (!showViewContentModal) return;

    const iframe = viewIframeRef.current;
    if (!iframe) return;

    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a");
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const inject = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        if (!doc.getElementById("zeyra-block-links-style")) {
          const styleEl = doc.createElement("style");
          styleEl.id = "zeyra-block-links-style";
          styleEl.textContent =
            "a { pointer-events: none !important; cursor: default !important; text-decoration: none !important; }";
          doc.head?.appendChild(styleEl);
        }

        doc.addEventListener("click", clickHandler, true);
      } catch {
        // noop
      }
    };

    iframe.addEventListener("load", inject);
    // Tenta injetar imediatamente (caso já esteja carregado)
    inject();

    return () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        doc?.removeEventListener("click", clickHandler, true);
      } catch {
        // noop
      }
      iframe.removeEventListener("load", inject);
    };
  }, [showViewContentModal, html]);

  return (
    <div id="app-wrapper" className="app-container">
      {/* ====== */}
      {/* Header */}
      {/* ====== */}
      <div id="app-header">
        <header className="py-4 px-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full from-primary to-accent flex items-center justify-center">
                  <div>
                    <img
                      src={logo}
                      alt={"Logo"}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
              </div>
              <h1 className="text-2xl font-bold font-futuristic">
                {/* <span className="gradient-text">Zeyra</span> */}
                <span>Zeyra</span>
              </h1>
              {/* <div className="text-sm text-gray-400 font-mono hidden md:block">
                v3.2.1
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              {/* <div className="hidden md:flex items-center space-x-2 text-gray-400">
                <div className="status-indicator status-active"></div>
                <span>Conectado</span>
              </div> */}
              <a
                href="https://dash.ticto.com.br/invitation/affiliation/P89309179"
                target="_blank"
              >
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center neon-btn cursor-pointer">
                  <i className="fa-solid fa-sack-dollar mr-2"></i>
                  <span className="hidden md:inline">Afiliado</span>
                </button>
              </a>

              <InfoUser />
            </div>
          </div>
        </header>
      </div>

      {/* ======= */}
      {/* Sidebar */}
      {/* ======= */}
      <div id="app-sidebar">
        <aside className="w-16 md:w-64 bg-gray-900/50 border-r border-gray-800 flex flex-col overflow-y-auto">
          <nav className="flex-1 p-2 space-y-1">
            <button className="w-full flex items-center p-3 rounded-lg bg-primary/10 text-primary">
              <i className="fas fa-magic text-lg w-8"></i>
              <span className="ml-2 hidden md:inline">Gerador</span>
            </button>
            <button
              className="w-full flex items-center p-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-800/50"
              onClick={() => {
                setShowProjectsModal(true);
                fetchProjects(1);
              }}
            >
              <i className="fas fa-folder text-lg w-8"></i>
              <span className="ml-2 hidden md:inline">Meus Projetos</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-800/50">
              <i className="fa-solid fa-globe text-lg w-8"></i>
              <span className="ml-2 hidden md:inline">
                Domínios{" "}
                <span className="text-xs text-gray-400">(Em breve)</span>
              </span>
            </button>
            <button
              className="w-full flex items-center p-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-800/50"
              onClick={() => {
                const message = encodeURIComponent("Preciso de ajuda no Zeyra");
                const waUrl = `https://wa.me/556392029322?text=${message}`;
                window.open(waUrl, "_blank");
              }}
              aria-label="Ajuda"
            >
              <i className="fas fa-question-circle text-lg w-8"></i>
              <span className="ml-2 hidden md:inline">Ajuda</span>
            </button>
          </nav>
        </aside>
      </div>
      {/* ==== */}
      {/* Body */}
      {/* ==== */}
      <div
        id="app-body"
        className="main-content p-6 grid-pattern flex flex-col"
      >
        {/* Main Content Area */}
        <div className="main-content grid-pattern flex flex-col">
          {/* =============== */}
          {/* Generator Panel */}
          {/* =============== */}
          <div>
            <div id="status-message" className="status-message"></div>

            {/* ==== */}
            {/* Tabs */}
            {/* ==== */}
            <div className="cyber-panel rounded-xl overflow-hidden mb-6">
              <div className="p-6 flex gap-4">
                {/* ================== */}
                {/* Comando de geração */}
                {/* ================== */}
                <div className="lg:col-span-2 space-y-4 flex-1">
                  <div className="cyber-glass rounded-xl p-4">
                    <h3 className="text-lg font-bold font-futuristic mb-3 flex items-center">
                      <i className="fas fa-terminal mr-2"></i>
                      Comando de Geração
                    </h3>

                    <AskAI
                      html={html}
                      setHtml={setHtml}
                      isAiWorking={isAiWorking}
                      setisAiWorking={setisAiWorking}
                      setView={setCurrentView}
                      onProgress={setAiProgress}
                      onNewPrompt={(prompt) => {
                        setPrompts((prev) => [...prev, prompt]);
                      }}
                      onScrollToBottom={() => {
                        editorRef.current?.revealLine(
                          editorRef.current?.getModel()?.getLineCount() ?? 0
                        );
                      }}
                    />

                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-400">
                        <i className="fas fa-info-circle mr-1"></i> Seja
                        detalhado para melhores resultados
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      id="save-btn"
                      onClick={() => setShowSaveModal(true)}
                      className="px-4 py-3 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white rounded-lg font-medium transition flex items-center neon-btn ml-auto"
                    >
                      <i className="fas fa-save mr-2"></i> Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============= */}
          {/* Preview panel */}
          {/* ============= */}
          <div
            className="cyber-panel rounded-xl overflow-hidden flex flex-col flex-1"
            id="preview"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-lg font-bold font-futuristic flex items-center">
                <i
                  className={`mr-2 ${
                    showCodeEditor
                      ? "fas fa-code text-primary"
                      : "fas fa-eye text-primary-foreground"
                  }`}
                ></i>
                {showCodeEditor ? "Editor de Código" : "Pré-visualização"}
              </h3>
              <div className="flex space-x-2">
                <DownloadButton
                  html={html}
                  filename="site.html"
                  className="px-3 py-1.5 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center neon-btn"
                >
                  <i className="fas fa-download mr-1.5"></i>
                  <span className="hidden md:inline">Baixar</span>
                </DownloadButton>

                <button
                  id="rollback-btn"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("authToken");
                      if (!token) {
                        toast.error(
                          "Você precisa estar logado para fazer rollback."
                        );
                        return;
                      }
                      const res = await fetch("/api/editor/rollback", {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      const result = await res.json().catch(() => null);
                      if (!res.ok || !result?.success) {
                        throw new Error(
                          result?.message || "Falha ao executar rollback."
                        );
                      }
                      const restored = result?.data?.html;
                      if (!restored) {
                        throw new Error("Backup não encontrado.");
                      }
                      setHtml(restored);
                      hasBackupRef.current = false;
                      toast.success("Rollback aplicado com sucesso.");
                    } catch (error: any) {
                      toast.error(
                        error?.message || "Erro ao executar rollback."
                      );
                    }
                  }}
                  className="px-3 py-1.5 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center neon-btn"
                >
                  <i className="fas fa-rotate-left mr-1.5"></i>
                  <span className="hidden md:inline">Rollback</span>
                </button>

                <button
                  id="clear-btn"
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-1.5 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center neon-btn"
                >
                  <i className="fas fa-trash-alt mr-1.5"></i>
                  <span className="hidden md:inline">Limpar</span>
                </button>

                <CopyButton
                  html={html}
                  className="px-3 py-1.5 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center neon-btn"
                >
                  <i className="fas fa-copy mr-1.5"></i>
                  <span className="hidden md:inline">Copiar</span>
                </CopyButton>

                <button
                  id="view-content-btn"
                  onClick={() => setShowViewContentModal(true)}
                  className="px-3 py-1.5 bg-gray-800 cursor-pointer hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center neon-btn"
                >
                  <i className="fas fa-eye mr-1.5"></i>
                  <span className="hidden md:inline">Ver conteúdo</span>
                </button>

                <button
                  id="visual-edit-btn"
                  onClick={() => setVisualEditMode(!visualEditMode)}
                  className={`px-3 py-1.5 text-white cursor-pointer text-sm rounded-lg transition flex items-center neon-btn ${
                    visualEditMode
                      ? "bg-accent hover:bg-accent/80"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <i className="fas fa-edit mr-1.5"></i>
                  <span className="hidden md:inline">
                    {visualEditMode ? "Sair da Edição" : "Edição Visual"}
                  </span>
                </button>

                <button
                  id="code-btn"
                  onClick={() => setShowCodeEditor(!showCodeEditor)}
                  className={`px-3 py-1.5 text-white cursor-pointer text-sm rounded-lg transition flex items-center neon-btn ${
                    showCodeEditor
                      ? "bg-primary hover:bg-primary/80"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <i className="fas fa-code mr-1.5"></i>
                  <span className="hidden md:inline">
                    {showCodeEditor ? "Fechar Código" : "Código"}
                  </span>
                </button>
              </div>
            </div>

            <div className="p-4 pb-6 flex flex-col flex-1">
              {showCodeEditor || isAiWorking ? (
                <div className="flex flex-1 bg-gray-900 rounded-xl overflow-hidden">
                  {/* Preview Panel - Left Side */}
                  <div className="flex-1 border-r border-gray-700">
                    <div className="h-full relative">
                      <Preview
                        html={html}
                        isResizing={isResizing}
                        isAiWorking={isAiWorking}
                        ref={preview}
                        setView={setCurrentView}
                        visualEditMode={visualEditMode}
                        onElementClick={handleElementClick}
                      />
                      {isAiWorking && (
                        <div className="absolute left-0 right-0 bottom-0 z-20">
                          <div className="px-4 pb-3">
                            <div className="w-full h-1.5 progress-bar rounded overflow-hidden">
                              <div
                                className="h-1.5 progress-bar__fill transition-[width] duration-200"
                                style={{ width: `${aiProgress}%` }}
                              ></div>
                            </div>
                            <div className="mt-1 text-sm text-gray-300 text-right">
                              {aiProgress}%
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resizer */}
                  <div className="w-1 bg-gray-700 cursor-col-resize hover:bg-primary transition-colors"></div>

                  {/* Code Editor Panel - Right Side */}
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      value={html}
                      onChange={(value) => {
                        if (!hasBackupRef.current) {
                          backupCurrentHtml();
                        }
                        setHtml(value || "");
                      }}
                      onMount={(instance) => {
                        editorRef.current = instance;
                      }}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        lineNumbers: "on",
                        roundedSelection: false,
                        readOnly: isAiWorking,
                        scrollbar: {
                          vertical: "visible",
                          horizontal: "visible",
                        },
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="preview-container bg-gray-900 rounded-xl overflow-hidden flex-1 relative"
                  id="preview-container"
                >
                  <div className="flex h-full text-gray-500" id="empty-preview">
                    <Preview
                      html={html}
                      isResizing={isResizing}
                      isAiWorking={isAiWorking}
                      ref={preview}
                      setView={setCurrentView}
                      visualEditMode={visualEditMode}
                      onElementClick={handleElementClick}
                    />
                  </div>

                  {/* Loading state - progress bar fixada no rodapé do preview */}
                  {isAiWorking && (
                    <div className="absolute left-0 right-0 bottom-0 z-20">
                      <div className="px-4 pb-3">
                        <div className="w-full h-1.5 progress-bar rounded overflow-hidden">
                          <div
                            className="h-1.5 progress-bar__fill transition-[width] duration-200"
                            style={{ width: `${aiProgress}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 text-sm text-gray-300 text-right">
                          {aiProgress}%
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generated code */}
                  <div
                    id="generated-content"
                    className="hidden h-full"
                    style={{ overflow: "auto" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ====== */}
      {/* Footer */}
      {/* ====== */}
      <div id="app-footer">footer</div>

      {/* Modal de Edição Visual */}
      <VisualEditModal
        isOpen={showVisualEditModal}
        onClose={() => {
          setShowVisualEditModal(false);
          setSelectedElement(null);
        }}
        selectedElement={selectedElement}
        onUpdateElement={updateElement}
      />

      {/* Modal de Meus Projetos (paginado) */}
      {showProjectsModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowProjectsModal(false)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold">Meus Projetos</h4>
              <button
                className="px-3 py-1.5 bg-transparent border cursor-pointer border-gray-700 text-gray-300 hover:text-white rounded-lg transition neon-btn text-sm"
                onClick={() => setShowProjectsModal(false)}
              >
                Fechar
              </button>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
              {projectsLoading ? (
                <div className="p-6 text-center text-gray-300">
                  Carregando...
                </div>
              ) : projects.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Nenhum projeto encontrado.
                </div>
              ) : (
                <ul className="divide-y divide-gray-800">
                  {projects.map((p) => (
                    <li
                      key={p._id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Criado em {new Date(p.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 bg-primary cursor-pointer hover:bg-primary/80 text-white text-sm rounded-lg transition neon-btn"
                          onClick={() => {
                            setHtml(p.data || "");
                            setShowCodeEditor(false);
                            setShowProjectsModal(false);
                            toast.success("Projeto selecionado!");
                          }}
                        >
                          Selecionar
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-700 cursor-pointer hover:bg-red-600 text-white text-sm rounded-lg transition neon-btn"
                          onClick={() => {
                            setProjectToDelete({ id: p._id, name: p.name });
                            setShowDeleteProjectConfirm(true);
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-400">
                Página {projectsPage} de {projectsTotalPages}
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 cursor-pointer disabled:bg-gray-800/60 text-white text-sm rounded-lg transition neon-btn"
                  onClick={() => fetchProjects(Math.max(1, projectsPage - 1))}
                  disabled={projectsLoading || projectsPage <= 1}
                >
                  Anterior
                </button>
                <button
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 cursor-pointer disabled:bg-gray-800/60 text-white text-sm rounded-lg transition neon-btn"
                  onClick={() =>
                    fetchProjects(
                      Math.min(projectsTotalPages, projectsPage + 1)
                    )
                  }
                  disabled={
                    projectsLoading || projectsPage >= projectsTotalPages
                  }
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação para excluir projeto */}
      {showDeleteProjectConfirm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => {
            if (!isDeleting) {
              setShowDeleteProjectConfirm(false);
              setProjectToDelete(null);
            }
          }}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h4 className="text-lg font-bold mb-2">Excluir projeto</h4>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir o projeto{" "}
              <span className="font-semibold">{projectToDelete?.name}</span>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-transparent border border-gray-700 text-gray-300 hover:text-white rounded-lg transition neon-btn"
                onClick={() => {
                  if (!isDeleting) {
                    setShowDeleteProjectConfirm(false);
                    setProjectToDelete(null);
                  }
                }}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                className={`px-4 py-2 text-white rounded-lg transition neon-btn ${
                  isDeleting
                    ? "bg-red-900 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-600"
                }`}
                onClick={handleDeleteProject}
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal grande para visualizar conteúdo gerado */}
      {showViewContentModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowViewContentModal(false)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 w-[95vw] h-[95vh] shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold">Conteúdo Gerado</h4>
              <button
                className="px-3 py-1.5 bg-transparent border cursor-pointer border-gray-700 text-gray-300 hover:text-white rounded-lg transition neon-btn text-sm"
                onClick={() => setShowViewContentModal(false)}
              >
                Fechar
              </button>
            </div>
            <div className="flex-1 overflow-hidden rounded-lg border border-gray-800">
              <iframe
                title="preview-content"
                className="w-full h-full bg-white"
                srcDoc={html}
                sandbox="allow-scripts allow-same-origin"
                ref={viewIframeRef}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Salvar Projeto */}
      {showSaveModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowSaveModal(false)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h4 className="text-lg font-bold mb-2">Salvar projeto</h4>
            <p className="text-gray-300 mb-4">
              Informe um nome para o projeto.
            </p>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveProject();
                }
              }}
              placeholder="Ex.: Meu site incrível"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary mb-6"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-transparent border border-gray-700 text-gray-300 hover:text-white rounded-lg transition neon-btn"
                onClick={() => setShowSaveModal(false)}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                className={`px-4 py-2 text-white rounded-lg transition neon-btn ${
                  isSaving
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/80"
                }`}
                onClick={handleSaveProject}
                disabled={isSaving}
              >
                {isSaving ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação para Limpar */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h4 className="text-lg font-bold mb-2">Confirmar limpeza</h4>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja limpar o código do Preview? Esta ação não
              pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-transparent border border-gray-700 text-gray-300 hover:text-white rounded-lg transition neon-btn"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition neon-btn"
                onClick={() => {
                  setHtml(defaultHTML);
                  setShowClearConfirm(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratorPage;
