# Architecture Instructions

## Overview

GS-Portfolio-3.0 is a personal portfolio website for Gavin Saacke, built as a single-page React application. The entire project lives inside the `client/` directory.

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | React 19 (JSX, no TypeScript)     |
| Build Tool   | Vite 7                            |
| Routing      | React Router DOM 7 (BrowserRouter)|
| Styling      | Plain CSS (per-component files)   |
| Fonts        | Google Fonts — DM Sans, Unbounded |
| CSS Framework| Bootstrap 3.4.1 (CDN, grid only)  |
| Background   | particles.js 2.0 (CDN + npm)     |
| Linting      | ESLint 9 with react-hooks & react-refresh plugins |

## Folder Structure

```
GS-Portfolio-3.0/
├── .github/                  # GitHub & Copilot instruction files
├── client/                   # Entire frontend application
│   ├── index.html            # HTML entry point (particles.js CDN, fonts, Bootstrap CDN)
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public/               # Static assets served at root
│   │   ├── expImg/           # Experience/education company logos (.png)
│   │   ├── projImg/          # Project screenshots/images
│   │   └── skillIcons/       # Skill SVG icons
│   └── src/
│       ├── main.jsx          # React entry — wraps App in BrowserRouter & StrictMode
│       ├── App.jsx           # Root component — particles.js init, routing
│       ├── assets/           # (currently unused)
│       ├── components/       # Reusable UI components
│       │   ├── Intro.jsx     # Hero section — profile image, name, links
│       │   ├── Experience.jsx# Experience/Education toggle with animated tabs
│       │   ├── ExpCard.jsx   # Individual experience or education card
│       │   ├── Skills.jsx    # Skills grid section
│       │   ├── SkillCard.jsx # Individual skill badge with hover effect
│       │   ├── Projects.jsx  # Projects section with cards
│       │   ├── Contact.jsx   # Contact Me button + modal with links
│       │   └── Footer.jsx    # Footer with social links
│       ├── data/             # Static JSON data files
│       │   ├── experiences.json
│       │   ├── education.json
│       │   ├── projects.json
│       │   └── skills.json
│       ├── pages/
│       │   └── Home.jsx      # Single page — composes all sections
│       └── styles/           # Per-component CSS files
│           ├── index.css     # Global resets, typography (h1-h4, p, button)
│           ├── App.css       # App layout, particles-js, responsive breakpoints
│           ├── intro.css
│           ├── Experience.css
│           ├── Skills.css
│           ├── Projects.css
│           ├── Contact.css
│           └── HeaderFooter.css
```

## Application Flow

1. **`index.html`** — Loads Google Fonts, Bootstrap 3 CSS (CDN), and particles.js (CDN). Contains `#root` and `#particles-js` divs.
2. **`main.jsx`** — Mounts `<App />` inside `<BrowserRouter>` and `<StrictMode>`.
3. **`App.jsx`** — Initializes particles.js background via `useEffect`. Defines a single route (`/`) pointing to `<Home />`.
4. **`Home.jsx`** — Composes the page: `Intro → Experience → Skills → Projects → Footer`.

## Component Details

### Intro
- Displays profile image, name, subtitle roles, location info, and links (resume download, LinkedIn, GitHub).
- Profile image served from `public/` root (`BigRings.jpg`).

### Experience
- Segmented control toggles between Experience and Education tabs.
- Both tabs are always rendered in the DOM; visibility is controlled via CSS classes (`tab-panel-active` / `tab-panel-hidden`).
- The wrapper animates its `height` to match the active panel, preventing layout shift.
- Panels fade in/out with a subtle `translateY` transition.

### ExpCard
- Shared card component for both experiences and education entries.
- Company logos are loaded from `/expImg/{company-name}.png` (company name lowercased, spaces replaced with hyphens).
- The `isEducation` prop controls whether the description paragraph is shown.

### Skills
- Renders a grid of `SkillCard` components from `skills.json`.

### SkillCard
- Displays an SVG icon + label.
- Hover effect applies a translucent background color (defined per-skill as a `hex` value in the JSON).
- Icons served from `/skillIcons/{file}.svg`.

### Projects
- Renders project cards from `projects.json`.
- Each card shows an image, name, description, and links (visit + source code).
- Project images served from `/projImg/`.

### Contact
- Centered "Contact Me" button that opens a modal overlay.
- Modal contains email (mailto link), LinkedIn, and GitHub links with icons.
- Clicking the overlay backdrop or the close button dismisses the modal.
- Modal animates in with a fade + slide-up transition.

### Footer
- Displays copyright and social links (LinkedIn, GitHub).

## Data Schema

### experiences.json / education.json
```json
{
  "id": 1,
  "title": "Job Title",
  "company": "Company Name",
  "dateString": "Month Year - Month Year",
  "description": "Brief description of role"
}
```

### skills.json
```json
{
  "id": 1,
  "name": "Display Name",
  "file": "icon-filename-without-extension",
  "hex": "#RRGGBBAA"
}
```
The `hex` field includes alpha (last 2 chars) for the hover background.

### projects.json
```json
{
  "name": "Project Name",
  "imgSrc": "image-filename.png",
  "link": "https://..." or "none",
  "source": "https://github.com/...",
  "description": "Brief description"
}
```

## Styling Conventions

- **One CSS file per component** in `src/styles/`, imported at the top of each component.
- **Global typography** defined in `index.css` — all headings use DM Sans.
- **Color scheme**: Dark background (`#2b2927`), white text, with accent colors per-skill.
- **Responsive layout**: Bootstrap 3 grid classes (`container`, `row`) combined with custom CSS. Main breakpoint at `900px` (desktop widens to `50vw`), mobile breakpoint at `450px`.
- **No CSS modules or CSS-in-JS** — plain class-based CSS.

## Development

```bash
cd client
npm install
npm run dev       # Start Vite dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```
