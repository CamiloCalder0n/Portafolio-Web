// Shared TypeScript interface declarations and type definitions

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  difficulty: number;
  status: "In Progress" | "Completed";
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description?: string;
}
