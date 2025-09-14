// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const writings = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/writings" }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        description: z.string(),
        draft: z.boolean().default(false),
        tags: z.array(z.string())
    })
});

const work = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work",  }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean().default(false),
        tags: z.array(z.string()),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        date: z.string()
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = { writings, work };