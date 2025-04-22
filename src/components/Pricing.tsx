import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const tiers = [
  {
    name: 'Concept Sprint',
    price: '$4,000',
    description: '1-week rapid idea sprint for names, campaigns, or commercials',
    features: [
      'Rapid ideation session',
      '3-5 concept directions',
      'Basic mockups',
      '1 revision round'
    ]
  },
  {
    name: 'Creative Director Lite',
    price: '$10,000',
    description: 'Brand visual direction or campaign strategy with deliverables',
    features: [
      'Full creative direction',
      'Comprehensive strategy',
      'Visual system development',
      '3 revision rounds',
      'Implementation guidance'
    ]
  },
  {
    name: 'Ongoing Partner',
    price: 'Custom',
    description: 'Monthly support for teams that want a creative weapon on-call',
    features: [
      'Dedicated creative direction',
      'Regular strategy sessions',
      'Project oversight',
      'Team collaboration',
      'Priority access'
    ]
  }
];

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-light">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
        >
          How We Work
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
              <p className="text-3xl font-bold text-primary mb-4">{tier.price}</p>
              <p className="text-gray-600 mb-6">{tier.description}</p>
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={scrollToContact}
                className="mt-8 w-full bg-dark text-light py-3 rounded-lg hover:bg-primary transition-colors"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-gray-600"
        >
          Equity / retainer options available for early-stage startups.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing; 