import prisma from '@/app/lib/dbConnect';
import getCurrentUser from './getCurrentUser';

// get suggested friends
const getSuggestedFriends = async () => {
  try {
    // get the current user
    const user = await getCurrentUser();

    // if no user is found, throw an error
    if (!user) {
      throw new Error('No user found');
    }

    // get all users that are not the current user or their friends
    const allOtherUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: user.friendsIds,
          not: user.id,
        },
      },
      select: {
        id: true,
      }
    });

    // create an array of all other users' ids
    const allOtherUsersIds = allOtherUsers.map((user) => user.id);

    // shuffle the array of ids and select the first 5
    const randomUserIds = fisherYatesShuffle(allOtherUsersIds).slice(0, 5);

    // fetch the 5 random users
    const suggested = await prisma.user.findMany({
      where: {
        id: {
          in: randomUserIds,
        },
      },
      select: {
        id: true,
        name: true,
        profile: {
          select: {
            image: true,
          },
        },
      },
    });

    // add the image to the suggested friends
    const suggestedFriends = suggested.map((friend) => {
      const { profile, ...friendInfo } = friend;

      return {
        ...friendInfo,
        image: profile?.image,
      }
    });

    // return the suggested friends
    return suggestedFriends;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSuggestedFriends;

function fisherYatesShuffle(array: string[]) {
  let count = array.length;

  // While there are elements in the array
  while (count) {
    // Pick a random index
    let index = Math.floor(Math.random() * count--);

    // Swap the last element with it
    let temp = array[count];
    array[count] = array[index];
    array[index] = temp;
  }

  return array;
}
