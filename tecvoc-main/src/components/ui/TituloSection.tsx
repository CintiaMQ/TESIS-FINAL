// src/components/ui/TituloSection.tsx
import React from 'react';
import { useUser } from '../../context/userContext';

const TituloSection = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => {
  const { user } = useUser(); // Consumir el contexto del usuario

  return (
    <div className='flex gap-2 items-center'>
      <div className='w-11 h-11 flex justify-center items-center bg-[#6A2C70] text-white rounded-md'>
        {icon}
      </div>
      {/* Si el usuario está logueado, mostrar su nombre junto al label */}
      <h2 className='text-2xl font-medium'>{user ? `${user.name} - ${label}` : label}</h2>
    </div>
  );
};

export default TituloSection;
