import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { handler } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SignOutOverlay from './ui/components/SignOutOverlay'
import { SessionAuthProvider } from '@/context/SessionAuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: '/logo.png' ,
  title: 'AppTICMived',
  description: 'App Inventario Tecnologia',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(handler);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='container'>
        <SessionAuthProvider session={session}>
          <ToastContainer />
            <SignOutOverlay />
              {children}
            </SessionAuthProvider>
        </main>
      </body>
    </html>
  )
}
