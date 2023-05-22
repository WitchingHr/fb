import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import LoginClient from "./login/LoginClient";
import HomeClient from "./home/HomeClient";
import getAllPosts from "./actions/getAllPosts";
import getSuggestedFriends from "./actions/getSuggestedFriends";
import getNotifications from "./actions/getNotifications";

// Home page
export default async function Home() {
  // get current user
  const currentUser = await getCurrentUser();

  // if user is not logged in render login page
  if (!currentUser) return (
    <Container>
      <LoginClient />
    </Container>
  );

  // get posts
  const posts = await getAllPosts();

  // get suggested friends
  const suggestedFriends = await getSuggestedFriends();

  // get notifications
  const notifications = await getNotifications();
  
  return (
    <HomeClient
      currentUser={currentUser} 
      posts={posts}
      suggestedFriends={suggestedFriends}
      notifications={notifications}
    />
  );
}
