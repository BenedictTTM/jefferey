const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const posts = await prisma.post.findMany();
        console.log('Total posts:', posts.length);
        posts.forEach(p => {
            console.log(`Post ${p.id}: published=${p.published}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
