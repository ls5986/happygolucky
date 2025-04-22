import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  'Campaign Concepts',
  'Commercial Ideation & Direction',
  'Naming & Positioning',
  'Brand Identity & Visual Systems',
  'Modern Marketing Strategies',
  'Creative for Product Launches',
  'Art Direction & Talent Collaboration'
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-light">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
        >
          Creative Direction, Rewired
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="text-xl font-medium hover:text-primary transition-colors cursor-pointer"
              >
                {service}
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center"
          >
            <p className="text-lg leading-relaxed">
              I help brands old and new stop being boring. Whether you need a viral commercial idea 
              or a full brand birth, I bring vision, taste, and just enough delusion to make 
              something unforgettable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services; 