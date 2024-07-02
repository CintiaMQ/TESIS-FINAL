import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';

interface Resultado {
    email: string;
    puntuaciones: Record<string, number>;
    resultado: string[];
    fecha: string;
}

const ResultadosObtenidos = () => {
    const [resultados, setResultados] = useState<Resultado[]>([]);
    const { user } = useUser(); // Obtener el usuario del contexto

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/resultados/${user?.email}`);
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
        <div>
            <h2>Resultados Obtenidos</h2>
            {resultados.length > 0 ? (
                resultados.map((resultado, index) => (
                    <div key={index}>
                        <h3>Resultado del {new Date(resultado.fecha).toLocaleDateString()}</h3>
                        <ul>
                            {resultado.resultado.map((carrera, i) => (
                                <li key={i}>{carrera}: {resultado.puntuaciones[carrera]}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No se han encontrado resultados previos.</p>
            )}
        </div>
    );
};

export default ResultadosObtenidos;
