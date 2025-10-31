
import { Student, Class, SkillCategory, Activity, BehaviorLog, PerformanceRecord, BehaviorType, PlaylistItem } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  SkillCategory.Strength,
  SkillCategory.Endurance,
  SkillCategory.Coordination,
  SkillCategory.Flexibility,
  SkillCategory.Teamwork,
];

export const EQUIPMENT_LIST: string[] = ["Balls", "Cones", "Jump Ropes", "Hula Hoops", "Mats", "Beanbags", "Parachute"];

export const SAMPLE_CLASSES: Class[] = [
  { id: 'c1', name: 'Grade 1 Dragons', grade: 1 },
  { id: 'c2', name: 'Grade 2 Tigers', grade: 2 },
  { id: 'c3', name: 'Grade 3 Eagles', grade: 3 },
];

export const SAMPLE_STUDENTS: Student[] = [
  { id: 's1', name: 'Alex Johnson', age: 6, photoUrl: 'https://picsum.photos/seed/alex/100', notes: 'Great runner, needs to work on teamwork.', classId: 'c1' },
  { id: 's2', name: 'Bella Smith', age: 7, photoUrl: 'https://picsum.photos/seed/bella/100', notes: 'Excellent team player.', classId: 'c1' },
  { id: 's3', name: 'Charlie Brown', age: 8, photoUrl: 'https://picsum.photos/seed/charlie/100', notes: 'Very flexible, strong coordination.', classId: 'c2' },
  { id: 's4', name: 'Diana Prince', age: 8, photoUrl: 'https://picsum.photos/seed/diana/100', notes: 'Shows strong leadership skills.', classId: 'c2' },
  { id: 's5', name: 'Ethan Hunt', age: 9, photoUrl: 'https://picsum.photos/seed/ethan/100', notes: 'High endurance, participates well.', classId: 'c3' },
  { id: 's6', name: 'Fiona Glenanne', age: 9, photoUrl: 'https://picsum.photos/seed/fiona/100', notes: 'Needs encouragement to join group activities.', classId: 'c3' },
];

export const SAMPLE_ACTIVITIES: Activity[] = [
  { id: 'a1', name: 'Dragon Tag', description: 'A fun tag game where players form a dragon chain.', ageGroup: '6-8', equipment: ['Cones'], goal: [SkillCategory.Coordination, SkillCategory.Endurance], isCustom: false },
  { id: 'a2', name: 'Obstacle Course', description: 'Set up a course with various challenges to test different skills.', ageGroup: '7-10', equipment: ['Cones', 'Mats', 'Hula Hoops'], goal: [SkillCategory.Strength, SkillCategory.Coordination], isCustom: false },
];

export const SAMPLE_PLAYLIST: PlaylistItem[] = [
    { id: 'pl1', title: 'Upbeat Kids Warm-up', url: 'https://www.youtube.com/watch?v=JoF_d5sgGgc', videoId: 'JoF_d5sgGgc' },
    { id: 'pl2', title: 'Get Active Music', url: 'https://www.youtube.com/watch?v=h4eueDYPTIg', videoId: 'h4eueDYPTIg' },
];

export const SAMPLE_PERFORMANCE: PerformanceRecord[] = [
    { id: 'p1', studentId: 's1', date: new Date(Date.now() - 20 * 86400000).toISOString(), skill: SkillCategory.Endurance, score: 3 },
    { id: 'p2', studentId: 's1', date: new Date(Date.now() - 10 * 86400000).toISOString(), skill: SkillCategory.Endurance, score: 4 },
    { id: 'p3', studentId: 's2', date: new Date(Date.now() - 15 * 86400000).toISOString(), skill: SkillCategory.Teamwork, score: 5 },
];

export const SAMPLE_BEHAVIOR: BehaviorLog[] = [
    { id: 'b1', studentId: 's2', date: new Date(Date.now() - 5 * 86400000).toISOString(), type: BehaviorType.Positive, description: 'Helped a teammate who fell down.', emoji: '🤝' },
    { id: 'b2', studentId: 's6', date: new Date(Date.now() - 3 * 86400000).toISOString(), type: BehaviorType.Challenge, description: 'Was reluctant to participate in the main game.', emoji: '😟' },
];