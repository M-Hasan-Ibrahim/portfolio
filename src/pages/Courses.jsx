import PageShell from "../components/PageShell.jsx";
import { courses } from "../data/profile.js";

export default function Courses() {
  return (
    <PageShell eyebrow="Academic Path" title="Courses Taken">
      <div className="course-schools">
        {courses.map((school) => (
          <section className="course-school" key={school.institution}>
            <div className="course-school__header">
              <h2>{school.institution}</h2>
              <p>{school.description}</p>
            </div>

            <div className="course-group-grid">
              {school.groups.map((group) => (
                <article className="course-group" key={group.title}>
                  <div className="course-group__header">
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>

                  {group.items.length > 0 ? (
                    <ul className="course-items">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="course-empty">Courses will be added later.</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
