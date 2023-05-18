import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/dbConnect';
import { NextResponse } from 'next/server';

// create new post
export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.redirect('/');
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId: currentUser.id,
      },
    });

    if (!post) {
      throw new Error('Post not created');
    }

    return NextResponse.json(post)

  } catch (error) {
    // if error, return error
    return NextResponse.error();
  }
}
