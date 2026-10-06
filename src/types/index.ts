export interface Project {
  id: string;
  title: string;
  category: 'Web App' | 'Frontend' | 'Python' | 'Full Stack';
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  challenges: string;
  learned: string;
  githubUrl: string;
  demoUrl?: string;
  status: 'complete' | 'in-development';
}

export interface Skill {
  name: string;
  level: 'proficient' | 'learning';
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface RepoCard {
  name: string;
  description: string;
  language: string;
  githubUrl: string;
}
