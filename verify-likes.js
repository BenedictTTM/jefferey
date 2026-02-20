
async function test() {
    const baseUrl = 'http://localhost:3000/api/posts'; // Corrected URL

    // 1. Get posts
    console.log('Fetching posts...');
    const postsRes = await fetch(baseUrl);
    const posts = await postsRes.json();

    if (posts.length === 0) {
        console.log('No posts found. Create one first.');
        return;
    }

    const publishedPost = posts.find(p => p.published === true);
    if (!publishedPost) {
        console.log('No published posts found. Please create and publish a post via the UI or API.');
        return;
    }

    const postId = publishedPost.id;
    const initialLikes = publishedPost.likesCount || 0;
    console.log(`Testing with Published Post ID: ${postId}`);
    console.log(`Current Likes: ${initialLikes}`);

    const userId = 'test-user-' + Math.floor(Math.random() * 10000) + '-' + Date.now();

    // 2. Like
    console.log(`\nLiking post as ${userId}...`);
    const likeRes = await fetch(`${baseUrl}/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: 'Great post!' })
    });

    if (!likeRes.ok) {
        console.error('Like request failed:', likeRes.status, await likeRes.text());
        return;
    }

    const likeData = await likeRes.json();
    console.log('Like Response:', likeData);

    if (!likeData.liked || likeData.likesCount !== initialLikes + 1) {
        console.error('FAILED: Expected liked=true and incremented count');
    } else {
        console.log('SUCCESS: Liked');
    }

    // 3. Unlike
    console.log(`\nUnliking post as ${userId}...`);
    const unlikeRes = await fetch(`${baseUrl}/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    if (!unlikeRes.ok) {
        console.error('Unlike request failed:', unlikeRes.status, await unlikeRes.text());
        return;
    }

    const unlikeData = await unlikeRes.json();
    console.log('Unlike Response:', unlikeData);

    if (unlikeData.liked || unlikeData.likesCount !== initialLikes) {
        console.error('FAILED: Expected liked=false and decremented count');
    } else {
        console.log('SUCCESS: Unliked');
    }
}

test().catch(console.error);
