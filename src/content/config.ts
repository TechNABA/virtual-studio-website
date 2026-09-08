import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tab: z.enum(['in-camera-vfx', 'performance-capture', 'video']),
    category: z.string(),
    order: z.number().default(999),
    status: z.enum(['active', 'wip', 'planned']).default('active'),
    cover: z.string().optional(), // path to image in /public or external URL
    author: z.string().optional(), // no longer displayed, kept for backward compatibility
    // YouTube video ID: the 11-character code after v= in the URL.
    // Validated here so a malformed id fails the build instead of silently
    // producing a broken player in the modal.
    youtubeId: z
      .string()
      .regex(/^[\w-]{11}$/, 'youtubeId must be the 11-character YouTube video ID (the part after v= in the URL)')
      .optional(),
  }),
});

export const collections = { projects };
