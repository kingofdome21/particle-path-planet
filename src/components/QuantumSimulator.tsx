import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

type ParticleType = "quark-up" | "quark-down" | "electron" | "gluon" | "proton" | "neutron";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: ParticleType;
  radius: number;
  charge: number;
  dragging?: boolean;
  partOfComposite?: number; // ID of composite particle this belongs to
}

interface CompositeParticle {
  id: number;
  type: "proton" | "neutron";
  x: number;
  y: number;
  vx: number;
  vy: number;
  quarks: number[]; // IDs of quarks that form this
  radius: number;
}

interface QuantumSimulatorProps {}

const particleConfig = {
  "quark-up": { color: "hsl(280, 100%, 60%)", label: "Up", charge: 2/3, radius: 6 },
  "quark-down": { color: "hsl(340, 100%, 60%)", label: "Down", charge: -1/3, radius: 6 },
  "electron": { color: "hsl(180, 100%, 50%)", label: "e⁻", charge: -1, radius: 8 },
  "gluon": { color: "hsl(60, 100%, 60%)", label: "g", charge: 0, radius: 4 },
  "proton": { color: "hsl(10, 100%, 55%)", label: "p⁺", charge: 1, radius: 14 },
  "neutron": { color: "hsl(200, 30%, 60%)", label: "n", charge: 0, radius: 14 },
};

