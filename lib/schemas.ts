import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
    readTime: z.string().optional(),
    image: z.any()
        .refine((file) => file?.size > 0 || file instanceof File, "Image is required")
        .optional(),
});

export const createPostSchema = postSchema.extend({
    image: z.any()
        .refine((file) => file instanceof File && file.size > 0, "Image is required for new posts"),
});
