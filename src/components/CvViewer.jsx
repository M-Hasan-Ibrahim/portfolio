export default function CvViewer() {
  return (
    <div className="cv-frame">
      <object
        aria-label="CV PDF preview"
        data="/cv/placeholder-cv.pdf"
        type="application/pdf"
      >
        <a href="/cv/placeholder-cv.pdf">Open the placeholder CV PDF</a>
      </object>
    </div>
  );
}
