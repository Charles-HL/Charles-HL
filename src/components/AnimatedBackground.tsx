"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.3,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 65%)`, // Blue to purple hues
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glassmorphism effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Create gradient for glassmorphism effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 12
        );
        gradient.addColorStop(0, particle.color);

        // Convert HSL color to rgba for transparency
        const hslMatch = particle.color.match(
          /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/
        );
        if (hslMatch) {
          const [, h, s, l] = hslMatch;
          gradient.addColorStop(0.7, `hsla(${h}, ${s}%, ${l}%, 0.2)`);
        } else {
          gradient.addColorStop(0.7, "rgba(100, 150, 255, 0.2)");
        }

        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      {/* Canvas pour les particules animées */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70 dark:opacity-50"
      />

      {/* Éléments glassmorphism statiques */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-40 h-40 glass-light rounded-full opacity-40"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3/4 right-1/4 w-32 h-32 glass-card rounded-2xl opacity-35"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/3 w-28 h-28 glass rounded-3xl opacity-30"
        />

        {/* Particules supplémentaires pour plus de dynamisme */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 60, 0],
            rotate: [0, -360, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 right-1/3 w-16 h-16 glass-light rounded-full opacity-35"
        />

        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -40, 0],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/2 w-12 h-12 glass-card rounded-xl opacity-25"
        />
      </div>

      {/* Gradient overlay subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 dark:from-blue-900/30 dark:via-transparent dark:to-purple-900/30" />
    </div>
  );
};

export default AnimatedBackground;
