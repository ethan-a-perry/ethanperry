// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

const writing = defineCollection({
    loader: glob({ base: "./src/content/writing", pattern: '**/*.{md,mdx,mdoc}' }),
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
    loader: glob({ base: "./src/content/work", pattern: '**/*.{md,mdx,mdoc}' }),
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

export const collections = { writing, work };
