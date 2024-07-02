import React from 'react';

interface Opcion {
    texto: string;
    valor: number;
}

interface PreguntaProps {
    pregunta: {
        _id: string;
        texto: string;
        opciones: Opcion[];
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Pregunta: React.FC<PreguntaProps> = ({ pregunta, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">{pregunta.texto}</h2>
            <div className="space-y-4">
                {pregunta.opciones.map(opcion => (
                    <label key={opcion.valor} className="block">
                        <input
                            type="radio"
                            name="respuesta"
                            value={opcion.valor}
                            onChange={onChange}
                            className="mr-2"
                        />
                        {opcion.texto}
                    </label>
                ))}
            </div>
            <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                Siguiente
            </button>
        </form>
    );
};

export default Pregunta;
