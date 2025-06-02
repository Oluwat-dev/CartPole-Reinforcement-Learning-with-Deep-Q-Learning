import { Code, Layout, Database, Settings, Smartphone, Briefcase } from 'lucide-react';

export const skills = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: [
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 88 }
    ]
  },
  {
    title: 'UI/UX Design',
    icon: Layout,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'User Research', level: 75 },
      { name: 'Wireframing', level: 90 },
      { name: 'Prototyping', level: 88 },
      { name: 'Design Systems', level: 80 }
    ]
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Firebase', level: 78 },
      { name: 'REST APIs', level: 88 }
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: Settings,
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'CI/CD', level: 78 },
      { name: 'Docker', level: 65 },
      { name: 'AWS', level: 70 },
      { name: 'Testing', level: 75 }
    ]
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    skills: [
      { name: 'React Native', level: 80 },
      { name: 'iOS Development', level: 60 },
      { name: 'Android Development', level: 55 },
      { name: 'Mobile UI Design', level: 85 },
      { name: 'App Publishing', level: 75 }
    ]
  },
  {
    title: 'Professional Skills',
    icon: Briefcase,
    skills: [
      { name: 'Project Management', level: 85 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Communication', level: 88 },
      { name: 'Problem Solving', level: 92 },
      { name: 'Time Management', level: 85 }
    ]
  }
];