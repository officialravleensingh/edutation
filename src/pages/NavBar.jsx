import { useState} from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function NavBar({ toggleTheme, isDarkMode, isThemeLoading }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">Edutation</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Pomodoro</Link>
            <Link to="/videos" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Videos</Link>
            <Link to="/resources" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Resources</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={toggleTheme} 
            variant="ghost" 
            disabled={isThemeLoading}
            className="px-6 py-3 rounded-full font-medium min-w-[80px]">
            {isThemeLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              isDarkMode ? "Light" : "Dark"
            )}
          </Button>
          <button 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-full hover:bg-muted transition">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="md:hidden px-4 pb-4 pt-2 flex gap-6 justify-center">
          <Link to="/" className="block text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMenuOpen(false)}>Pomodoro
          </Link>
          <Link to="/videos" className="block text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMenuOpen(false)}>
            Videos</Link>
          <Link to="/resources" className="block text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMenuOpen(false)}>
            Resources</Link>
        </nav>
      )}
    </header>
  );
}