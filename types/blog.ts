export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: Date | string;
    image: string;
    readTime: string;
    category: string;
    likesCount?: number;
}
