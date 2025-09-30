// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const writings = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx,mdoc}', base: "./src/content/writings" }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        datePublished: z.date(),
        dateUpdated: z.date().optional(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            srcset: z.string(),
            sizes: z.string(),
            og: z.string(),
            fullWidth: z.boolean().optional().default(true),
            style: z.string().optional()
        }).optional(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false)
    })
});

const work = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx,mdoc}", base: "./src/content/work",  }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        datePublished: z.date(),
        dateUpdated: z.date().optional(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            srcset: z.string(),
            sizes: z.string(),
            og: z.string()
        }),
        tags: z.array(z.string()),
        externalLink: z.string().optional(),
        draft: z.boolean().default(false)
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = { writings, work };