export const QuantumSimulator = ({}: QuantumSimulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const compositesRef = useRef<CompositeParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const draggedParticleRef = useRef<number | null>(null);
  const animationRef = useRef<number>();
  const [showLabels, setShowLabels] = useState(true);
  const [stats, setStats] = useState({ protons: 0, neutrons: 0, freeQuarks: 0 });
  const nextIdRef = useRef(0);

  const addQuark = (type: "quark-up" | "quark-down") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticle: Particle = {
      id: nextIdRef.current++,
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50,
      vx: 0,
      vy: 0,
      type,
      radius: particleConfig[type].radius,
      charge: particleConfig[type].charge,
    };

    particlesRef.current.push(newParticle);
    updateStats();
  };

  const resetSimulation = () => {
    particlesRef.current = [];
    compositesRef.current = [];
    nextIdRef.current = 0;
    updateStats();
    toast.success("Simulation reset!");
  };

  const updateStats = () => {
    const freeQuarks = particlesRef.current.filter(p => !p.partOfComposite).length;
    setStats({
      protons: compositesRef.current.filter(c => c.type === "proton").length,
      neutrons: compositesRef.current.filter(c => c.type === "neutron").length,
      freeQuarks,
    });
  };

  const checkQuarkProximity = () => {
    const freeQuarks = particlesRef.current.filter(p => !p.partOfComposite);
    
    // Check for proton formation (2 up + 1 down)
    for (let i = 0; i < freeQuarks.length; i++) {
      for (let j = i + 1; j < freeQuarks.length; j++) {
        for (let k = j + 1; k < freeQuarks.length; k++) {
          const p1 = freeQuarks[i];
          const p2 = freeQuarks[j];
          const p3 = freeQuarks[k];

          const dist12 = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const dist13 = Math.hypot(p1.x - p3.x, p1.y - p3.y);
          const dist23 = Math.hypot(p2.x - p3.x, p2.y - p3.y);

          if (dist12 < 40 && dist13 < 40 && dist23 < 40) {
            const types = [p1.type, p2.type, p3.type].sort();
            
            // Check for proton: 2 up + 1 down
            if (types[0] === "quark-down" && types[1] === "quark-up" && types[2] === "quark-up") {
              formComposite("proton", [p1, p2, p3]);
              toast.success("Proton formed! ⚛️");
              return;
            }
            
            // Check for neutron: 1 up + 2 down
            if (types[0] === "quark-down" && types[1] === "quark-down" && types[2] === "quark-up") {
              formComposite("neutron", [p1, p2, p3]);
              toast.success("Neutron formed! ⚛️");
              return;
            }
          }
        }
      }
    }
  };

  const formComposite = (type: "proton" | "neutron", quarks: Particle[]) => {
    const centerX = quarks.reduce((sum, q) => sum + q.x, 0) / 3;
    const centerY = quarks.reduce((sum, q) => sum + q.y, 0) / 3;

    const composite: CompositeParticle = {
      id: nextIdRef.current++,
      type,
      x: centerX,
      y: centerY,
      vx: 0,
      vy: 0,
      quarks: quarks.map(q => q.id),
      radius: 30,
    };

    compositesRef.current.push(composite);
    
    // Mark quarks as part of composite
    quarks.forEach(q => {
      q.partOfComposite = composite.id;
    });

    updateStats();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw composite particles first (protons/neutrons)
      compositesRef.current.forEach(composite => {
        const compositeQuarks = particlesRef.current.filter(p => 
          composite.quarks.includes(p.id)
        );

        if (compositeQuarks.length === 3) {
          // Update composite position based on quarks
          composite.x = compositeQuarks.reduce((sum, q) => sum + q.x, 0) / 3;
          composite.y = compositeQuarks.reduce((sum, q) => sum + q.y, 0) / 3;

          // Draw composite outer circle
          const config = particleConfig[composite.type];
          ctx.beginPath();
          ctx.arc(composite.x, composite.y, composite.radius, 0, Math.PI * 2);
          ctx.fillStyle = config.color.replace(")", ", 0.2)").replace("hsl", "hsla");
          ctx.strokeStyle = config.color;
          ctx.lineWidth = 3;
          ctx.fill();
          ctx.stroke();

          // Draw gluon bonds between quarks
          for (let i = 0; i < compositeQuarks.length; i++) {
            for (let j = i + 1; j < compositeQuarks.length; j++) {
              ctx.beginPath();
              ctx.moveTo(compositeQuarks[i].x, compositeQuarks[i].y);
              ctx.lineTo(compositeQuarks[j].x, compositeQuarks[j].y);
              ctx.strokeStyle = "hsla(60, 100%, 60%, 0.7)";
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }

          // Draw label
          if (showLabels) {
            ctx.fillStyle = "hsl(var(--foreground))";
            ctx.font = "bold 14px system-ui";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(config.label, composite.x, composite.y - composite.radius - 15);
          }

          // Position quarks in triangle formation
          const time = Date.now() * 0.0005;
          compositeQuarks.forEach((quark, idx) => {
            const angle = (idx * Math.PI * 2 / 3) + time;
            const orbitRadius = 15;
            quark.x = composite.x + Math.cos(angle) * orbitRadius;
            quark.y = composite.y + Math.sin(angle) * orbitRadius;
            quark.vx = 0;
            quark.vy = 0;
          });
        }
      });

      // Draw gluon connections between nearby free quarks
      const freeQuarks = particlesRef.current.filter(p => !p.partOfComposite);
      freeQuarks.forEach((particle, i) => {
        freeQuarks.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const alpha = 1 - distance / 80;
            ctx.strokeStyle = `hsla(60, 100%, 60%, ${alpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });

      // Draw and update particles
      particlesRef.current.forEach((particle, i) => {
        if (!particle.partOfComposite && !particle.dragging) {
          // Electromagnetic force between free quarks
          particlesRef.current.forEach((other, j) => {
            if (i >= j || other.partOfComposite || other.dragging) return;
            
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100 && distance > 20) {
              const force = (particle.charge * other.charge) / (distance * distance);
              const fx = (dx / distance) * force * -1.5;
              const fy = (dy / distance) * force * -1.5;
              
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
          particle.vx *= 0.97;
          particle.vy *= 0.97;
        }

        // Draw particle
        const config = particleConfig[particle.type];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = config.color;
        ctx.shadowBlur = particle.dragging ? 25 : 15;
        ctx.shadowColor = config.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw charge indicator for free quarks
        if (particle.charge !== 0 && !particle.partOfComposite) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = particle.charge > 0 ? "hsla(10, 100%, 60%, 0.5)" : "hsla(200, 100%, 60%, 0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw labels
        if (showLabels && !particle.partOfComposite) {
          ctx.fillStyle = "hsl(var(--foreground))";
          ctx.font = "bold 10px system-ui";
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
  }, [showLabels]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if clicking on a free quark
    const clickedParticle = particlesRef.current.find(p => {
      if (p.partOfComposite) return false;
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      return Math.sqrt(dx * dx + dy * dy) < p.radius;
    });

    if (clickedParticle) {
      draggedParticleRef.current = clickedParticle.id;
      clickedParticle.dragging = true;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (draggedParticleRef.current !== null) {
      const particle = particlesRef.current.find(p => p.id === draggedParticleRef.current);
      if (particle) {
        particle.x = mouseRef.current.x;
        particle.y = mouseRef.current.y;
        particle.vx = 0;
        particle.vy = 0;
      }
    }
  };

  const handleMouseUp = () => {
    if (draggedParticleRef.current !== null) {
      const particle = particlesRef.current.find(p => p.id === draggedParticleRef.current);
      if (particle) {
        particle.dragging = false;
      }
      draggedParticleRef.current = null;
      
      // Check if quarks can form composite
      checkQuarkProximity();
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Interactive Particle Builder
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag quarks together to form protons (2 up + 1 down) and neutrons (1 up + 2 down)!
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? "Hide Labels" : "Show Labels"}
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <Button onClick={() => addQuark("quark-up")} size="sm" className="gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig["quark-up"].color }} />
          Add Up Quark
        </Button>
        <Button onClick={() => addQuark("quark-down")} size="sm" variant="secondary" className="gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: particleConfig["quark-down"].color }} />
          Add Down Quark
        </Button>
        <Button onClick={resetSimulation} size="sm" variant="outline">
          Reset
        </Button>
        <div className="ml-auto flex gap-3 text-sm">
          <Badge variant="default">Protons: {stats.protons}</Badge>
          <Badge variant="secondary">Neutrons: {stats.neutrons}</Badge>
          <Badge variant="outline">Free Quarks: {stats.freeQuarks}</Badge>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-96 rounded-lg bg-background/80 cursor-grab active:cursor-grabbing border border-border"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          <strong>How to play:</strong> Click "Add Up/Down Quark" to spawn quarks, then drag them together. 
          Get 3 quarks close enough and they'll combine! Proton = 2 up + 1 down. Neutron = 1 up + 2 down.
        </p>
      </div>
    </Card>
  );
};