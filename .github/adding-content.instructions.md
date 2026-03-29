# Adding Content

Instructions for adding new content to the portfolio without modifying component code.

## Adding a New Skill

1. Add an SVG icon to `client/public/skillIcons/` named `{file-key}.svg`.
2. Add an entry to `client/src/data/skills.json`:

```json
{
  "id": <next-available-id>,
  "name": "Display Name",
  "file": "filename-without-extension",
  "hex": "#RRGGBB20"
}
```

- The `hex` value is the hover background color. The last two characters (`20`) control opacity — `20` = ~12% opacity, which is the convention used by all existing skills.
- Pick a color that represents the brand/technology.

## Adding a New Experience

1. Add a company logo to `client/public/expImg/{company-name}.png` — the filename should be the company name, lowercased, with spaces replaced by hyphens (e.g., "My Company" → `my-company.png`).
2. Add an entry to `client/src/data/experiences.json`:

```json
{
  "id": <next-available-id>,
  "title": "Job Title",
  "company": "Company Name",
  "dateString": "Month Year - Month Year",
  "description": "Brief role description"
}
```

## Adding a New Education Entry

1. Add a school/institution logo to `client/public/expImg/{school-name}.png` (same naming convention as experiences).
2. Add an entry to `client/src/data/education.json`:

```json
{
  "id": <next-available-id>,
  "title": "Degree or Program",
  "company": "School Name",
  "dateString": "Month Year - Month Year"
}
```

Note: Education entries do not display the `description` field.

## Adding a New Project

1. Add a project image to `client/public/projImg/{image-name}.png`.
2. Add an entry to `client/src/data/projects.json`:

```json
{
  "name": "Project Name",
  "imgSrc": "image-name.png",
  "link": "https://live-url.com" or "none",
  "source": "https://github.com/...",
  "description": "Brief project description"
}
```

- Set `link` to `"none"` if there is no live demo — the "Visit" button will be hidden.
