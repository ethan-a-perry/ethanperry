import {visit} from "unist-util-visit";

export default function remarkCodeBlockWrapper() {
    return (tree) => {
        visit(tree, 'code', (node, index, parent) => {
            if (!node.meta) return;

            // parse meta string into key/value pairs
            const attrs = node.meta
                .split(/\s+/)
                .map((part) => part.split("="))
                .reduce((acc, [k, v]) => {
                    if (v === undefined) {
                        acc[k] = null; // boolean prop
                    } else {
                        acc[k] = v.replace(/^"|"$/g, "");
                    }
                    return acc;
                }, {});

            const filename = attrs["filename"] || ""; // get filename from meta
            const language = node.lang || "";

            const codeBlock = {
                type: "mdxJsxFlowElement",
                name: "div",
                attributes: [
                    { type: "mdxJsxAttribute", name: "className", value: "code-block" },
                ],
                children: [
                    {
                        type: "mdxJsxFlowElement",
                        name: "div",
                        attributes: [
                            { type: "mdxJsxAttribute", name: "className", value: "code-block--header flex-row-1" },
                        ],
                        children: [
                            {
                                type: "mdxJsxFlowElement",
                                name: "span",
                                attributes: [
                                    { type: "mdxJsxAttribute", name: "className", value: "filename ellipsis" },
                                ],
                                children: [
                                    { type: "text", value: filename }
                                ],
                            },
                            {
                                type: "mdxJsxFlowElement",
                                name: "span",
                                attributes: [
                                    { type: "mdxJsxAttribute", name: "className", value: "language" },
                                ],
                                children: [
                                    { type: "text", value: language }
                                ],
                            },
                        ],
                    },
                    // Just insert the original code node as-is
                    node,
                ],
                data: { _mdxExplicitJsx: true },
            };

            parent.children.splice(index, 1, codeBlock);
        });
    }
}