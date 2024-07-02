import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/userContext';

interface UserState {
    email: string;
    password: string;
    role: 'user' | 'admin';
    name: string;
    surname: string;
    age: string;
    educationLevel: string;
    acceptTerms: boolean;
}

const UserRegister = () => {
    const [userDetails, setUserDetails] = useState<UserState>({
        email: '',
        password: '',
        role: 'user',
        name: '',
        surname: '',
        age: '',
        educationLevel: '',
        acceptTerms: false,
    });
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setUserDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user); // Asegúrate de que esto corresponde a la estructura esperada.
                navigate('/dashboard'); // Navega al dashboard después del registro
            } else {
                throw new Error(data.message || 'Failed to register');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Imagen a la izquierda */}
                <div className="w-full md:w-1/2 bg-cover" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1249620665/es/vector/ilustraci%C3%B3n-vectorial-signo-de-direcci%C3%B3n-en-diferente-destino-elecci%C3%B3n-de-direcciones-viajes.jpg?s=612x612&w=0&k=20&c=tbaotyxGrUrMRgnUeaaHxea0LKL-VWCAX57ScVyAZvk=)' }}></div>
                {/* Formulario a la derecha */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Registro de Usuario</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-gray-600 font-medium mb-2">Correo:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo"
                                    required
                                    value={userDetails.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                <label className="block text-gray-600 font-medium mb-2">Contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    required
                                    value={userDetails.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Rol:</label>
                            <select
                                name="role"
                                value={userDetails.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Psicólogo</option>
                            </select>
                        </div>
                        {userDetails.role === 'user' && (
                            <>
                                <div className="flex flex-col md:flex-row md:space-x-4">
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-gray-600 font-medium mb-2">Nombre:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre"
                                            required
                                            value={userDetails.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                        <label className="block text-gray-600 font-medium mb-2">Apellido:</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            placeholder="Apellido"
                                            required
                                            value={userDetails.surname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:space-x-4">
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-gray-600 font-medium mb-2">Edad:</label>
                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="Edad"
                                            required
                                            value={userDetails.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                        <label className="block text-gray-600 font-medium mb-2">Nivel de Educación:</label>
                                        <input
                                            type="text"
                                            name="educationLevel"
                                            placeholder="Nivel de educación"
                                            required
                                            value={userDetails.educationLevel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={userDetails.acceptTerms}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-600">Aceptar términos y condiciones</label>
                                    <label className="text-gray-600 ">¿Ya tienen cuenta?</label><a href="/Login" className="text-blue-500 hover:underline"> Iniciar Sesion</a>
                                </div>
                            </>
                        )}
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Registrar
                        </button>
                        <div className="text-center mt-4">
                  
                </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
