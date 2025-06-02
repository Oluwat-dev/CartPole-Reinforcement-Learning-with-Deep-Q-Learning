import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-slate-950 dark:to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-200/20 via-transparent to-transparent dark:from-teal-800/10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              <span className="block">John Developer</span>
              <span className="text-teal-600 dark:text-teal-400">Web Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              I create beautiful, responsive websites and web applications with modern technologies.
              Passionate about crafting user-friendly experiences that solve real problems.
            </p>
            
            <div className="flex justify-center space-x-4 mb-12">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-medium rounded-lg border border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
              >
                Contact Me
              </a>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:john@example.com"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="Email Me"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </a>
    </section>
  );
};

export default Hero;