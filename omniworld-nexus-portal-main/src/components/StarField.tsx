
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  twinkleIntensity: number;
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 4000);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.08 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleIntensity: Math.random() * 0.6 + 0.4
        });
      }
      
      starsRef.current = stars;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        
        // Enhanced twinkling effect with multiple sine waves
        const twinkle1 = Math.sin(star.twinklePhase) * star.twinkleIntensity;
        const twinkle2 = Math.sin(star.twinklePhase * 1.5) * 0.3;
        const twinkle3 = Math.sin(star.twinklePhase * 0.7) * 0.2;
        
        const finalTwinkle = (twinkle1 + twinkle2 + twinkle3) * 0.4 + 0.6;
        const alpha = star.opacity * Math.max(0.1, finalTwinkle);
        
        // Main star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.fill();
        
        // Twinkling effect - brighter center when twinkling
        if (finalTwinkle > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.fill();
        }
        
        // Glow effect for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.15})`;
          ctx.fill();
        }
        
        // Sparkle effect for very bright twinkles
        if (finalTwinkle > 0.9 && star.size > 1.2) {
          // Cross sparkle
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 1.5, star.y);
          ctx.lineTo(star.x + star.size * 1.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 1.5);
          ctx.lineTo(star.x, star.y + star.size * 1.5);
          ctx.stroke();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarField;
