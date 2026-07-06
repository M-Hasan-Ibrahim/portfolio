import PageShell from "../components/PageShell.jsx";
import { courses } from "../data/profile.js";

export default function Courses() {
  return (
    <PageShell eyebrow="Academic Path" title="Courses Taken">
      <div className="course-list">
        {courses.map((course) => (
          <span className="course-pill" key={course}>
            {course}
          </span>
        ))}
      </div>
    </PageShell>
  );
}
