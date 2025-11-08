import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type ParticleType = "quark-up" | "quark-down" | "electron" | "gluon" | "proton" | "neutron";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: ParticleType;
  radius: number;
  charge: number;
  bound?: boolean;
  boundTo?: number[];
}

interface QuantumSimulatorProps {
  mode: "quarks" | "formation" | "forces";
}

const particleConfig = {
  "quark-up": { color: "hsl(280, 100%, 60%)", label: "Up", charge: 2/3, radius: 6 },
  "quark-down": { color: "hsl(340, 100%, 60%)", label: "Down", charge: -1/3, radius: 6 },
  "electron": { color: "hsl(180, 100%, 50%)", label: "e⁻", charge: -1, radius: 8 },
  "gluon": { color: "hsl(60, 100%, 60%)", label: "g", charge: 0, radius: 4 },
  "proton": { color: "hsl(10, 100%, 55%)", label: "p⁺", charge: 1, radius: 14 },
  "neutron": { color: "hsl(200, 30%, 60%)", label: "n", charge: 0, radius: 14 },
};

export const QuantumSimulator = ({ mode }: QuantumSimulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();
  const [showLabels, setShowLabels] = useState(true);
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles based on mode
    let initialParticles: Particle[] = [];
    
    if (mode === "quarks") {
      // Show individual quarks and electrons
      for (let i = 0; i < 4; i++) {
        initialParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          type: "quark-up",
          radius: particleConfig["quark-up"].radius,
          charge: particleConfig["quark-up"].charge,
        });
      }
      for (let i = 0; i < 4; i++) {
        initialParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          type: "quark-down",
          radius: particleConfig["quark-down"].radius,
          charge: particleConfig["quark-down"].charge,
        });
      }
      for (let i = 0; i < 3; i++) {
        initialParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          type: "electron",
          radius: particleConfig["electron"].radius,
          charge: particleConfig["electron"].charge,
        });
      }
    } else if (mode === "formation") {
      // Show quark triplets forming protons and neutrons
      // Proton (2 up, 1 down)
      initialParticles.push(
        {
          x: canvas.width * 0.3,
          y: canvas.height * 0.5,
          vx: 0, vy: 0,
          type: "quark-up",
          radius: particleConfig["quark-up"].radius,
          charge: particleConfig["quark-up"].charge,
          bound: true,
          boundTo: [1, 2],
        },
        {
          x: canvas.width * 0.3 + 20,
          y: canvas.height * 0.5,
          vx: 0, vy: 0,
          type: "quark-up",
          radius: particleConfig["quark-up"].radius,
          charge: particleConfig["quark-up"].charge,
          bound: true,
          boundTo: [0, 2],
        },
        {
          x: canvas.width * 0.3 + 10,
          y: canvas.height * 0.5 + 17,
          vx: 0, vy: 0,
          type: "quark-down",
          radius: particleConfig["quark-down"].radius,
          charge: particleConfig["quark-down"].charge,
          bound: true,
          boundTo: [0, 1],
        }
      );
      
      // Neutron (1 up, 2 down)
      initialParticles.push(
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.5,
          vx: 0, vy: 0,
          type: "quark-up",
          radius: particleConfig["quark-up"].radius,
          charge: particleConfig["quark-up"].charge,
          bound: true,
          boundTo: [4, 5],
        },
        {
          x: canvas.width * 0.7 + 20,
          y: canvas.height * 0.5,
          vx: 0, vy: 0,
          type: "quark-down",
          radius: particleConfig["quark-down"].radius,
          charge: particleConfig["quark-down"].charge,
          bound: true,
          boundTo: [3, 5],
        },
        {
          x: canvas.width * 0.7 + 10,
          y: canvas.height * 0.5 + 17,
          vx: 0, vy: 0,
          type: "quark-down",
          radius: particleConfig["quark-down"].radius,
          charge: particleConfig["quark-down"].charge,
          bound: true,
          boundTo: [3, 4],
        }
      );

      // Add orbiting electrons
      for (let i = 0; i < 2; i++) {
        initialParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          type: "electron",
          radius: particleConfig["electron"].radius,
          charge: particleConfig["electron"].charge,
        });
      }
    } else if (mode === "forces") {
      // Show force carriers (gluons) between quarks
      for (let i = 0; i < 6; i++) {
        initialParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          type: i % 3 === 0 ? "gluon" : i % 2 === 0 ? "quark-up" : "quark-down",
          radius: i % 3 === 0 ? particleConfig["gluon"].radius : particleConfig["quark-up"].radius,
          charge: i % 3 === 0 ? 0 : i % 2 === 0 ? 2/3 : -1/3,
        });
      }
    }

    particlesRef.current = initialParticles;
    setParticles(initialParticles);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        // Physics
        if (!particle.bound) {
          // Mouse interaction
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const force = (150 - distance) / 150;
              particle.vx += (dx / distance) * force * 0.3;
              particle.vy += (dy / distance) * force * 0.3;
            }
          }

          // Electromagnetic force between charged particles
          particlesRef.current.forEach((other, j) => {
            if (i >= j || other.bound) return;
            
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120 && distance > 0) {
              const force = (particle.charge * other.charge) / (distance * distance);
              const fx = (dx / distance) * force * -2;
              const fy = (dy / distance) * force * -2;
              
              particle.vx += fx;
              particle.vy += fy;
            }
          });

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off walls
          if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
            particle.vx *= -0.8;
            particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
          }
          if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
            particle.vy *= -0.8;
            particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
          }

          // Friction
          particle.vx *= 0.98;
          particle.vy *= 0.98;
        } else {
          // Bound particles orbit slightly
          const time = Date.now() * 0.001;
          const offset = i * (Math.PI * 2 / 3);
          particle.x += Math.cos(time + offset) * 0.5;
          particle.y += Math.sin(time + offset) * 0.5;
        }

        // Draw connections for bound particles or close particles
        if (particle.bound && particle.boundTo) {
          particle.boundTo.forEach(targetIndex => {
            const target = particlesRef.current[targetIndex];
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = "hsla(60, 100%, 60%, 0.6)";
            ctx.lineWidth = 2;
            ctx.stroke();
          });
        } else if (mode === "forces") {
          // Show force carrier exchanges
          particlesRef.current.forEach((other, j) => {
            if (i >= j) return;
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100 && (particle.type.includes("quark") || other.type.includes("quark"))) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              const alpha = 1 - distance / 100;
              ctx.strokeStyle = `hsla(60, 100%, 60%, ${alpha * 0.4})`;
              ctx.lineWidth = 1;
              ctx.setLineDash([5, 5]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          });
        }

        // Draw particle
        const config = particleConfig[particle.type];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = config.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = config.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw charge indicator
        if (particle.charge !== 0 && !particle.bound) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = particle.charge > 0 ? "hsla(10, 100%, 60%, 0.5)" : "hsla(200, 100%, 60%, 0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw labels
        if (showLabels) {
          ctx.fillStyle = "hsl(var(--foreground))";
          ctx.font = "bold 11px system-ui";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(config.label, particle.x, particle.y);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, showLabels]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const getModeDescription = () => {
    switch (mode) {
      case "quarks":
        return "Individual quarks and electrons exhibiting quantum behavior. Notice how opposite charges attract and like charges repel!";
      case "formation":
        return "Watch quarks combine into protons (2 up + 1 down) and neutrons (1 up + 2 down). Gluons bind them together!";
      case "forces":
        return "Force carriers (gluons) constantly exchange between quarks, creating the strong nuclear force!";
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {mode === "quarks" && "Quantum Particle Behavior"}
            {mode === "formation" && "Quark Confinement & Formation"}
            {mode === "forces" && "Strong Nuclear Force"}
          </h3>
          <p className="text-sm text-muted-foreground">{getModeDescription()}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? "Hide Labels" : "Show Labels"}
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig["quark-up"].color }} />
          Up Quark (+2/3)
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig["quark-down"].color }} />
          Down Quark (-1/3)
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig.electron.color }} />
          Electron (-1)
        </Badge>
        {mode === "forces" && (
          <Badge variant="secondary" className="gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig.gluon.color }} />
            Gluon (force carrier)
          </Badge>
        )}
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-80 rounded-lg bg-background/80 cursor-pointer border border-border"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Move your mouse over the simulation to interact with particles!
      </p>
    </Card>
  );
};