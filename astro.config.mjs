import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkCodeBlockWrapper from "./src/plugins/remark-code-block-wrapper.js";

// https://astro.build/config
export default defineConfig({
    integrations: [mdx()],
    markdown: {
        remarkPlugins: [remarkCodeBlockWrapper],
        shikiConfig: {
            theme: 'github-light'
        },
    },
});