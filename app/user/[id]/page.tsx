import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";

interface IParams {
  id?: string;
}

const UserPage = async ({ params }: { params: IParams}) => {
  // get profile by id
  const profile = await getUserById(params);

  // get current user
  const currentUser = await getCurrentUser();

  if (!profile || !profile.profile) {
    throw new Error('Profile not found');
  }

  if (!currentUser) {
    redirect('/');
  }

  return (
    <ProfileClient profile={profile} currentUser={currentUser} />
  );
};

export default UserPage;
