import { useEffect, useMemo, useRef, useState } from "react";
const cvPdf = `${import.meta.env.BASE_URL}assets/CV.pdf`;

const MAX_RENDER_WIDTH = 860;
const MAX_PIXEL_RATIO = 2;

export default function CvViewer() {
  const pagesRef = useRef(null);
  const renderRunRef = useRef(0);
  const lastRenderWidthRef = useRef(0);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const renderPdfUrl = useMemo(() => `${cvPdf}?v=${Date.now()}`, []);

  useEffect(() => {
    let isCancelled = false;
    let resizeTimer = 0;
    const currentRun = renderRunRef.current + 1;
    renderRunRef.current = currentRun;

    const clearPages = () => {
      if (pagesRef.current) {
        pagesRef.current.replaceChildren();
      }
    };

    const renderPages = async (pdfDocument) => {
      const container = pagesRef.current;
      if (!container || isCancelled || renderRunRef.current !== currentRun) return;

      clearPages();
      const containerWidth = container.clientWidth || MAX_RENDER_WIDTH;
      lastRenderWidthRef.current = containerWidth;
      const renderWidth = Math.min(containerWidth, MAX_RENDER_WIDTH);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
        if (isCancelled || renderRunRef.current !== currentRun) return;

        const page = await pdfDocument.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = renderWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });
        const outputViewport = page.getViewport({ scale: scale * pixelRatio });

        const pageElement = document.createElement("article");
        pageElement.className = "cv-page";

        const pageLabel = document.createElement("span");
        pageLabel.className = "cv-page__label";
        pageLabel.textContent = `Page ${pageNumber}`;

        const canvas = document.createElement("canvas");
        canvas.className = "cv-page__canvas";
        canvas.width = Math.floor(outputViewport.width);
        canvas.height = Math.floor(outputViewport.height);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        pageElement.append(pageLabel, canvas);
        container.append(pageElement);

        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Could not prepare the CV page canvas.");
        }
        await page.render({ canvasContext: context, viewport: outputViewport }).promise;
      }

      if (!isCancelled && renderRunRef.current === currentRun) {
        setStatus("ready");
      }
    };

    const loadPdf = async () => {
      setStatus("loading");
      setErrorMessage("");
      clearPages();

      try {
        const [pdfjs, workerModule] = await Promise.all([
          import("pdfjs-dist"),
          import("pdfjs-dist/build/pdf.worker.mjs?url"),
        ]);
        pdfjs.GlobalWorkerOptions.workerSrc = workerModule.default;

        const loadingTask = pdfjs.getDocument({ url: renderPdfUrl });
        const pdfDocument = await loadingTask.promise;
        if (isCancelled || renderRunRef.current !== currentRun) return;

        await renderPages(pdfDocument);

        const resizeObserver = new ResizeObserver(() => {
          const nextWidth = pagesRef.current?.clientWidth ?? 0;
          if (Math.abs(nextWidth - lastRenderWidthRef.current) < 1) return;

          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            if (!isCancelled) {
              setStatus("loading");
              renderPages(pdfDocument);
            }
          }, 160);
        });

        if (pagesRef.current) {
          resizeObserver.observe(pagesRef.current);
        }

        return () => resizeObserver.disconnect();
      } catch (error) {
        if (!isCancelled && renderRunRef.current === currentRun) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "The CV PDF could not be loaded.",
          );
        }
      }
    };

    let disconnectObserver;
    loadPdf().then((cleanup) => {
      disconnectObserver = cleanup;
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(resizeTimer);
      if (disconnectObserver) disconnectObserver();
    };
  }, [renderPdfUrl]);

  return (
    <div className="cv-layout">
      <aside className="cv-panel" aria-label="CV details">
        <span>Document</span>
        <h2>Resume preview</h2>
        <p>
          View the current CV directly here, or open the PDF in a dedicated tab
          for a cleaner reading and download experience.
        </p>
        <div className="cv-actions">
          <a
            className="cv-action cv-action--primary"
            href={cvPdf}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </a>
          <a className="cv-action" href={cvPdf} download>
            Download
          </a>
        </div>
      </aside>

      <div className="cv-frame" aria-label="Rendered CV pages">
        {status === "loading" && (
          <div className="cv-state" role="status">
            Loading CV preview...
          </div>
        )}
        {status === "error" && (
          <div className="cv-state cv-state--error" role="alert">
            <strong>Could not load the CV preview.</strong>
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="cv-pages" ref={pagesRef} />
      </div>
    </div>
  );
}
