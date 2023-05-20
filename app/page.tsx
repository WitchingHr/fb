import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import LoginClient from "./login/LoginClient";
import HomeClient from "./home/HomeClient";
import getPosts from "./actions/getPosts";
import getAllPosts from "./actions/getAllPosts";

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
  
  return (
    <HomeClient currentUser={currentUser} posts={posts} />
  );
}
