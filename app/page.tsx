import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import LoginClient from "./login/LoginClient";
import HomeClient from "./home/HomeClient";
import getPosts from "./actions/getPosts";

// Home page
export default async function Home() {
  // get current user
  const currentUser = await getCurrentUser();

  if (!currentUser) return (
    <Container>
      <LoginClient />
    </Container>
  );

  // get posts
  const posts = await getPosts(currentUser.id);
  
  return (
    <HomeClient currentUser={currentUser} posts={posts} />
  );
}
