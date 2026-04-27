import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: change `site` and `base` when you know your GitHub username/repo name.
  // For a project page (https://<user>.github.io/<repo>/) set `base: '/<repo>/'`.
  // For a custom domain (rd.naba.it) set `site: 'https://rd.naba.it'` and remove `base`.
  site: 'https://technaba.github.io',
  base: '/virtual-studio-website',
  integrations: [tailwind()],
});
