import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import ProjectCard from './ui/ProjectCard';
import { projects } from '../data/projects';

const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
              Check out some of my recent work. These projects showcase my skills in web development, 
              design, and problem-solving.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-teal-600 text-white dark:bg-teal-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                delay={index * 0.1}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;