import React, { useEffect, useState } from 'react';

interface VideosDashboardProps {
    carreras: string[];
}

const VideosDashboard: React.FC<VideosDashboardProps> = ({ carreras = [] }) => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            if (carreras.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const carreraQueries = carreras.join('|');
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${carreraQueries}&type=video&key=AIzaSyDWvKyXARcrbfM1ohpjyvXBsuqdbNqeFAk`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setVideos(data.items);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Error fetching videos. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [carreras]);

    if (loading) {
        return <div className="text-center py-10">Cargando videos...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Videos Dashboard</h3>
            {videos.length === 0 ? (
                <div className="text-center text-gray-500">No se encontraron videos</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                            <h4 className="text-lg font-semibold mb-2">{video.snippet.title}</h4>
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-auto mb-4" />
                            <p className="text-gray-700">{video.snippet.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideosDashboard;
