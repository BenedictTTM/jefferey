
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const godlyPosts = [
    {
        title: "The Symphony of Creation",
        excerpt: "Finding the divine signature in the intricate details of nature, from the smallest leaf to the vast horizon.",
        date: new Date("2024-04-01"),
        category: "Community",
        image: "/bg.png",
        readTime: "5 min",
        content: `
            <p><strong>"The heavens declare the glory of God; the skies proclaim the work of his hands."</strong></p>
            <p>When we step out into nature, we enter a sanctuary not made by human hands. The rustling of the leaves, the rhythmic crashing of ocean waves, and the silent majesty of the mountains all speak a universal language of order, beauty, and intent.</p>
            <h3>A Designed Universe</h3>
            <p>Science reveals the complexity of our world, but faith reveals its purpose. Observing the delicate balance of ecosystems reminds us that we are part of a grand design, intended to live in harmony with creation.</p>
            <h3> Stewardship</h3>
            <p>Recognizing the divine in nature calls us to be better stewards of the earth. We protect what we value, and we value what we understand to be a gift.</p>
        `
    },
    {
        title: "Joy: A Spiritual Discipline",
        excerpt: "True happiness is not just a fleeting emotion but a deep-seated state of being that transcends circumstance.",
        date: new Date("2024-03-28"),
        category: "AI & Health", // Using existing categories, or 'Community' fits best. Let's vary them or use "Community" for most.
        image: "/dry.png",
        readTime: "4 min",
        content: `
            <p>Happiness is often contingent on what happens <em>to</em> us. Joy, however, is what springs <em>from</em> us, regardless of external conditions.</p>
            <h3>The Source of Joy</h3>
            <p>Spiritual joy is rooted in gratitude. It is the quiet confidence that we are loved and held by a power greater than ourselves. Unlike happiness, which can evaporate in hard times, joy can coexist with sorrow, providing a light in the darkness.</p>
            <h3>Cultivating Happiness</h3>
            <p>We can cultivate this state by focusing on the present moment and counting our blessings. A heart at peace gives life to the body, and a joyful spirit is good medicine.</p>
        `
    },
    {
        title: "Walking in Stillness",
        excerpt: "The importance of silence and meditation in connecting with the divine and restoring the soul.",
        date: new Date("2024-03-20"),
        category: "Research", // Metaphorical research
        image: "/bg.png",
        readTime: "6 min",
        content: `
            <p>In a world of constant noise and distraction, silence has become a luxury. Yet, it is in the stillness that we often hear the most profound truths.</p>
            <h3>The Practice of Solitude</h3>
            <p>Taking time to disconnect from the digital world and walk in nature allows our minds to reset. It is a form of prayer, a listening posture that invites peace into our hectic lives.</p>
            <h3>Restoration</h3>
            <p>Just as the body needs sleep, the soul needs silence. It is where we find the strength to face our challenges with grace and the wisdom to make decisions with clarity.</p>
        `
    },
    {
        title: "Seeds of Faith",
        excerpt: "Lessons from the garden: patience, growth, and the trust required to wait for the harvest.",
        date: new Date("2024-03-10"),
        category: "Mentorship",
        image: "/dry.png",
        readTime: "5 min",
        content: `
            <p>Planting a seed is an act of faith. We bury something potential in the darkness of the soil, trusting that with time, water, and sunlight, it will emerge as something new.</p>
            <h3>Patience in Process</h3>
            <p>Spiritual growth, like nature, cannot be rushed. There are seasons of planting, seasons of watering, and seasons of harvest. We must learn to trust the process and embrace the season we are in.</p>
            <h3>The Harvest</h3>
            <p>The fruit we bear—love, patience, kindness—is the result of the roots we have established. Let us tend to our inner gardens with the same care we give to our outer ones.</p>
        `
    },
    {
        title: "The Light of Morning",
        excerpt: "Each sunrise is a reminder of new mercies and the opportunity to begin again.",
        date: new Date("2024-02-25"),
        category: "Community",
        image: "/mba-headshot.jpg", // Using headshot as a placeholder for human happiness/reflection if needed, or back to nature images if I had more. stick to safe ones.
        readTime: "3 min",
        content: `
            <p>There is something miraculous about the dawn. No matter how dark the night, the sun always rises. It is a daily symbol of hope and renewal.</p>
            <h3>New Beginnings</h3>
            <p>We are not defined by our past mistakes. Each day grants us a clean slate, a fresh chance to choose kindness, to pursue our purpose, and to walk in the light.</p>
            <h3>Gratitude</h3>
            <p>Let the first thought of the morning be one of thanks. For breath, for life, and for the beauty of the world waking up around us.</p>
        `
    },
    {
        title: "Rivers of Living Water",
        excerpt: "Understanding the flow of grace and how nature reflects the abundance of specific spiritual truths.",
        date: new Date("2024-02-14"),
        category: "Engineering", // Metaphorical
        image: "/bg.png",
        readTime: "7 min",
        content: `
            <p>A river never flows backward. It is always moving forward, adapting to obstacles, cutting through rock with persistence, and eventually finding its way to the ocean.</p>
            <h3>Flowing with Grace</h3>
            <p>Life, too, is a journey of flow. When we stop resisting and start trusting the current of grace, we find that we are carried to places we could never reach on our own.</p>
            <h3>Abundance</h3>
            <p>Nature is not stingy. It gives profusely—seeds, rain, sunlight. This abundance reminds us that we are meant to live not in scarcity, but with open hands and open hearts.</p>
        `
    },
];

async function main() {
    console.log('Start seeding Godly posts ...');
    for (const post of godlyPosts) {
        // Ensure image exists or fallback
        const postData = { ...post };
        // We use existing images: /bg.png, /dry.png. 
        // If we want "nature", these are the closest we have in the public folder without external links.

        const p = await prisma.post.create({
            data: postData,
        });
        console.log(`Created Godly post: ${p.title} (ID: ${p.id})`);
    }
    console.log('Godly seeding finished.');
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
