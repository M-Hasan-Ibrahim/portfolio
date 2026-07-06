export default function CvViewer() {
  const cvPath = `${import.meta.env.BASE_URL}cv/placeholder-cv.pdf`;

  return (
    <div className="cv-frame">
      <object
        aria-label="CV PDF preview"
        data={cvPath}
        type="application/pdf"
      >
        <a href={cvPath}>Open the placeholder CV PDF</a>
      </object>
    </div>
  );
}
