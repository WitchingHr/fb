import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/dbConnect';
import { NextResponse } from 'next/server';

// create new post
export async function POST(req: Request) {
  try {
    const { content, postImage } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.redirect('/');
    }

    const post = await prisma.post.create({
      data: {
        content,
        postImage,
        authorId: currentUser.id,
      },
    });

    if (!post) {
      throw new Error('Post not created');
    }

    if (postImage) {
      await prisma.profile.update({
        where: {
          userId: currentUser.id,
        },
        data: {
          photos: {
            push: postImage,
          },
        },
      });
    }

    return NextResponse.json(post)

  } catch (error) {
    // if error, return error
    console.log(error);
    return NextResponse.error();
  }
}
