import { notFound, redirect } from "next/navigation";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import ProfileClient from "./ProfileClient";
import getPosts from "@/app/actions/getPosts";
import getNotifications from "@/app/actions/getNotifications";

interface IParams {
  id?: string;
}

// fetches user profile and posts and renders profile page
const UserPage = async ({ params }: { params: IParams}) => {
  // get current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/');
  }

  // get id from params
  const { id } = params;

  // if no id, throw error
  if (!id) {
    notFound();
  }

  // get profile by id
  const profile = await getUserById(params);

  // if no profile, redirect to home
  if (!profile) {
    notFound();
  }

  // get user posts
  const posts = await getPosts(id);

  // get notifications
  const notifications = await getNotifications();

  return (
    <ProfileClient
      profile={profile}
      currentUser={currentUser}
      posts={posts}
      notifications={notifications}
    />
  );
};

export default UserPage;
