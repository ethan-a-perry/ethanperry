import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document,
			render: null,
		},
		link: {
			...nodes.link,
			render: component("./src/components/Link.astro"),
			attributes: {
				...nodes.link.attributes,
			}
		}
	},
	extends: [
		shiki({
			theme: "github-light",
		}),
	],
	tags: {
		image: {
			render: "img",
			attributes: {
				src: { type: String, required: true },
				alt: { type: String, required: true },
				width: { type: Number },
				height: { type: Number },
			},
		},
		ExternalLink: {
			render: component("./src/components/Link.astro"),
			attributes: {
				href: { type: String, required: true },
				external: { type: Boolean, default: true },
			},
		},
		CodeBlock: {
			render: component("./src/components/CodeBlock.astro"),
			attributes: {
				language: { type: String },
				filename: { type: String },
			},
		},
		FullWidth: {
			render: "div",
			attributes: {
				class: { type: String, default: "full-width" },
			},
		},
		Sudoku: {
			render: component("./src/components/Sudoku.astro"),
		},
	},
});
