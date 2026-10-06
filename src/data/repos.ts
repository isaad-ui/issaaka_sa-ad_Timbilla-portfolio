import { RepoCard } from '../types';

// Static repo cards — matches the main projects.
// To add live GitHub API data later:
// 1. Create a VITE_GITHUB_TOKEN env variable
// 2. Fetch from https://api.github.com/users/isaad-ui/repos
// 3. Map the response to RepoCard objects
export const repos: RepoCard[] = [
  {
    name: 'school-management-system',
    description: 'Full-stack system for managing students, courses, and academic records.',
    language: 'Python',
    githubUrl: 'https://github.com/isaad-ui',
  },
  {
    name: 'repair-shop-inventory',
    description: 'Web-based inventory management with auth, stock tracking, and Cloudinary image uploads.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/isaad-ui',
  },
  {
    name: 'kitchen-hub',
    description: 'E-commerce platform for kitchen products with cart, accounts, and checkout.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/isaad-ui',
  },
  {
    name: 'jumia-inspired-ecommerce-ui',
    description: 'Frontend e-commerce UI with product browsing, search, and checkout flow.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/isaad-ui',
  },
  {
    name: 'python-dsa-projects',
    description: 'Python implementations of linked lists, hash tables, graph algorithms, sorting, and OOP.',
    language: 'Python',
    githubUrl: 'https://github.com/isaad-ui',
  },
];
