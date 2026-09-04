# NABA — Virtual Studio

Showcase site for the Virtual Studio section of NABA's R&D department.

**Live at → https://virtualstudio.naba.it/**

A static site built with [Astro](https://astro.build) and published to GitHub Pages by GitHub
Actions on every push to `main`. Content is plain Markdown: one file per project card in
`src/content/projects/`, with cover images in `public/images/`.

## Local development

Requires [Node.js 20+](https://nodejs.org).

```bash
npm install
```

```bash
npm run dev
```

The dev server runs on `http://localhost:4321/`. `npm run build` generates the static site into
`dist/`.
