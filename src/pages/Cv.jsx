import CvViewer from "../components/CvViewer.jsx";
import PageShell from "../components/PageShell.jsx";

export default function Cv() {
  return (
    <PageShell eyebrow="Resume" title="CV, Curriculum Vitae">
      <CvViewer />
    </PageShell>
  );
}
