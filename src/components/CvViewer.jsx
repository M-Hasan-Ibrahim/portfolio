import cvPdf from "../assets/CV.pdf";

export default function CvViewer() {
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

      <div className="cv-frame">
        <object
          aria-label="CV PDF preview"
          data={cvPdf}
          type="application/pdf"
        >
          <a href={cvPdf}>Open the CV PDF</a>
        </object>
      </div>
    </div>
  );
}
