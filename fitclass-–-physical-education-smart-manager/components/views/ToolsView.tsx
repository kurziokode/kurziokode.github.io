
import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Student, Class, PlaylistItem } from '../../types';
import { Icon } from '../ui/Icon';
import { generateId, extractYouTubeId } from '../../utils/helpers';

const Timer: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, time]);

    const formatTime = (timeInMs: number) => {
        const minutes = (`0${Math.floor((timeInMs / 60000) % 60)}`).slice(-2);
        const seconds = (`0${Math.floor((timeInMs / 1000) % 60)}`).slice(-2);
        const milliseconds = (`0${(timeInMs / 10) % 100}`).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Timer / Stopwatch</h3>
            <div className="text-5xl font-mono text-center my-4">{formatTime(time)}</div>
            <div className="flex justify-center space-x-4">
                <Button onClick={() => setIsActive(!isActive)}>{isActive ? 'Pause' : 'Start'}</Button>
                <Button onClick={() => { setTime(0); setIsActive(false); }} variant="secondary">Reset</Button>
            </div>
        </Card>
    );
};


const TeamGenerator: React.FC<{ students: Student[], classes: Class[] }> = ({ students, classes }) => {
    const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
    const [numTeams, setNumTeams] = useState(2);
    const [teams, setTeams] = useState<Student[][]>([]);

    const studentsInClass = useMemo(() => students.filter(s => s.classId === selectedClassId), [students, selectedClassId]);

    const generateTeams = () => {
        const shuffled = [...studentsInClass].sort(() => 0.5 - Math.random());
        const newTeams: Student[][] = Array.from({ length: numTeams }, () => []);
        shuffled.forEach((student, index) => {
            newTeams[index % numTeams].push(student);
        });
        setTeams(newTeams);
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Random Team Generator</h3>
            <div className="flex items-end space-x-4 mb-4">
                <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700">Class</label>
                    <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="w-full p-2 border rounded mt-1">
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Teams</label>
                    <input type="number" value={numTeams} onChange={e => setNumTeams(Math.max(2, parseInt(e.target.value)))} min="2" className="w-24 p-2 border rounded mt-1" />
                </div>
                <Button onClick={generateTeams}>Generate</Button>
            </div>
            {teams.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {teams.map((team, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">Team {index + 1}</h4>
                            <ul>
                                {team.map(student => <li key={student.id}>{student.name}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

const MusicPlayer: React.FC<{
    playlist: PlaylistItem[];
    setPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem[]>>;
}> = ({ playlist, setPlaylist }) => {
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(playlist[0]?.videoId || null);
    const [newUrl, setNewUrl] = useState('');
    const [error, setError] = useState('');

    const handleAddSong = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const videoId = extractYouTubeId(newUrl);
        if (videoId) {
            const newSong: PlaylistItem = {
                id: generateId(),
                title: `Song ${playlist.length + 1}`, // Placeholder title, client-side title fetching is complex due to CORS
                url: newUrl,
                videoId: videoId,
            };
            setPlaylist(prev => [...prev, newSong]);
            if (!currentVideoId) {
                setCurrentVideoId(videoId);
            }
            setNewUrl('');
        } else {
            setError('Invalid YouTube URL. Please check and try again.');
        }
    };

    const handleDeleteSong = (id: string) => {
        setPlaylist(prev => prev.filter(item => item.id !== id));
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Warm-up Music Playlist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    {currentVideoId ? (
                        <div className="aspect-video">
                           <iframe
                                src={`https://www.youtube.com/embed/${currentVideoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
                            <p className="text-gray-500">Select a song to play</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mb-4">
                        {playlist.length > 0 ? playlist.map(item => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg group">
                                <button
                                    onClick={() => setCurrentVideoId(item.videoId)}
                                    className="text-left flex-grow hover:text-blue-600"
                                >
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-xs text-gray-500 truncate">{item.url}</p>
                                </button>
                                <button onClick={() => handleDeleteSong(item.id)} className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon name="delete" className="w-5 h-5" />
                                </button>
                            </div>
                        )) : <p className="text-gray-500 text-sm">No songs in your playlist yet.</p>}
                    </div>
                    <form onSubmit={handleAddSong}>
                        <label className="block text-sm font-medium text-gray-700">Add YouTube URL</label>
                        <div className="flex mt-1">
                            <input
                                type="url"
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                required
                                className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <Button type="submit" className="rounded-l-none"><Icon name="add" className="w-5 h-5"/></Button>
                        </div>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </form>
                </div>
            </div>
        </Card>
    );
};

export const ToolsView: React.FC<{ 
    students: Student[], 
    classes: Class[],
    playlist: PlaylistItem[],
    setPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem[]>>;
}> = ({ students, classes, playlist, setPlaylist }) => {
    return (
        <div className="p-6 space-y-6">
            <Timer />
            <TeamGenerator students={students} classes={classes} />
            <MusicPlayer playlist={playlist} setPlaylist={setPlaylist} />
        </div>
    );
};