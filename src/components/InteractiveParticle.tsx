import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}

interface InteractiveParticleProps {
  title: string;
  description: string;
  particleCount?: number;
  particleColor?: string;
}

export const InteractiveParticle = ({
  title,
  description,
  particleCount = 20,
  particleColor = "hsl(180, 100%, 50%)",
}: InteractiveParticleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 4 + 2,
      color: particleColor,
      mass: Math.random() * 2 + 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        if (isHovering) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx -= (dx / distance) * force * 0.5;
            particle.vy -= (dy / distance) * force * 0.5;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
          particle.vx *= -0.9;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
          particle.vy *= -0.9;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Particle collisions
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particle.radius + other.radius) {
            const angle = Math.atan2(dy, dx);
            const targetX = particle.x + Math.cos(angle) * (particle.radius + other.radius);
            const targetY = particle.y + Math.sin(angle) * (particle.radius + other.radius);

            const ax = (targetX - other.x) * 0.05;
            const ay = (targetY - other.y) * 0.05;

            particle.vx -= ax;
            particle.vy -= ay;
            other.vx += ax;
            other.vy += ay;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color.replace(")", `, ${1 - distance / 100})`).replace("hsl", "hsla");
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColor, isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border overflow-hidden">
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 rounded-lg bg-background/50 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Hover and move your mouse to interact with particles!
        </p>
      </div>
    </Card>
  );
};
