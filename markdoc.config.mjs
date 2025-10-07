import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document,
            render: null,
        },
    },
    extends: [
        shiki({
            theme: 'github-light'
        }),
    ],
    tags: {
        image: {
            render: 'img',
            attributes: {
                src: { type: String, required: true },
                alt: { type: String, required: true },
                width: { type: Number },
                height: { type: Number },
            },
        },
        ExternalLink: {
            render: 'a',
            attributes: {
                href: { type: String, required: true },
                target: { type: String, default: '_blank' },
                rel: { type: String, default: 'noopener noreferrer' },
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