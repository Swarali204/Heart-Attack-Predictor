import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="h-7 w-7 text-primary animate-heartbeat" fill="currentColor" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">CardioPredict</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard">
                <Button size="sm" variant="outline" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <button onClick={logout} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 p-4 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user ? (
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button size="sm" variant="outline" className="rounded-full">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button size="sm" className="rounded-full bg-primary">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
