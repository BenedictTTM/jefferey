
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.post.delete({
      where: {
        id,
      },
      // Note: We are not deleting the image from Cloudinary here for simplicity,
      // but in a production app you should probably do that using the public_id.
    });


    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

// Configure Cloudinary
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;

    // Safer file retrieval
    const imageEntry = formData.get('image');
    const image = (imageEntry && typeof imageEntry === 'object' && 'arrayBuffer' in imageEntry) ? imageEntry as File : null;

    const readTime = formData.get('readTime') as string;
    const published = formData.get('published') === 'true';

    console.log('Updating post:', { id, title, category, published, hasImage: !!image });

    if (published && (!title || !content || !excerpt)) {
      return NextResponse.json({ error: 'Title, Content and Excerpt are required to publish' }, { status: 400 });
    }

    const dataToUpdate: any = {
      title,
      excerpt: excerpt || '',
      content: content || '',
      category,
      readTime,
      published,
    };

    if (image && image.size > 0) {
      console.log('Uploading image for update...');
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
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

        dataToUpdate.image = uploadResult.secure_url;
        console.log('Image uploaded:', dataToUpdate.image);
      } catch (uploadError) {
        console.error('Failed to upload image during update:', uploadError);
        return NextResponse.json({ error: 'Failed to upload image', details: uploadError }, { status: 500 });
      }
    }

    console.log('Updating database...');
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
    console.log('Post updated:', post.id);

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update post', details: error },
      { status: 500 }
    );
  }
}
