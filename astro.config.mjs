import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkCodeBlockWrapper from "./src/plugins/remark-code-block-wrapper.js";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: 'https://ethanperry.net',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkCodeBlockWrapper],
        shikiConfig: {
            theme: 'github-light'
        },
    },
});