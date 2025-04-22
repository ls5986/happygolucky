import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  'Naming',
  'Campaign',
  'Commercial',
  'Brand',
  'Strategy',
  'Other'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $20,000',
  '$20,000 - $50,000',
  '$50,000+'
];

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    details: '',
    services: [] as string[],
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        projectType: '',
        details: '',
        services: [],
        budget: '',
        timeline: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-dark text-light">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
        >
          Pitch Me Your Chaos
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {submitSuccess && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
              <p className="font-bold">Thank you for your inquiry!</p>
              <p>I'll get back to you as soon as possible.</p>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
              <p className="font-bold">Error</p>
              <p>{submitError}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">What are we making?</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
              value={formData.projectType}
              onChange={e => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Details</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none h-32"
              value={formData.details}
              onChange={e => setFormData(prev => ({ ...prev, details: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Services Needed</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map(service => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2">Budget</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
                value={formData.budget}
                onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                required
              >
                <option value="">Select a range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timeline</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
                value={formData.timeline}
                onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                placeholder="e.g., 2 weeks, 1 month"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-dark py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send it'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact; 