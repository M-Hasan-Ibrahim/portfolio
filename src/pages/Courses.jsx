import { useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { courses } from "../data/data.js";

const shouldShowDescription = (description) =>
  description && description !== "Description placeholder.";

const renderHighlightedText = (text, query) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = trimmedQuery.toLowerCase();
  const parts = [];
  let cursor = 0;
  let matchIndex = lowerText.indexOf(lowerQuery, cursor);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push(text.slice(cursor, matchIndex));
    }

    const endIndex = matchIndex + trimmedQuery.length;
    parts.push(
      <mark key={`${text}-${matchIndex}`} className="course-search__mark">
        {text.slice(matchIndex, endIndex)}
      </mark>,
    );

    cursor = endIndex;
    matchIndex = lowerText.indexOf(lowerQuery, cursor);
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
};

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageShell eyebrow="Academic Path" title="Courses Taken">
      <div className="course-search">
        <input
          aria-label="Search courses"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search courses to highlight"
          type="search"
          value={searchQuery}
        />
      </div>

      <div className="course-schools">
        {courses.map((school) => (
          <section className="course-school" key={school.institution}>
            <div className="course-school__header">
              <h2>{school.institution}</h2>
              {shouldShowDescription(school.description) && (
                <p>{school.description}</p>
              )}
            </div>

            <div className="course-group-grid">
              {school.groups.map((group) => (
                <article className="course-group" key={group.title}>
                  <div className="course-group__header">
                    <h3>{group.title}</h3>
                    {shouldShowDescription(group.description) && (
                      <p>{group.description}</p>
                    )}
                  </div>

                  {group.items.length > 0 ? (
                    <ul className="course-items">
                      {group.items.map((item) => (
                        <li key={item}>{renderHighlightedText(item, searchQuery)}</li>
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
