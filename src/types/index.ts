export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'Web Development' | 'UI/UX Design' | 'Mobile';
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}