import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-light text-dark">
      <main>
        <Hero />
        <Services />
        <Work />
        <Pricing />
        <Contact />
        <About />
        <Footer />
      </main>
    </div>
  );
}

export default App; 