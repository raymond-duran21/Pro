import Navbar from '../ui/components/Navbar'
import Sidebar from '../ui/components/Sidebar/Sidebar'



export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex h-screen w-full bg-sidebar-background'>
        <div className='flex flex-col w-full ml-64 p-4'>
        </div>
        <div>
        <Sidebar/>
        {children}
        </div>
        <div>
        <Navbar/>
        </div>
        </div>
    )
  }