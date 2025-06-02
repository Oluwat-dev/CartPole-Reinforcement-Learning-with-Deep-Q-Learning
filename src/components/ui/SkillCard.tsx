import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  icon: LucideIcon;
  skills: Array<{ name: string; level: number }>;
  delay: number;
  inView: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon: Icon, skills, delay, inView }) => {
  return (
    <div 
      className={`bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 transition-all duration-700 transform ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center mb-6">
        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg mr-4">
          <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.level}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-teal-600 dark:bg-teal-500 h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;