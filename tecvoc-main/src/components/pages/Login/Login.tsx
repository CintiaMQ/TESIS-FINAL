import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/userContext'; // Importa tu hook de contexto
import logo from '../../../../public/images/logo.png'; // Importa la imagen del logo

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useUser(); // Usa la función de login del contexto
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                login(data.user); // Actualiza el contexto con los datos del usuario
                navigate('/dashboard');
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Imagen a la izquierda */}
                <div className="w-full md:w-1/2 bg-cover" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1249620665/es/vector/ilustraci%C3%B3n-vectorial-signo-de-direcci%C3%B3n-en-diferente-destino-elecci%C3%B3n-de-direcciones-viajes.jpg?s=612x612&w=0&k=20&c=tbaotyxGrUrMRgnUeaaHxea0LKL-VWCAX57ScVyAZvk=)' }}></div>
                {/* Formulario a la derecha */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-center mb-4">
                        <img src={logo} alt="Tecvoc Logo" className="h-16" />
                    </div>
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
                    <div className="text-center mb-4">
                        <button className="w-full py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" className="inline h-6 mr-2" />
                            Inicia sesión con Google
                        </button>
                    </div>
                    <div className="text-center mb-4">
                        <span className="text-gray-500">o inicia sesión con</span>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Correo:</label>
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                                <span className="ml-2 text-gray-600">Recuerda este dispositivo</span>
                            </label>
                            <a href="/forgot-password" className="text-blue-500 hover:underline">¿Has olvidado tu contraseña?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <a href="/register" className="text-blue-500 hover:underline">Crea una cuenta</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
