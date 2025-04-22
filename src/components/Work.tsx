import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    title: 'Project Alpha',
    role: 'Creative Direction / Campaign',
    description: 'A rebrand with teeth',
    image: '/placeholder-1.jpg'
  },
  {
    title: 'Project Beta',
    role: 'Naming / Brand Identity',
    description: 'Breaking the rules with style',
    image: '/placeholder-2.jpg'
  },
  {
    title: 'Project Gamma',
    role: 'Commercial Direction',
    description: 'Where wild ideas meet execution',
    image: '/placeholder-3.jpg'
  },
  {
    title: 'Project Delta',
    role: 'Art Direction',
    description: 'Visual storytelling reimagined',
    image: '/placeholder-4.jpg'
  }
];

const Work = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="work" className="py-20 px-4 md:px-8 bg-dark text-light">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
        >
          Past Madness
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-gray-900"
            >
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-64 bg-gray-800 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-primary mb-2">{project.role}</p>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work; 