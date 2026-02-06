
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageUpdates = {
    "The Symphony of Creation": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", // Nature/Forest
    "Joy: A Spiritual Discipline": "https://images.unsplash.com/photo-1513151233558-d860c5398176", // Happiness/Fun
    "Walking in Stillness": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Calm/Beach
    "Seeds of Faith": "https://images.unsplash.com/photo-1457530634043-6aeaf0d6dc22", // Growth/Plant
    "The Light of Morning": "https://images.unsplash.com/photo-1470252649378-27ef864429e1", // Morning/Sunrise
    "Rivers of Living Water": "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2", // River
};

async function main() {
    console.log('Updating images for Godly posts...');

    for (const [title, imageUrl] of Object.entries(imageUpdates)) {
        try {
            const { count } = await prisma.post.updateMany({
                where: { title: title },
                data: { image: imageUrl },
            });
            console.log(`Updated ${count} post(s) titled "${title}" with new image.`);
        } catch (error) {
            console.error(`Failed to update "${title}":`, error);
        }
    }

    console.log('Image updates finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
