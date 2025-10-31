
import React from 'react';
import { ViewType } from '../../types';

interface HeaderProps {
    currentView: ViewType;
}

const viewTitles: Record<ViewType, string> = {
    dashboard: 'Dashboard Overview',
    classes: 'Class & Student Management',
    activities: 'Activity & Game Generator',
    reports: 'Performance Reports',
    tools: 'Teacher Tools',
    settings: 'Settings'
};

export const Header: React.FC<HeaderProps> = ({ currentView }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{viewTitles[currentView]}</h1>
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer">
                    <img src="https://picsum.photos/seed/teacher/100" alt="Teacher" className="w-full h-full rounded-full object-cover" />
                </div>
            </div>
        </header>
    );
};
