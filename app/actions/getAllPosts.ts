import prisma from "../lib/dbConnect";
import getCurrentUser from "./getCurrentUser";
import sanitizePosts from "../lib/sanitizePosts";

// get posts of the current user and their friends
const getAllPosts = async () => {
  try {
    // get current user
    const currentUser = await getCurrentUser();
    
    // if no user found, throw error
    if (!currentUser) {
      throw new Error('No user found');
    }

    // create an array of user's friends
    const userIds = currentUser.friendsIds;

    // include the current user
    userIds.push(currentUser.id);
    
    // fetch the posts of the user and all their friends, newest first
    const allPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: userIds, // look for posts authored by the user or their friends
        },
      },
      orderBy: {
        createdAt: 'desc', // sort by newest first
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

    // if no posts found, throw error
    if (!allPosts) {
      throw new Error('No posts found');
    }

    // sanitize posts (see app/lib/sanitizePosts.ts)
    const safePosts = sanitizePosts(allPosts);
    
    // return sanitized posts to client
    return safePosts;

  } catch (error) {
    // if error, log error and return null
    console.error(error);
    return null;
  }
};

export default getAllPosts;
