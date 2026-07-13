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
		},
		fence: {
			render: component("./src/components/CodeBlock.astro"),
			attributes: {
    			content:  { type: String, render: true, required: true },
      			language: { type: String, render: true },
       			filename: { type: String },
			},
		},
	},
	tags: {
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
