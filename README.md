# Portfolio

Personal portfolio website scaffold.

## Run

This project uses React through Vite. Run it with:

```bash
npm install
npm run dev
```

Then open the local Vite URL, usually:

```text
http://127.0.0.1:5173/
```

Do not use VS Code Live Server for the React version. Live Server will not compile JSX, so edits in files like `src/pages/Home.jsx` will not show correctly.

## Structure

- `src/main.jsx`: React entry point.
- `src/pages`: page-level React components.
- `src/components`: reusable React components.
- `src/data`: temporary profile, project, course, and contact content.
- `src/styles`: shared portfolio styling and page-specific CSS.
- `src/assets/images`: bundled React image assets.
- `public/assets/images`: browser-served image assets.
- `public/cv`: CV PDF files served directly by the app.