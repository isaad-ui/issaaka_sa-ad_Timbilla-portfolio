import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 'proficient' },
      { name: 'Java', level: 'proficient' },
      { name: 'JavaScript', level: 'proficient' },
    ],
  },
  {
    category: 'Web',
    skills: [
      { name: 'HTML', level: 'proficient' },
      { name: 'CSS', level: 'proficient' },
      { name: 'React', level: 'learning' },
      { name: 'Node.js', level: 'learning' },
    ],
  },
  {
    category: 'Data & Algorithms',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'proficient' },
      { name: 'Python for Data Analysis', level: 'proficient' },
      { name: 'SQL', level: 'learning' },
      { name: 'Data Science Fundamentals', level: 'learning' },
      { name: 'Machine Learning', level: 'learning' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 'proficient' },
      { name: 'GitHub', level: 'proficient' },
      { name: 'VS Code', level: 'proficient' },
      { name: 'Figma', level: 'learning' },
    ],
  },
];
