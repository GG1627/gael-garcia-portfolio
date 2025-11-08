export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  linkedinUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Project One",
    description: "A cool project that does amazing things. Built with modern technologies and best practices.",
    image: "/images/AboutMe.jpeg", // Replace with actual project images
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    name: "Project Two",
    description: "An innovative solution that solves real-world problems. Features clean architecture and scalable design.",
    image: "/images/AboutMe2.jpeg",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: 3,
    name: "Project Three",
    description: "A machine learning project that demonstrates advanced AI capabilities and data processing.",
    image: "/images/AboutMe3.jpeg",
    tech: ["Python", "PyTorch", "TensorFlow", "NumPy"],
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    name: "Project Four",
    description: "A full-stack application with real-time features and modern UI/UX design principles.",
    image: "/images/AboutMe.jpeg",
    tech: ["Node.js", "Express", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 5,
    name: "Project Five",
    description: "A mobile-first web application with responsive design and cross-platform compatibility.",
    image: "/images/AboutMe2.jpeg",
    tech: ["React Native", "TypeScript", "Firebase", "Expo"],
    githubUrl: "https://github.com"
  },
  {
    id: 6,
    name: "Project Six",
    description: "An open-source contribution that improves developer experience and tooling.",
    image: "/images/AboutMe3.jpeg",
    tech: ["JavaScript", "Webpack", "Babel", "ESLint"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com"
  }
];

