import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';

interface Resultado {
    email: string;
    puntuaciones: Record<string, number>;
    resultado: string[];
    fecha: string;
}

const ResultadosObtenidos: React.FC = () => {
    const [resultados, setResultados] = useState<Resultado[]>([]);
    const { user } = useUser(); // Obtener el usuario del contexto

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/test/resultados/${user?.email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setResultados(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };
        if (user?.email) {
            fetchResultados();
        }
    }, [user]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Resultados Obtenidos</h2>
            {resultados.length > 0 ? (
                resultados.map((resultado, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-xl font-semibold">Resultado del {new Date(resultado.fecha).toLocaleDateString()}</h3>
                        <ul className="list-disc list-inside mt-2">
                            {resultado.resultado.map((carrera, i) => (
                                <li key={i} className="text-lg">
                                    {carrera}: {resultado.puntuaciones[carrera]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No se han encontrado resultados previos.</p>
            )}
        </div>
    );
};

export default ResultadosObtenidos;
