import prisma from '@/app/lib/dbConnect';

interface IParams {
  id?: string;
}
// get a user by id
export default async function getUserById(params: IParams) {
  try {
    const { id } = params;
    console.log('id', id);

    // get user from db, include profile and posts
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        profile: true,
        posts: true
      }
    });

    // if user not found, throw error
    if (!user) throw new Error('User not found');

    // return user
    return user;

  } catch (error) {
    console.error(error);
    return null;
  }
}
