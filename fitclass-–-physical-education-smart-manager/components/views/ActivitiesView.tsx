import React, { useState, useCallback } from 'react';
import { Activity, SkillCategory } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Spinner } from '../ui/Spinner';
import * as geminiService from '../../services/geminiService';
import { SKILL_CATEGORIES, EQUIPMENT_LIST } from '../../constants';
import { generateTextToSpeech } from '../../services/geminiService';
import { decode, decodeAudioData } from '../../utils/audioUtils';

interface ActivitiesViewProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const ActivityCard: React.FC<{ activity: Activity; onSpeak: (text: string) => void }> = ({ activity, onSpeak }) => {
    return (
        <Card className="flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-blue-600">{activity.name}</h3>
              <button onClick={() => onSpeak(activity.description)} className="text-gray-500 hover:text-blue-500">
                <Icon name="speak" />
              </button>
            </div>
            <p className="text-gray-600 my-2 flex-grow">{activity.description}</p>
            <div className="mt-4 space-y-2 text-sm">
                <p><strong>Age Group:</strong> {activity.ageGroup}</p>
                <p><strong>Equipment:</strong> {activity.equipment.join(', ')}</p>
                <p><strong>Goals:</strong> {activity.goal.join(', ')}</p>
            </div>
        </Card>
    );
};

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ activities, setActivities }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [ageGroup, setAgeGroup] = useState('6-8');
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [selectedGoals, setSelectedGoals] = useState<SkillCategory[]>([SkillCategory.Coordination]);
    const [generatedActivities, setGeneratedActivities] = useState<Activity[]>([]);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedActivities([]);
        try {
            const result = await geminiService.generateActivityIdeas(ageGroup, selectedEquipment, selectedGoals);
            if (Array.isArray(result)) {
                setGeneratedActivities(result);
            } else {
                throw new Error("Invalid response format from AI.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to generate activities.");
        } finally {
            setIsLoading(false);
        }
    }, [ageGroup, selectedEquipment, selectedGoals]);

    const toggleSelection = <T,>(list: T[], item: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        if (list.includes(item)) {
            setter(list.filter(i => i !== item));
        } else {
            setter([...list, item]);
        }
    };
    
    const handleSpeak = async (text: string) => {
      try {
        const audioData = await generateTextToSpeech(text);
        if(audioData){
          // FIX: Cast window to `any` to allow access to `webkitAudioContext` for broader browser compatibility, resolving a TypeScript error.
          const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
          const source = outputAudioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(outputAudioContext.destination);
          source.start();
        }
      } catch (error) {
        console.error("TTS Error:", error);
        alert("Could not play audio.");
      }
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Generator</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold">Age Group</label>
                            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="w-full p-2 border rounded mt-1">
                                <option>6-8</option>
                                <option>9-10</option>
                                <option>11-12</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold">Equipment</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {EQUIPMENT_LIST.map(item => (
                                    <button key={item} onClick={() => toggleSelection(selectedEquipment, item, setSelectedEquipment)} className={`px-3 py-1 text-sm rounded-full ${selectedEquipment.includes(item) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{item}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold">Goals</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {SKILL_CATEGORIES.map(item => (
                                    <button key={item} onClick={() => toggleSelection(selectedGoals, item, setSelectedGoals)} className={`px-3 py-1 text-sm rounded-full ${selectedGoals.includes(item) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>{item}</button>
                                ))}
                            </div>
                        </div>
                        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                            {isLoading ? <Spinner /> : '✨ Generate Ideas'}
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-4">
                 {error && <Card className="bg-red-100 text-red-700">{error}</Card>}
                {generatedActivities.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Generated Ideas</h3>
                        {generatedActivities.map((activity, index) => <ActivityCard key={index} activity={activity} onSpeak={handleSpeak} />)}
                    </div>
                )}
                <h3 className="text-xl font-bold mt-6">Saved Activities</h3>
                {activities.map(activity => <ActivityCard key={activity.id} activity={activity} onSpeak={handleSpeak} />)}
            </div>
        </div>
    );
};