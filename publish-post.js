const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const post = await prisma.post.findFirst();
        if (!post) {
            console.log('No posts found to publish.');
            return;
        }
        await prisma.post.update({
            where: { id: post.id },
            data: { published: true }
        });
        console.log(`Published post: ${post.id}`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
