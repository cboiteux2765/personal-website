# Personal Website

This is now a minimal one-page Next.js personal site meant to be easy to edit and quick to deploy.

## Run On Localhost

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test On Localhost

1. Visit `http://localhost:3000`.
2. Make sure your name, intro, links, and project cards render.
3. Click `Email`, `GitHub`, `LinkedIn`, and `Resume` to confirm each link works.
4. Shrink the browser width to confirm the layout still stacks cleanly on mobile.

## Build For Deployment

```powershell
npm run build
```

If that succeeds, the site is ready for a standard Next.js host like Vercel.

## What To Change

All editable content lives in `site-data.json`.

Change these fields:

- `site.title`
- `site.description`
- `site.url`
- `profile.name`
- `profile.role`
- `profile.location`
- `profile.email`
- `profile.githubUrl`
- `profile.linkedinUrl`
- `profile.resumePath`
- `intro.headline`
- `intro.summary`
- `highlights`
- `projects`

## What To Add

- Add or remove items in `highlights` for the short bullet list.
- Add or remove items in `projects` for the project section.
- Put your resume PDF in `public/` and update `profile.resumePath` if the filename changes.
