import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/dbConnect';

// create new post
export async function POST(req: Request) {
  try {
    // get data from request body
    const { content, postImage } = await req.json();

    // get current user
    const currentUser = await getCurrentUser();

    // if user not logged in, redirect to home page
    if (!currentUser) {
      return NextResponse.redirect('/');
    }

    // create new post
    const post = await prisma.post.create({
      data: {
        content,
        postImage,
        authorId: currentUser.id,
      },
    });

    // if error creating post
    if (!post) {
      throw new Error('Error creating post');
    }

    // if post has image, add image to profile
    if (postImage) {
      const image = await prisma.profile.update({
        where: {
          userId: currentUser.id,
        },
        data: {
          photos: {
            push: postImage,
          },
        },
      });

      // if error adding image to profile
      if (!image) {
        throw new Error('Error adding image to profile');
      }
    }

    return NextResponse.json(post)

  } catch (error: any) {
    // if error, return error
    console.error(error);
  }
}
