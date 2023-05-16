import getCurrentUser from "./actions/getCurrentUser";

import LoginClient from "./LoginClient";
import Container from "./components/Container";
import HomeClient from "./HomeClient";

export default async function Home() {
  // get current user
  const currentUser = await getCurrentUser();
  
  console.log(currentUser);

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
