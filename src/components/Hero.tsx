import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlotMachine from './SlotMachine';

const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWin = () => {
    setTimeout(() => {
      setShowCTA(true);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-dark text-light px-4 md:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-black via-dark to-black opacity-70" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          className="font-display text-6xl md:text-8xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Happy go Lucky
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <SlotMachine onWin={handleWin} />
        </motion.div>

        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-primary text-light px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all shadow-lg border border-primary/30"
              >
                Start Your Project
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          From names to narratives to national commercials—I'm your idea engine.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero; 