import React, { Fragment } from 'react';
import { IoSpeedometerSharp } from "react-icons/io5";
import TituloSection from "../../ui/TituloSection";

const InicioDashboard = () => {
  return (
    <Fragment>
      <TituloSection
        icon={<IoSpeedometerSharp size={32} />}
        label='Dashboard'
      />
      
      <div className='mt-8'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Descubre tu Vocación</h2>
      
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex flex-col items-center'>
            <img src='https://degreeers.com/wp-content/uploads/2021/11/test-vocacional.png' alt='Motivational' className='rounded-lg shadow-md mb-4' />
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>Encuentra tu Pasión</h3>
            <p className='text-gray-600 text-center'>
              Descubre las actividades y campos que realmente te apasionan.
              Conocer tus intereses es el primer paso para una carrera satisfactoria.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <img src='https://degreeers.com/wp-content/uploads/2021/11/test-vocacional.png' alt='Success' className='rounded-lg shadow-md mb-4' />
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>Alcanza el Éxito</h3>
            <p className='text-gray-600 text-center'>
              Encuentra la carrera que mejor se adapte a tus habilidades y personalidad.
              Tu éxito comienza con la elección correcta.
            </p>
          </div>
        </div>

        <div className='mt-12 p-6 bg-gray-100 rounded-lg shadow-inner'>
          <h3 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>¿Por qué hacer un test vocacional?</h3>
          <ul className='list-disc list-inside text-gray-600 text-lg'>
            <li className='mb-2'>Identifica tus fortalezas y áreas de mejora.</li>
            <li className='mb-2'>Descubre nuevas carreras y oportunidades.</li>
            <li className='mb-2'>Recibe orientación personalizada para tu futuro.</li>
            <li className='mb-2'>Reduce el riesgo de elegir una carrera equivocada.</li>
          </ul>
        </div>

        <div className='mt-12 text-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg'>
            Comenzar Test
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default InicioDashboard;
