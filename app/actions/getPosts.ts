import prisma from "../lib/dbConnect";

// get posts by user
const getPosts = async (id: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        author: {
          select: {
            name: true,
            profile: {
              select: {
                image: true
              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                profile: {
                  select: {
                    image: true
                  }
                }
              }
            }
          }
        },
      },
    });

    const SafePosts = posts.map((post) => {
      const { createdAt, ...Post } = post;

      const SafePost = {
        ...Post,
        createdAt: createdAt.toISOString(),
      }

      return SafePost;
    });

    console.log(SafePosts)

    return SafePosts;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getPosts;
