import prisma from "../lib/dbConnect";
import { DateTime } from "luxon";
import getCurrentUser from "./getCurrentUser";

// get all posts
const getAllPosts = async () => {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      throw new Error('No user found');
    }

    // create an array of user ids to fetch posts for
    const userIds = currentUser.friendsIds;

    // include the current user's id
    userIds.push(currentUser.id);
    
    // Fetch the posts of the user and all their friends, sorted by `createdAt`
    const allPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: userIds, // look for posts authored by the user or their friends
        },
      },
      orderBy: {
        createdAt: 'desc', // sort by createdAt in descending order
      },
      take: 25, // limit to 25 posts
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
    const safePosts = allPosts.map((post) => {
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
};

export default getAllPosts;
