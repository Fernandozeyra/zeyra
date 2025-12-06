import classNames from "classnames";
import {useRef, useEffect} from "react";
import {toast} from "react-toastify";

function Preview({
  html,
  isResizing,
  isAiWorking,
  ref,
  visualEditMode,
  onElementClick,
}: {
  html: string;
  isResizing: boolean;
  isAiWorking: boolean;
  setView: React.Dispatch<React.SetStateAction<"editor" | "preview">>;
  ref: React.RefObject<HTMLDivElement | null>;
  visualEditMode?: boolean;
  onElementClick?: (element: HTMLElement) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Adicionar event listeners quando o iframe carregar
  const handleIframeLoad = () => {
    if (iframeRef.current && onElementClick) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        // Adicionar estilos para modo de edição (sempre)
        const existingStyle = iframeDoc.getElementById('visual-edit-styles');
        if (!existingStyle) {
          const style = iframeDoc.createElement('style');
          style.id = 'visual-edit-styles';
          style.textContent = `
            .visual-edit-mode * {
              cursor: pointer !important;
              transition: all 0.2s ease;
            }
            .visual-edit-mode *:hover {
              outline: 2px solid #00d9ff !important;
              outline-offset: 2px;
              position: relative;
            }
            .visual-edit-mode *:hover::after {
              content: "Clique para editar";
              position: absolute;
              top: -30px;
              left: 0;
              background: #00d9ff;
              color: #000;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
              white-space: nowrap;
              z-index: 1000;
            }
          `;
          iframeDoc.head.appendChild(style);
        }

        // Garantir que os links fiquem dentro do iframe (padrão _self)
        const ensureBaseTarget = () => {
          const existingBase = iframeDoc.querySelector('base');
          if (!existingBase) {
            const base = iframeDoc.createElement('base');
            base.setAttribute('target', '_self');
            iframeDoc.head.prepend(base);
          } else if (!existingBase.getAttribute('target')) {
            existingBase.setAttribute('target', '_self');
          }
        };
        ensureBaseTarget();

        // Remover event listeners anteriores
        const oldHandler = (iframeDoc as any).__clickHandler;
        if (oldHandler) {
          iframeDoc.removeEventListener('click', oldHandler);
        }
        const oldLinkNav = (iframeDoc as any).__linkNavHandler;
        if (oldLinkNav) {
          iframeDoc.removeEventListener('click', oldLinkNav, true);
        }

        // Adicionar event listener de clique (sempre)
        const handleClick = (e: Event) => {
          // Verificar o estado atual do modo de edição visual consultando a classe do body
          const isInEditMode = iframeDoc.body.classList.contains('visual-edit-mode');
          console.log('Click detected in iframe, isInEditMode:', isInEditMode); // Debug
          if (isInEditMode) {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (target && target !== iframeDoc.body && target !== iframeDoc.documentElement) {
              console.log('Element clicked:', target.tagName, target.textContent?.substring(0, 50)); // Debug
              onElementClick(target);
            }
          }
        };

        // Salvar referência do handler e adicionar listener
        (iframeDoc as any).__clickHandler = handleClick;
        iframeDoc.addEventListener('click', handleClick, true); // Use capture para garantir que seja executado

        // Interceptar navegação de âncoras (#) para não sair do app e rolar dentro do iframe
        const linkNavHandler = (ev: Event) => {
          const target = ev.target as Element | null;
          if (!target) return;
          const anchor = target.closest('a') as HTMLAnchorElement | null;
          if (!anchor) return;

          const hrefAttr = anchor.getAttribute('href') || '';
          // Aplicar target _self sempre
          anchor.setAttribute('target', '_self');

          // Lidar com âncoras internas
          if (hrefAttr.startsWith('#')) {
            ev.preventDefault();
            const hash = hrefAttr.slice(1);
            if (!hash) {
              iframeRef.current?.contentWindow?.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
            const el = iframeDoc.getElementById(hash);
            if (el) {
              (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        };
        (iframeDoc as any).__linkNavHandler = linkNavHandler;
        iframeDoc.addEventListener('click', linkNavHandler, true);
      }
    }
  };

  // Effect para controlar o modo de edição visual
  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc && iframeDoc.body) {
          if (visualEditMode) {
            iframeDoc.body.classList.add('visual-edit-mode');
            console.log('Visual edit mode enabled'); // Debug
          } else {
            iframeDoc.body.classList.remove('visual-edit-mode');
            console.log('Visual edit mode disabled'); // Debug
          }
        }
      }
    }, 100); // Pequeno delay para garantir que o iframe carregou
    
    return () => clearTimeout(timer);
  }, [visualEditMode, html]); // Incluir html para re-executar quando o conteúdo mudar

  return (
    <div
      ref={ref}
      className="border-l border-gray-900 bg-white pb-6"
      style={{"height": "100%", "flex": 1}}
      onClick={(e) => {
        if (isAiWorking) {
          e.preventDefault();
          e.stopPropagation();
          toast.warn("Por favor, espere a IA terminar o trabalho.");
        }
      }}
    >
      <iframe
        ref={iframeRef}
        title="output"
        className={classNames("w-full h-full select-none", {
          "pointer-events-none": isResizing || isAiWorking,
        })}
        srcDoc={html}
        onLoad={handleIframeLoad}
      />
    </div>
  );
}

export default Preview;
