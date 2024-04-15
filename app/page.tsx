import { toast } from 'react-toastify';
import Login from './ui/components/Login';
import { redirect, useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { handler } from './api/auth/[...nextauth]/route';
export default async function Home () {
  const session = await getServerSession(handler);
  if (session) redirect("/dashboard");

  return (
    <div>
    <Login />
    </div>
  );
};

