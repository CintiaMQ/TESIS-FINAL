import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/userContext';
import { jsPDF } from 'jspdf';
import VideosDashboard from './VideosDashboard'; // Asegúrate de que la ruta es correcta

interface Resultado {
    email: string;
    puntuaciones: { [carrera: string]: number };
    resultado: string[];
    fecha: string;
}

const ResultadoDashboard: React.FC = () => {
    const { user } = useUser();
    const [resultados, setResultados] = useState<Resultado[]>([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchResultados();
        }
    }, [user?.email]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Resultados del Test Vocacional", 20, 20);
        resultados.forEach((resultado, index) => {
            doc.text(`Resultado ${index + 1}`, 20, 30 + index * 10);
            doc.text(`Fecha: ${new Date(resultado.fecha).toLocaleString()}`, 20, 40 + index * 10);
            doc.text("Carreras sugeridas:", 20, 50 + index * 10);
            resultado.resultado.forEach((carrera, i) => {
                doc.text(`${i + 1}. ${carrera}`, 30, 60 + index * 10 + i * 5);
            });
        });
        doc.save("resultados_test_vocacional.pdf");
    };

    if (loading) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    const carrerasSugeridas = resultados.flatMap(resultado => resultado.resultado) || [];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Resultados del Test Vocacional</h2>
            {user && (
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold">Usuario: {user.name} {user.surname}</h3>
                    <p className="text-gray-600">Email: {user.email}</p>
                </div>
            )}
            {resultados.length === 0 ? (
                <div className="text-center text-gray-500">No se encontraron resultados</div>
            ) : (
                <>
                    <button 
                        onClick={downloadPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition duration-300"
                    >
                        Descargar PDF
                    </button>
                    <ul className="space-y-6">
                        {resultados.map((resultado, index) => (
                            <li key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-4">Resultado {index + 1}</h3>
                                <p className="text-gray-700 mb-4">Fecha: {new Date(resultado.fecha).toLocaleString()}</p>
                                <h4 className="text-xl font-medium mb-2">Carreras sugeridas:</h4>
                                <ul className="list-disc list-inside mb-4">
                                    {resultado.resultado.map((carrera, i) => (
                                        <li key={i} className="text-lg">{carrera}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <VideosDashboard carreras={carrerasSugeridas} />
                </>
            )}
        </div>
    );
};

export default ResultadoDashboard;
