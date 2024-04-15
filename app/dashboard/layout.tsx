import Sidebar from '../ui/components/Sidebar/Sidebar'


export default function RootLayout({
    children,
  }:  Readonly<{
    children: React.ReactNode
  }>) {
    return (
        <div>
        <div className='flex h-screen w-full bg-sidebar-background'>
          <Sidebar/>
          <div className='flex flex-col w-full p-4 ml-[610px]'>
          {children}
          </div>
        </div>
        </div>
    )
  }