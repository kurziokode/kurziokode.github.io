
import React, { useState } from 'react';
import { ViewType, Student, Class, Activity, PerformanceRecord, BehaviorLog, PlaylistItem } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { SAMPLE_STUDENTS, SAMPLE_CLASSES, SAMPLE_ACTIVITIES, SAMPLE_PERFORMANCE, SAMPLE_BEHAVIOR, SAMPLE_PLAYLIST } from './constants';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { ClassesView } from './components/views/ClassesView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { ReportsView } from './components/views/ReportsView';
import { ToolsView } from './components/views/ToolsView';
import { Chatbot } from './components/Chatbot';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  
  const [students, setStudents] = useLocalStorage<Student[]>('fitclass_students', SAMPLE_STUDENTS);
  const [classes, setClasses] = useLocalStorage<Class[]>('fitclass_classes', SAMPLE_CLASSES);
  const [activities, setActivities] = useLocalStorage<Activity[]>('fitclass_activities', SAMPLE_ACTIVITIES);
  const [performance, setPerformance] = useLocalStorage<PerformanceRecord[]>('fitclass_performance', SAMPLE_PERFORMANCE);
  const [behavior, setBehavior] = useLocalStorage<BehaviorLog[]>('fitclass_behavior', SAMPLE_BEHAVIOR);
  const [playlist, setPlaylist] = useLocalStorage<PlaylistItem[]>('fitclass_playlist', SAMPLE_PLAYLIST);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardView students={students} classes={classes} />;
      case 'classes':
        return <ClassesView students={students} setStudents={setStudents} classes={classes} setClasses={setClasses} />;
      case 'activities':
        return <ActivitiesView activities={activities} setActivities={setActivities} />;
      case 'reports':
        return <ReportsView students={students} classes={classes} performance={performance} behavior={behavior} />;
      case 'tools':
        return <ToolsView students={students} classes={classes} playlist={playlist} setPlaylist={setPlaylist} />;
      default:
        return <DashboardView students={students} classes={classes} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 ml-64">
        <Header currentView={view} />
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
            {renderView()}
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default App;