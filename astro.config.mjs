import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
	site: 'https://ethanperry.co',
	integrations: [sitemap(), markdoc()]
});
