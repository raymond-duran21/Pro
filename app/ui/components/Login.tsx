'use client'
import {useState} from 'react';
import { LucideIcon, LucideUser } from 'lucide-react';

const Login = () =>
 {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
    };

    iconUsuario: LucideUser;
    return (
        <div className="container mx-auto mt-60 ">
        <form onSubmit={handleSubmit} className=" max-w-md mx-auto p-8 bg-gray-100 rounded-2xl shadow-xl">
             <img src='/logo.png' alt="Logo MIVED" className=' w-28 relative mx-auto'/>
             <h1 className=' relative text-xl font-bold text-center mb-3'>
                Inventario TIC
             </h1>
            <label className="block mb-4">
                Correo institucional
            <input type="email" value={username} placeholder='nombre.apellido@mived.gob.do' onChange={(e) => setUsername(e.target.value)} className='w-full p-2 border rounded my-1'/>
            </label>
            <label className="block mb-5">
                Contraseña:
            <input type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border rounded my-1'/>
            </label>
            <button type='submit' className=' relative bg-blue-500 text-white p-2 rounded hover:shadow-lg hover:bg-blue-600'>
                Iniciar Sesión
            </button>
        </form>
        </div>
    );
};

export default Login;