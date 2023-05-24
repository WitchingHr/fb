import prisma from '@/app/lib/dbConnect';

// paramsj
interface IParams {
  id?: string;
}
// get a user by id
export default async function getUserById(params: IParams) {
  try {
    // destructure id from params
    const { id } = params;

    // get user from db, include profile, and friends
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        friendOf: { // user's friends
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
        profile: true, // user's profile
      },
    });

    // if user not found, throw error
    if (!user) throw new Error('User not found');

    // destructure friendOf from user
    const { friendOf, ...other } = user;

    // restructure friend objects
    const friends = friendOf.map((friend) => {
      const { profile, ...other } = friend;
      return {
        ...other,
        image: profile?.image,
      };
    });

    // return user with restructured friends
    return {
      ...other,
      friends,
    }

  } catch (error) {
    // if error, log to console and return null
    console.error(error);
    return null;
  }
}
