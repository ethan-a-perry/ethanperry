import {visit} from "unist-util-visit";

export default function remarkCodeBlockWrapper() {
    return (tree) => {
        visit(tree, 'code', (node, index, parent) => {
            const attrs = node.meta ? parseMeta(node.meta) : {};

            const filename = attrs["filename"] || "•••";
            const language = node.lang || "";

            const codeBlock = createCodeBlock(node, { filename, language });

            parent.children.splice(index, 1, codeBlock);
        });
    }
}

function createCodeBlock(node, {filename, language}) {
    return {
        type: "mdxJsxFlowElement",
        name: "CodeBlock",
        attributes: [
            { type: "mdxJsxAttribute", name: "filename", value: filename },
            { type: "mdxJsxAttribute", name: "language", value: language },
        ],
        children: [
            node
        ],
        data: { _mdxExplicitJsx: true },
    };
}

function parseMeta(meta) {
    // Parses meta like: filename="My App.js file" highlight theme=dark → { filename: "My App.js file", highlight: null, theme: "dark" }
    const regex = /(\w+)(?:=(?:"([^"]+)"|(\S+)))?/g;
    const attrs = {};
    let match;

    while ((match = regex.exec(meta)) !== null) {
        const [, key, quotedValue, bareValue] = match;
        attrs[key] = quotedValue ?? bareValue ?? null;
    }

    return attrs;
}