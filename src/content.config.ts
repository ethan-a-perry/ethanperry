// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const writing = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx,mdoc}', base: "./src/content/writing" }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().optional(),
        seoTitle: z.string(),
        seoDescription: z.string(),
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
		draft: z.boolean().default(false),
    })
});

const work = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx,mdoc}", base: "./src/content/work",  }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        seoTitle: z.string(),
        seoDescription: z.string(),
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
        links: z.array(
            z.object({
                url: z.string(),
                text: z.string().optional()
            })
        ).optional(),
        draft: z.boolean().default(false)
    })
});

// const post = defineCollection({
// 	loader: glob({ pattern: "**/[^_]*.{md,mdx,mdoc}", base: "./src/content"})
// })

// Export a single `collections` object to register your collection(s)
export const collections = { writing, work };
