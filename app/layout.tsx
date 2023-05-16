import { Toaster } from 'react-hot-toast';
import SignupModal from './components/modals/SignupModal';
import './globals.css'
import { Roboto } from 'next/font/google'

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
      <body className={font.className}>
        <Toaster />
        <SignupModal />
        {children}
      </body>
    </html>
  );
}
