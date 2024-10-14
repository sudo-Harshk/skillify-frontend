import React, { useEffect, useState, useMemo } from 'react';

const DesignedBy: React.FC = () => {
  const [text, setText] = useState('');
  const words = useMemo(() => [
    'Made', 'Built', 'Created', 'Composed', 'Hacked', 'Brewed', 'Crafted', 'Forged', 'Designed', 'Developed', 'Produced'
  ], []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let wordIndex = 0;
    let iteration = 0;

    const scrambleText = () => {
      const fullText = words[wordIndex];
      let scrambled = '';
      for (let i = 0; i < fullText.length; i++) {
        if (i < iteration) {
          scrambled += fullText[i];
        } else {
          scrambled += characters[Math.floor(Math.random() * characters.length)];
        }
      }
      setText(scrambled);

      if (iteration < fullText.length) {
        iteration++;
        timeout = setTimeout(scrambleText, 100); 
      } else {
        setTimeout(() => {
          iteration = 0; 
          wordIndex = (wordIndex + 1) % words.length; 
          scrambleText();
        }, 4000); 
      }
    };

    scrambleText();

    return () => clearTimeout(timeout);
  }, [words]);

  return (
    <p className="text-gray-600 flex items-center justify-end mt-5">
      {text} by
      <span className="inline-block relative h-6 w-16 overflow-hidden ml-2 align-middle">
        <span className="animate-slide-up absolute inset-0 underline underline-offset-4 font-bold" style={{ animationDelay: '2s' }}>Nikku</span>
        <span className="animate-slide-up-delay absolute inset-0 initial-hidden underline underline-offset-4 font-bold" style={{ animationDelay: '4s' }}>Harshk</span>
      </span>
    </p>
  );
};

export default DesignedBy;
