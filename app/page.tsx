import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import LoginClient from "./LoginClient";
import HomeClient from "./HomeClient";

// Root page
// if user is logged in, show home page
// if user is not logged in, show login page
export default async function Home() {
  // get current user
  const currentUser = await getCurrentUser();
  
  return (
    <Container>
      {currentUser ? (
        <HomeClient currentUser={currentUser} />
      ) : (
        <LoginClient />
      )}
    </Container>
  );
}
