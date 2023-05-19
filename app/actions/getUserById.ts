import prisma from '@/app/lib/dbConnect';

interface IParams {
  id?: string;
}
// get a user by id
export default async function getUserById(params: IParams) {
  try {
    const { id } = params;

    // get user from db, include profile, and friends
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        friendOf: {
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
        profile: true,
      },
    });

    // if user not found, throw error
    if (!user) throw new Error('User not found');

    const { friendOf, ...other } = user;

    const friends = friendOf.map((friend) => {
      const { profile, ...other } = friend;
      return {
        ...other,
        image: profile?.image,
      };
    });

    // return user
    return {
      ...other,
      friends,
    }

  } catch (error) {
    console.error(error);
    return null;
  }
}
