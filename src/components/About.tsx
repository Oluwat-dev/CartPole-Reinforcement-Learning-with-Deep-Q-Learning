import React from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="John Developer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-600 dark:bg-teal-500 rounded-lg -z-10"></div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Front-end Developer & UI/UX Enthusiast
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  I'm a passionate front-end developer with 5 years of experience creating beautiful, 
                  responsive websites and web applications. My journey in web development started when 
                  I built my first website in college, and I've been hooked ever since.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  I specialize in modern JavaScript frameworks like React, along with HTML, CSS, and 
                  TypeScript. I'm also skilled in UI/UX design principles, ensuring that the websites 
                  I build are not only visually appealing but also intuitive and user-friendly.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  When I'm not coding, you can find me hiking in the mountains, reading science fiction, 
                  or experimenting with new recipes in the kitchen.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Location</h4>
                    <p className="text-slate-700 dark:text-slate-300">San Francisco, CA</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Email</h4>
                    <p className="text-slate-700 dark:text-slate-300">john@example.com</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Education</h4>
                    <p className="text-slate-700 dark:text-slate-300">B.S. Computer Science</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Freelance</h4>
                    <p className="text-slate-700 dark:text-slate-300">Available</p>
                  </div>
                </div>
                
                <div>
                  <a 
                    href="#contact" 
                    className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;