import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-dark text-light px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6">
            Happy go Lucky
          </h1>
          <p className="text-xl md:text-2xl text-primary mb-8">
            Creative direction for brands, campaigns, and chaos.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            From names to narratives to national commercials—I'm your idea engine.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="bg-primary text-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all"
          >
            Work With Me
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 