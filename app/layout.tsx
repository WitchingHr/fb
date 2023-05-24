import { Toaster } from 'react-hot-toast';
import SignupModal from './components/modals/SignupModal';
import './globals.css'
import { Roboto } from 'next/font/google'
import PostModal from './components/modals/PostModal';
import UserProvider from './providers/UserProvider';
import ThemeModal from './components/modals/ThemeModal';
import ProfileModal from './components/modals/ProfileModal';
import CoverModal from './components/modals/CoverModal';
import AvatarModal from './components/modals/AvatarModal';


const font = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: 'FB',
  description: 'The social network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`dark:bg-[#18191a] ` + font.className}>
        <Toaster />
        <SignupModal />
        <PostModal  />
        <ThemeModal />
        <ProfileModal />
        <CoverModal />
        <AvatarModal />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
