import { contacts, courses, profile, projects } from "./data/profile.js";

const routes = [
  {
    path: "index",
    label: "Home",
    description: "Start here with a quick introduction.",
    image: "/assets/images/hero-background.png",
    render: renderHome,
  },
  {
    path: "projects",
    label: "Projects",
    description: "Selected builds, experiments, and case studies.",
    image: "/assets/images/hero-background.png",
    render: renderProjects,
  },
  {
    path: "courses",
    label: "Courses",
    description: "Academic work and technical subjects taken.",
    image: "/assets/images/profile-placeholder.png",
    render: renderCourses,
  },
  {
    path: "contacts",
    label: "Contacts",
    description: "Social links, email, and phone details.",
    image: "/assets/images/hero-background.png",
    render: renderContacts,
  },
  {
    path: "cv",
    label: "CV",
    description: "Full resume preview as a PDF document.",
    image: "/assets/images/profile-placeholder.png",
    render: renderCv,
  },
];

const root = document.getElementById("root");

function assetPath(path) {
  return window.location.port === "5500" ? `/public${path}` : path;
}

function getCurrentRoute() {
  const hashRoute = window.location.hash.replace("#", "").replace("/", "");
  return routes.find((route) => route.path === hashRoute) ?? routes[0];
}

function navigate(path) {
  window.location.hash = path === "index" ? "" : path;
}

function renderApp() {
  const activeRoute = getCurrentRoute();

  const navMarkup = `
    <nav class="nav-tabs" aria-label="Portfolio sections">
      ${routes
        .map(
          (route) => `
            <button
              aria-current="${activeRoute.path === route.path ? "page" : "false"}"
              class="nav-tab"
              data-route="${route.path}"
              style="--tab-image: url('${assetPath(route.image)}')"
              type="button"
            >
              <span class="nav-tab__overlay"></span>
              <span class="nav-tab__content">
                <strong>${route.label}</strong>
                <small>${route.description}</small>
              </span>
            </button>
          `,
        )
        .join("")}
    </nav>
  `;
  const contentMarkup = `<div class="portfolio-content">${activeRoute.render()}</div>`;
  const isHome = activeRoute.path === "index";

  root.innerHTML = `
    <div class="app-shell ${isHome ? "app-shell--home" : "app-shell--inner"}">
      <main class="portfolio-stage ${isHome ? "portfolio-stage--home" : "portfolio-stage--inner"}">
        ${isHome ? `${contentMarkup}${navMarkup}` : `${navMarkup}${contentMarkup}`}
      </main>
    </div>
  `;

  root.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
}

function renderHome() {
  return `
    <section class="home-hero">
      <img alt="" class="home-hero__background" src="${assetPath("/assets/images/hero-background.png")}" />
      <div class="home-hero__shade"></div>
      <div class="home-hero__content">
        <img alt="Profile placeholder" class="profile-photo" src="${assetPath("/assets/images/profile-placeholder.png")}" />
        <p class="eyebrow">Portfolio</p>
        <h1>${profile.name}</h1>
        <p class="profession">${profile.profession}</p>
        <p class="summary">${profile.summary}</p>
      </div>
    </section>
  `;
}

function renderPageShell(eyebrow, title, content) {
  return `
    <section class="page-shell">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      ${content}
    </section>
  `;
}

function renderProjects() {
  return renderPageShell(
    "Selected Work",
    "Projects",
    `
      <div class="item-grid">
        ${projects
          .map(
            (project) => `
              <article class="item-card">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `,
  );
}

function renderCourses() {
  return renderPageShell(
    "Academic Path",
    "Courses Taken",
    `
      <div class="course-list">
        ${courses.map((course) => `<span class="course-pill">${course}</span>`).join("")}
      </div>
    `,
  );
}

function renderContacts() {
  return renderPageShell(
    "Find Me",
    "Contacts",
    `
      <div class="contact-grid">
        ${contacts
          .map(
            (contact) => `
              <a class="contact-item" href="${contact.href}">
                <span>${contact.label}</span>
                <strong>${contact.value}</strong>
              </a>
            `,
          )
          .join("")}
      </div>
    `,
  );
}

function renderCv() {
  const cvPath = assetPath("/cv/placeholder-cv.pdf");
  return renderPageShell(
    "Resume",
    "CV",
    `
      <div class="cv-frame">
        <object aria-label="CV PDF preview" data="${cvPath}" type="application/pdf">
          <a href="${cvPath}">Open the placeholder CV PDF</a>
        </object>
      </div>
    `,
  );
}

function renderWithTransition() {
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", renderWithTransition);
renderApp();