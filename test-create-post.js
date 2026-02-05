
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

async function testCreatePost() {
    const fetch = (await import('node-fetch')).default;

    const form = new FormData();
    form.append('title', 'Test Blog Post');
    form.append('excerpt', 'This is a test post created via script.');
    form.append('content', '<p>Hello world! This is my first programmed post.</p>');
    form.append('category', 'Technology');
    form.append('readTime', '2 min');

    // Use a real image file
    const imagePath = path.join(__dirname, 'public', 'dry.png');

    if (!fs.existsSync(imagePath)) {
        console.error('Test image not found at:', imagePath);
        return;
    }

    form.append('image', fs.createReadStream(imagePath), {
        filename: 'dry.png',
        contentType: 'image/png',
    });

    try {
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: form,
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);

        // Clean up
        // Clean up
        // fs.unlinkSync(dummyImagePath);
    } catch (error) {
        console.error('Error:', error);
    }
}

testCreatePost();
