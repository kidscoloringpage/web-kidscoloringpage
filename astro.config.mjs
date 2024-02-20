import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import {defineConfig} from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    site: 'https://kidscoloringpage.com/',
    integrations: [tailwind(), react()],
    output: "server",
    adapter: node({
        mode: "standalone"
    }),
    server: {
        host: true,
        port: 80,
    },
});