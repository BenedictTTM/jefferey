
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = (formData.get('category') as string) || 'Uncategorized';

    // Safer file retrieval
    const imageEntry = formData.get('image');
    const image = (imageEntry && typeof imageEntry === 'object' && 'arrayBuffer' in imageEntry) ? imageEntry as File : null;

    const readTime = (formData.get('readTime') as string) || '5 min';
    const published = formData.get('published') === 'true';

    console.log('Creating post:', { title, category, published, hasImage: !!image });

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (published && (!content || !excerpt)) {
      return NextResponse.json({ error: 'Content and Excerpt are required to publish' }, { status: 400 });
    }

    let imageUrl: string | null = null;
    if (image && image.size > 0) {
      console.log('Uploading image...');
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary using a promise wrapper
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'blog-posts' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        imageUrl = uploadResult.secure_url;
        console.log('Image uploaded:', imageUrl);
      } catch (uploadError) {
        console.error('Failed to upload image:', uploadError);
        // Continue without image or fail? Let's fail for now to be explicit, or maybe continue?
        // User expects image if they uploaded one.
        return NextResponse.json({ error: 'Failed to upload image', details: uploadError }, { status: 500 });
      }
    }

    console.log('Saving to database...');
    const post = await prisma.post.create({
      data: {
        title,
        excerpt: excerpt || '',
        content: content || '',
        category,
        ...(imageUrl ? { image: imageUrl } : {}),
        readTime,
        published,
      },
    });
    console.log('Post created:', post.id);

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post', details: error },
      { status: 500 }
    );
  }
}
