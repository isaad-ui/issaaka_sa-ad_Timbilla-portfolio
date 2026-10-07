import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: "github-developer-analytics",
    title: "GitHub Developer Analytics",
    category: "Data Science",
    shortDescription:
      "A Python data-analysis project that fetches and visualises real GitHub developer and repository activity using the GitHub API.",
    description:
      "GitHub Developer Analytics is a Python project that connects to the GitHub REST API to retrieve developer profile data and repository activity, then processes and visualises the results. It demonstrates the full data-analysis workflow: data collection via API, cleaning, analysis, and producing clear visual outputs.",
    problem:
      "GitHub profiles expose a wealth of developer activity data — contributions, repository languages, star counts, commit history — but it is scattered across many API endpoints and hard to reason about at a glance. There was no simple way to pull that data together and see meaningful patterns.",
    solution:
      "Built a Python script that authenticates with the GitHub API, retrieves profile and repository data for a given developer, processes the raw JSON responses into structured formats, and produces data visualisations that surface patterns in language usage, activity, and repository metrics.",
    features: [
      "GitHub REST API integration for live developer data",
      "Repository activity and language distribution analysis",
      "Data visualisation of developer and repo metrics",
      "Processes real-world API responses into clean data structures",
    ],
    tech: ["Python", "GitHub API", "Data Analysis", "Data Visualization"],
    challenges:
      "Working with paginated GitHub API responses and handling rate limiting required building robust request logic. Structuring raw JSON responses into a clean, analysable format — without losing useful fields — was the core data-engineering challenge.",
    learned:
      "Practical experience consuming a real-world REST API, handling authentication and rate limits, and applying data analysis techniques to developer data. This project made the full pipeline from raw API data to meaningful visualisation concrete.",
    githubUrl: "https://github.com/isaad-ui",
    status: "complete",
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone",
    category: "Frontend",
    shortDescription:
      "A frontend clone of the YouTube UI built with HTML and CSS, replicating the layout, sidebar navigation, and video browsing experience.",
    description:
      "A frontend project that recreates the core visual interface of YouTube, focusing on layout accuracy, responsive design, and clean CSS implementation. The project covers the homepage video grid, sidebar navigation, and video card components — the fundamental building blocks of a modern video platform UI.",
    problem:
      "Rebuilding a production-quality UI from scratch is one of the best ways to develop precision in HTML and CSS. The YouTube interface — with its responsive grid, sticky sidebar, and component hierarchy — makes it a strong challenge for practising real frontend fundamentals.",
    solution:
      "Studied and recreated the YouTube homepage layout using semantic HTML and CSS, focusing on getting the grid structure, sidebar, and video card components right across screen sizes. The goal was accuracy to the original and clean, maintainable CSS — not shortcuts.",
    features: [
      "Responsive video grid matching the YouTube homepage layout",
      "Sidebar navigation with channel and category links",
      "Video card components with thumbnail, title, and metadata",
      "Sticky header with search bar UI",
      "Mobile-responsive layout adjustments",
    ],
    tech: ["HTML", "CSS"],
    challenges:
      "Getting the responsive grid to behave correctly across breakpoints — matching column behaviour on desktop, tablet, and mobile — required precise use of CSS Grid and careful attention to sizing and spacing. Replicating the sticky header and sidebar layout without JavaScript was a useful constraint.",
    learned:
      "Sharpened understanding of CSS Grid, Flexbox, and responsive layout techniques by working against a real, well-known reference. Recreating a production UI develops an eye for spacing, hierarchy, and the details that make interfaces feel polished.",
    githubUrl: "https://github.com/isaad-ui",
    status: "complete",
  },
];
