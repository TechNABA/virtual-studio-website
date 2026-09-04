import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tab: z.enum(['in-camera-vfx', 'performance-capture']),
    category: z.string(),
    order: z.number().default(999),
    status: z.enum(['active', 'wip', 'planned']).default('active'),
    cover: z.string().optional(), // path to image in /public or external URL
    author: z.string().optional(), // no longer displayed, kept for backward compatibility
    youtubeId: z.string().optional(), // YouTube video ID (the part after v= in the URL)
  }),
});

export const collections = { projects };
