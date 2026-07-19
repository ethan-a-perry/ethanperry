import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
	site: 'https://ethanperry.co',
	integrations: [sitemap(), markdoc()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Sentient",
			cssVariable: "--font-sentient",
			options: {
				variants: [{
					src: ["./src/assets/fonts/Sentient-Variable.woff2"],
					weight: "400 500",
					style: "normal"
				}]
			}
		},
		{
			provider: fontProviders.local(),
			name: "JetBrainsMono",
			cssVariable: "--font-jetbrains-mono",
			options: {
				variants: [{
					src: ["./src/assets/fonts/JetBrainsMono-Variable.woff2"],
					weight: 400,
					style: "normal"
				}]
			}
		},
	]
});
