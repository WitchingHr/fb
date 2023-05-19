import prisma from "../lib/dbConnect";
import { DateTime } from "luxon";

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
            author: {
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
            author: {
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

    // sort and sanitize post data
    const safePosts = posts.map((post) => {
      // destructure post
      const { createdAt, comments, likes, author, authorId, ...otherProps } = post;

      // post author
      const postAuthor = {
        id: author.id,
        name: author.name,
        image: author.profile?.image,
      };
    
      // post comments
      const safeComments = comments.map((comment) => {
        const { createdAt, authorId, author, ...otherCommentProps } = comment;

        const commentAuthor = {
          id: author.id,
          name: author.name,
          image: author.profile?.image,
        };

        return {
          ...otherCommentProps,
          author: commentAuthor,
          createdAt: DateTime.fromJSDate(createdAt).toLocaleString(DateTime.DATETIME_MED),
        };
      });

      // post likes
      const safeLikes = likes.map((like) => {
        const { author } = like;

        const likeAuthor = {
          id: author.id,
          name: author.name,
          image: author.profile?.image,
        };

        return {
          author: likeAuthor,
        };
      });
    
      return {
        ...otherProps,
        author: postAuthor,
        createdAt: DateTime.fromJSDate(createdAt).toLocaleString(DateTime.DATETIME_MED),
        comments: safeComments,
        likes: safeLikes,
      };
    });
    
    return safePosts;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getPosts;
