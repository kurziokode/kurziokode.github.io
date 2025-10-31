
export interface Student {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
  notes: string;
  classId: string;
}

export interface Class {
  id: string;
  name: string;
  grade: number;
}

export enum SkillCategory {
  Strength = "Strength",
  Endurance = "Endurance",
  Coordination = "Coordination",
  Flexibility = "Flexibility",
  Teamwork = "Teamwork",
}

export enum BehaviorType {
  Positive = "Positive",
  Challenge = "Challenge",
}

export interface PerformanceRecord {
  id: string;
  studentId: string;
  date: string; // ISO string
  skill: SkillCategory;
  score: number; // e.g., 1-5 or a specific metric
  notes?: string;
}

export interface BehaviorLog {
  id: string;
  studentId: string;
  date: string; // ISO string
  type: BehaviorType;
  description: string;
  emoji: string;
}

export interface Activity {
  id: string;
  name:string;
  description: string;
  ageGroup: string;
  equipment: string[];
  goal: SkillCategory[];
  isCustom?: boolean;
}

export interface Lesson {
  id: string;
  date: string; // ISO string
  classId: string;
  activityIds: string[];
  notes: string;
}

export interface ParentMessage {
  id: string;
  studentId: string;
  from: 'teacher' | 'parent';
  text: string;
  timestamp: string; // ISO string
}

export interface PlaylistItem {
  id: string;
  title: string;
  url: string;
  videoId: string;
}

export type ViewType = 'dashboard' | 'classes' | 'activities' | 'reports' | 'tools' | 'settings';