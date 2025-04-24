import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SlotMachineProps {
  onWin: () => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ onWin }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const symbols = ['7', '💎', '⭐', '🎨', '✨', '7'];
  const targetSymbol = '7';
  const targetIndex = symbols.indexOf(targetSymbol);
  
  useEffect(() => {
    audioRef.current = new Audio('/sounds/jackpot.mp3');
    
    if (!hasPlayed) {
      setTimeout(() => {
        spinReels();
      }, 1000);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const spinReels = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setHasPlayed(true);
    setShowWinMessage(false);
    
    const spinReel = (index: number) => {
      return new Promise<void>((resolve) => {
        const spins = 15 + Math.floor(Math.random() * 10);
        let count = 0;
        
        const interval = setInterval(() => {
          setReels(prev => {
            const newReels = [...prev];
            newReels[index] = (newReels[index] + 1) % symbols.length;
            return newReels;
          });
          
          count++;
          if (count >= spins) {
            clearInterval(interval);
            setReels(prev => {
              const newReels = [...prev];
              newReels[index] = targetIndex;
              return newReels;
            });
            resolve();
          }
        }, 100 - (count * 2)); // Speed up towards the end
      });
    };
    
    spinReel(0)
      .then(() => new Promise(resolve => setTimeout(resolve, 300)))
      .then(() => spinReel(1))
      .then(() => new Promise(resolve => setTimeout(resolve, 300)))
      .then(() => spinReel(2))
      .then(() => {
        setIsSpinning(false);
        setShowWinMessage(true);
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        onWin();
      });
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-48 bg-dark rounded-xl shadow-2xl overflow-hidden border-4 border-primary">
        {/* Machine top decoration */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-gray-800 via-primary to-gray-800" />
        
        {/* Glass effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        {/* Slot window */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          {reels.map((symbolIndex, index) => (
            <motion.div 
              key={index}
              className="w-20 h-24 bg-black rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                border: '2px solid rgba(255,255,255,0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none" />
              <span className="text-5xl font-bold" style={{ textShadow: '0 0 10px rgba(255,51,102,0.5)' }}>
                {symbols[symbolIndex]}
              </span>
              {/* Reel lines */}
              <div className="absolute inset-0 border-y-2 border-primary/30 pointer-events-none" />
            </motion.div>
          ))}
        </div>
        
        {/* Lever */}
        <motion.div 
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 20 }}
          onClick={spinReels}
        >
          <div className="w-6 h-24 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-600" />
            <div className="w-3 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b" />
            <div className="w-4 h-4 rounded-full bg-gray-700" />
          </div>
        </motion.div>
        
        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-gray-800 via-primary to-gray-800" />
      </div>
      
      {/* Win message */}
      {showWinMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-8"
        >
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            🎉 Lucky Winner! 🎉
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default SlotMachine; 