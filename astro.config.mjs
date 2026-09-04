import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // The site is served from the custom domain virtualstudio.naba.it, so `base` must stay
  // disabled (assets are served from the root). Only if the site ever falls back to the
  // GitHub Pages project URL (https://technaba.github.io/virtual-studio-website/) does it
  // need `base: '/virtual-studio-website'` again -- without it the page loads with no CSS.
  site: 'https://virtualstudio.naba.it',
  //base: '/virtual-studio-website',
  integrations: [tailwind()],
});
