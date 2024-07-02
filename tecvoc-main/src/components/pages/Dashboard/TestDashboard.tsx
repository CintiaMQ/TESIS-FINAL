import React, { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';
import Pregunta from '../../Pregunta/Pregunta';
import { useUser } from '../../../context/userContext';
import { FaMusic, FaVolumeMute } from 'react-icons/fa'; // Importa el ícono de música y el ícono de volumen mute
import pollito from '../../../../public/pollito.gif';
import pollito2 from '../../../../public/pollito2.gif';
import pollito3 from '../../../../public/pollito3.gif';

interface Pregunta {
    _id: string;
    id: number;
    texto: string;
    opciones: { texto: string; valor: number }[];
}

interface Respuesta {
    preguntaId: string;
    valor: number;
}

const TestDashboard = () => {
    const [iniciarTest, setIniciarTest] = useState(false);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [indexActual, setIndexActual] = useState(0);
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [resultado, setResultado] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentGifIndex, setCurrentGifIndex] = useState(0);
    const { user } = useUser();
    const audioRef = useRef<HTMLAudioElement>(null);

    const gifs = [pollito, pollito2, pollito3];

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/test/preguntas');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPreguntas(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchPreguntas();
    }, []);

    useEffect(() => {
        if ((indexActual + 1) % 2 === 0 && indexActual !== 0) {
            setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000); // El popup desaparecerá después de 3 segundos
        }
    }, [indexActual]);

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valor = parseInt(event.target.value, 10);
        setRespuestas(current => [
            ...current.filter(resp => resp.preguntaId !== preguntas[indexActual].id.toString()),
            { preguntaId: preguntas[indexActual].id.toString(), valor }
        ]);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (indexActual < preguntas.length - 1) {
            setIndexActual(current => current + 1);
        } else {
            console.log('Respuestas a enviar:', respuestas);
            console.log('Email a enviar:', user?.email);
            try {
                const response = await fetch('http://localhost:3000/api/test/resultados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user?.email, respuestas })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Resultado recibido:', data);
                setResultado(data.resultado);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        }
    };

    const handlePlayClick = () => {
        setIniciarTest(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.2; // Ajusta el volumen a un nivel bajo
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const progress = (indexActual / preguntas.length) * 100;

    if (resultado.length > 0) {
        return (
            <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Resultado del Test Vocacional</h2>
                <ul className="list-disc list-inside">
                    {resultado.map((carrera, index) => (
                        <li key={index} className="text-lg">{carrera}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-500 relative">
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <img src={gifs[currentGifIndex]} alt="GIF" className="w-32 h-32 mx-auto mb-4" />
                        <p className="text-lg font-semibold">¡Buen trabajo!</p>
                    </div>
                </div>
            )}
            <div className="absolute top-4 right-4">
                <button onClick={toggleAudio} className="rounded-full bg-white p-2 shadow-lg">
                    {isPlaying ? <FaVolumeMute className="text-green-500 w-8 h-8" /> : <FaMusic className="text-green-500 w-8 h-8" />}
                </button>
                <audio ref={audioRef} className="hidden">
                    <source src="/audio/Música_para_Podcast_PODSAFE.m4a" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            {!iniciarTest ? (
                <div className="text-center">
                    <button
                        onClick={handlePlayClick}
                        className="bg-white text-blue-500 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
                    >
                        Play
                    </button>
                    <div className="mt-4">
                        <img src={pollito} alt="Descripción de la imagen" className="mx-auto" />
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    {user && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Usuario: {user.name} {user.surname}</h3>
                            <p className="text-gray-600">Email: {user.email}</p>
                        </div>
                    )}
                    {preguntas.length > 0 && (
                        <Pregunta
                            pregunta={preguntas[indexActual]}
                            onChange={handleOptionChange}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TestDashboard;
