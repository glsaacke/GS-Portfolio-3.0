# Copilot Instructions

## Project Context

This is a personal portfolio website for Gavin Saacke — a single-page React app built with Vite. All source code lives in `client/`.

## Code Style

- **Language**: JavaScript (JSX) — no TypeScript.
- **Components**: Functional components with hooks (`useState`, `useEffect`, `useRef`, `useCallback`).
- **Styling**: Plain CSS with one file per component in `src/styles/`. No CSS modules, Tailwind, or styled-components.
- **Data**: Static JSON files in `src/data/` — no API calls or backend, except for `StravaActivity` which fetches from the Vercel serverless function at `/api/strava`.
- **Imports**: Use relative paths. CSS is imported at the top of each component file.

## Conventions

- Use `const` arrow functions for component definitions (e.g., `const Intro = () => { ... }`).
- Export components as `export default ComponentName` at the bottom of the file.
- Use `className` (not `class`) for JSX — this is React.
- Inline styles should only be used for dynamic values (e.g., hover colors from data). Prefer CSS classes for static styles.
- Use semantic HTML elements where appropriate (`section`, `span`, `a`, `div`).
- Keep components small and focused — extract reusable card components (like `ExpCard`, `SkillCard`).

## Data Patterns

- Experiences, education, skills, and projects are driven by JSON files in `src/data/`.
- When adding new items, follow the existing JSON schema exactly (see `architecture.instructions.md` for schemas).
- Image assets go in `public/` subdirectories: `expImg/`, `projImg/`, `skillIcons/`.
- Skill icons are SVGs. Experience logos are PNGs.

## Responsive Design

- Bootstrap 3 grid is available (`container`, `row`, `col-*`) from CDN.
- Custom responsive styles use `@media` queries — main breakpoints at `900px` (desktop) and `450px` (mobile).
- The app container is `84vw` on mobile, `50vw` on desktop (≥900px).

## Things to Avoid

- Do not add TypeScript files — this is a pure JS/JSX project.
- Do not install CSS frameworks (Tailwind, etc.) — the project uses plain CSS + Bootstrap 3 CDN.
- Do not add a backend or API layer — all data is static JSON. The one exception is `client/api/strava.js`, a Vercel serverless function for the Strava OAuth flow.
- Do not use `class` instead of `className` in JSX.
- Do not use default exports with named declarations on the same line (e.g., avoid `export default function Component()`).

## Additional Instructions
- Update the github copilot instruction files when new components or features are added, or when architectural changes are made.
