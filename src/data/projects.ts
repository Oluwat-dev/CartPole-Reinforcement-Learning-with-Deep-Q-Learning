import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A fully responsive e-commerce website with product filtering, cart functionality, and payment integration.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity application that helps users organize tasks, set priorities, and track progress.',
    image: 'https://images.pexels.com/photos/6804606/pexels-photo-6804606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web Development',
    technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    description: 'An interactive dashboard that visualizes financial data with charts and provides analysis tools.',
    image: 'https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'UI/UX Design',
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 4,
    title: 'Restaurant Booking System',
    description: 'A reservation system for restaurants that allows customers to book tables and view available time slots.',
    image: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Web Development',
    technologies: ['Next.js', 'PostgreSQL', 'Express', 'TailwindCSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 5,
    title: 'Fitness Tracker App',
    description: 'A mobile application that helps users track workouts, set fitness goals, and monitor progress.',
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    githubUrl: 'https://github.com',
    liveUrl: null
  },
  {
    id: 6,
    title: 'Social Media Dashboard',
    description: 'A UI design for a social media management tool that helps users schedule posts and analyze engagement.',
    image: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'UI/UX Design',
    technologies: ['Figma', 'Sketch', 'InVision', 'Zeplin'],
    githubUrl: null,
    liveUrl: 'https://example.com'
  }
];