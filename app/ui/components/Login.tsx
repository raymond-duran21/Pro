'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { toast } from 'react-toastify';

const Login = () =>
 {
    const [errors, setErrors] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { refresh } = useRouter();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
    
        const responseNextAuth = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });


        if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        toast.error("Contraseña o Correo incorrecto.");
        console.log(errors[0]);
        return;
        }
      
        toast.success("Bienvenido");
        setTimeout(() => {router.push("/dashboard")},2000);
        
    };


    return (
        <div className="container mx-auto mt-60 ">
        <form onSubmit={handleSubmit} className=" max-w-md mx-auto p-8 bg-gray-100 rounded-2xl shadow-xl">
             <img src='/logo.png' alt="Logo MIVED" className=' w-28 relative mx-auto'/>
             <h1 className=' relative text-xl font-bold text-center mb-3'>
                Inventario TIC
             </h1>
            <label className="block mb-4">
                Correo institucional
            <input type="email" value={email} 
            placeholder='nombre.apellido@mived.gob.do' 
            onChange={(e) => setEmail(e.target.value)} 
            className='w-full p-2 border rounded my-1'/>
            </label>
            <label className="block mb-5">
                Contraseña:
            <input type="password" 
            placeholder='*********' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-2 border rounded my-1'/>
            </label>
            <button type='submit' 
            className=' relative bg-blue-500 text-white p-2 rounded hover:shadow-lg hover:bg-blue-600'>
                Iniciar Sesión
            </button>
        </form>
        </div>
    );
};

export default Login;