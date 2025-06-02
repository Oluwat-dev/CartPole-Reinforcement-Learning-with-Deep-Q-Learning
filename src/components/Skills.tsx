import React from 'react';
import { useInView } from '../hooks/useInView';
import SkillCard from './ui/SkillCard';
import { skills } from '../data/skills';

const Skills: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-20 bg-slate-50 dark:bg-slate-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
              I've worked with a variety of technologies and tools in web development.
              Here are the main areas where I excel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <SkillCard 
                key={index}
                title={category.title}
                icon={category.icon}
                skills={category.skills}
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

export default Skills;