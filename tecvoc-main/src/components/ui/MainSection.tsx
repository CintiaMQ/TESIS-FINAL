import React, { useState } from 'react';
import { BiMenu, BiLogOut } from 'react-icons/bi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';

interface MainSectionProps {
    asideActivo: boolean;
    setAsideActivo: (asideactivo: boolean) => void;
}

const MainSection = ({ asideActivo, setAsideActivo }: MainSectionProps) => {
    const { user, logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Usamos useNavigate para la redirección

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirigir a la página de login
    };

    return (
        <div>
            {/* barra superior */}
            <div className='w-full border-b h-16 shadow flex items-center justify-between px-4'>
                {/* menu */}
                <button
                    className='flex hover:bg-gray-200 w-10 h-10 justify-center items-center rounded-md'
                    onClick={() => setAsideActivo(!asideActivo)}
                >
                    <BiMenu size={30} />
                </button>
                {/* usuario */}
                <div className='flex items-center relative'>
                    {user && (
                        <span className='ml-2'>{user.name} {user.surname}</span>
                    )}
                    <button
                        className='w-10 h-10 bg-gray-400 flex justify-center items-center text-xl font-medium rounded-full ml-2'
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <BiLogOut size={24} className='text-white' />
                    </button>
                    {menuOpen && (
                        <div className='absolute right-0 mt-12 w-48 bg-white border rounded-md shadow-lg'>
                            <ul className='py-1'>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
                                    Cerrar sesión
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <section className='p-4 pt-8'>
                <Outlet />
            </section>
        </div>
    );
};

export default MainSection;
