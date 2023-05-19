import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";
import getPosts from "@/app/actions/getPosts";

interface IParams {
  id?: string;
}

const UserPage = async ({ params }: { params: IParams}) => {
  const { id } = params;

  if (!id) {
    throw new Error('Not found');
  }

  // get profile by id
  const profile = await getUserById(params);

  // get current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/');
  }

  if (!profile) {
    throw new Error('Profile not found');
  }

  // get user posts
  const posts = await getPosts(id);

  if (!currentUser) {
    redirect('/');
  }

  return (
    <ProfileClient profile={profile} currentUser={currentUser} posts={posts} />
  );
};

export default UserPage;
