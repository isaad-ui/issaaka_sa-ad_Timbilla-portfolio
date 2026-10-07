import type { JourneyItem } from '../types';

export const journeyItems: JourneyItem[] = [
  {
    id: 'university',
    year: '2025',
    title: 'Started BSc Computer Science — University of Ghana',
    description: 'Enrolled in the BSc Computer Science programme at the University of Ghana, beginning a structured study of algorithms, programming, mathematics, and software systems.',
    tags: ['University', 'Computer Science', 'Academic'],
  },
  {
    id: 'python',
    year: '2025',
    title: 'Python Development & Algorithms',
    description: 'Built a strong foundation in Python programming, progressing from basics to object-oriented design, data structures, and algorithmic problem solving. Implemented linked lists, hash tables, sorting algorithms, and graph traversal from scratch.',
    tags: ['Python', 'Algorithms', 'Data Structures'],
  },
  {
    id: 'web-dev',
    year: '2025',
    title: 'Web Development Foundations',
    description: 'Learned HTML, CSS, and JavaScript through hands-on building. Moved beyond tutorials by working on real projects, focusing on responsive design, DOM manipulation, and building complete user interfaces.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend'],
  },
  {
    id: 'first-projects',
    year: '2025',
    title: 'First Full Projects',
    description: 'Built the Electronics Repair Shop Inventory System and Kitchen Hub & More — the first projects that required designing a full system from scratch: database modelling, backend logic, user authentication, and a polished frontend.',
    tags: ['Web App', 'Full Stack', 'Projects'],
  },
  {
    id: 'data-science',
    year: '2025',
    title: 'Exploring Data Science',
    description: 'Started exploring the data science track: Python for data analysis, introductory machine learning concepts, and SQL. Working to understand how data can inform real decisions and what the pipeline from raw data to insight looks like.',
    tags: ['Data Science', 'Python', 'Machine Learning', 'SQL'],
  },
  {
    id: 'git-github',
    year: '2025',
    title: 'Version Control & Open Source Practices',
    description: 'Adopted Git and GitHub as core tools in my workflow. Learned branching, committing with intent, writing useful commit messages, and how to structure a repository that others can navigate and contribute to.',
    tags: ['Git', 'GitHub', 'Version Control'],
  },
  {
    id: 'present',
    year: 'Now',
    title: 'Building, Learning, and Preparing',
    description: 'Actively building projects, strengthening my skills across software engineering and data science, and preparing for internship and collaborative opportunities. This portfolio is a live snapshot of that progress.',
    tags: ['Portfolio', 'Internships', 'Growth'],
    current: true,
  },
];
