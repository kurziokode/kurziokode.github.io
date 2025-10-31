
import React from 'react';
import { ViewType } from '../../types';
import { Icon } from '../ui/Icon';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const NavItem: React.FC<{
  view: ViewType;
  label: string;
  iconName: string;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}> = ({ view, label, iconName, currentView, setView }) => {
  const isActive = currentView === view;
  return (
    <li
      onClick={() => setView(view)}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-blue-500 text-white shadow-lg'
          : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
      }`}
    >
      <Icon name={iconName} className="w-6 h-6 mr-3" />
      <span className="font-semibold">{label}</span>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 bg-white shadow-xl h-screen p-4 flex flex-col fixed">
      <div className="text-2xl font-bold text-blue-600 mb-8 flex items-center">
        <span className="text-3xl mr-2">🤸</span>
        FitClass
      </div>
      <nav>
        <ul>
          <NavItem view="dashboard" label="Dashboard" iconName="dashboard" currentView={currentView} setView={setView} />
          <NavItem view="classes" label="Classes" iconName="classes" currentView={currentView} setView={setView} />
          <NavItem view="activities" label="Activities" iconName="activities" currentView={currentView} setView={setView} />
          <NavItem view="reports" label="Reports" iconName="reports" currentView={currentView} setView={setView} />
          <NavItem view="tools" label="Tools" iconName="tools" currentView={currentView} setView={setView} />
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-blue-50 rounded-lg text-center">
        <h4 className="font-bold text-blue-800">Need a quick tip?</h4>
        <p className="text-sm text-blue-600 mt-1">AI can help you plan your next amazing class!</p>
      </div>
    </aside>
  );
};
