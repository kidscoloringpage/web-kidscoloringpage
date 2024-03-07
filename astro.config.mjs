import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import { shouldIndexPage } from './sitemap.mjs';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://kidscoloringpage.com',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: shouldIndexPage,
    }),
    mdx(),
  ],
  output: 'server',
  adapter: vercel(),
  server: {
    host: true,
    port: 80,
  },
});
