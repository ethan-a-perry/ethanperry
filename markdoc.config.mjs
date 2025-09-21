import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document, // Apply defaults for other options
            render: null, // default 'article'
        },
    },
    extends: [
        shiki({
            theme: 'github-light'
        }),
    ],
    tags: {
        Sudoku: {
            render: component('./src/components/Sudoku.astro'),
            attributes: {
                classes: { type: String },
            },
        },
        CodeBlock: {
            render: component('./src/components/CodeBlock.astro'),
            attributes: {
                language: { type: String },
                filename: { type: String }
            }
        }
    },
});