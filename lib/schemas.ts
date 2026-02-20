import { z } from 'zod';

// Base schema: Loose validation for saving drafts
export const postSchema = z.object({
    title: z.string().min(1, 'Title is required for draft'),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional().default('Uncategorized'),
    image: z.any().optional(),
    published: z.boolean().optional().default(false),
});

// Strict validation for publishing
export const publishSchema = postSchema.refine((data) => {
    if (data.published) {
        return !!data.excerpt && !!data.content && (!!data.image || data.image instanceof File);
    }
    return true;
}, {
    message: "Excerpt, Content, and Image are required to publish.",
    path: ["published"], // Error will be attached to 'published' field or general
});

export const createPostSchema = publishSchema;
