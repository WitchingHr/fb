import prisma from "../lib/dbConnect";
import sanitizePosts from "../lib/sanitizePosts";

// get posts by user id
const getPosts = async (id: string) => {
  try {
    // fetch posts, newest first
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // limit to 10 posts
      include: {
        author: { // post author
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                image: true
              },
            },
          },
        },
        likes: { // post likes
          select: {
            author: { // like author
              select: {
                id: true,
                name: true,
                profile: {
                  select: {
                    image: true
                  },
                },
              },
            },
          },
        },
        comments: { // post comments
          include: {
            author: { // comment author
              select: {
                id: true,
                name: true,
                profile: {
                  select: {
                    image: true
                  },
                },
              },
            },
          }
        },
      },
    });

    // if no posts, return null
    if (!posts) {
      return null;
    }

    // sanitize posts (see app/lib/sanitizePosts.ts)
    const safePosts = sanitizePosts(posts);
    
    // return sanitized posts to client
    return safePosts;
    
  } catch (error) {
    // if error, log and return null
    console.error(error);
    return null;
  }
}

export default getPosts;
