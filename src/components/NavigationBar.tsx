import { Link, useLocation } from "react-router-dom";
import { Atom, FlaskConical, Globe, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { path: "/", label: "Home", icon: Sparkles },
  { path: "/quantum", label: "Quantum", icon: Sparkles },
  { path: "/protons-neutrons", label: "Nucleons", icon: FlaskConical },
  { path: "/atoms", label: "Atoms", icon: Atom },
  { path: "/greenhouse", label: "Climate", icon: Globe },
];

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Particle Explorer
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Link to={item.path}>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
