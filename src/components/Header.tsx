import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b-2 border-primary bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-8 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative font-display text-3xl uppercase tracking-tighter text-primary">
            SubKill
            <span className="absolute -right-5 -top-1 text-sm text-cash-green blink">◉</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#how">How It Works</NavLink>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">
                  <User className="inline-block w-4 h-4 mr-1" />
                  {user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-foreground/60 hover:text-primary"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <a
                href="/auth"
                className="btn-sweep glow-red bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 glow-red-hover"
              >
                Sign In
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 flex flex-col gap-4"
          >
            <NavLink href="#features" mobile>Features</NavLink>
            <NavLink href="#pricing" mobile>Pricing</NavLink>
            <NavLink href="#how" mobile>How It Works</NavLink>
            {user ? (
              <>
                <span className="text-sm text-foreground/60 py-2">
                  <User className="inline-block w-4 h-4 mr-1" />
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-left text-lg py-2 text-foreground/60 hover:text-primary"
                >
                  <LogOut className="inline-block w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <a
                href="/auth"
                className="btn-sweep glow-red bg-primary px-6 py-3 text-center text-sm font-semibold uppercase tracking-widest text-primary-foreground"
              >
                Sign In
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children, mobile }: { href: string; children: React.ReactNode; mobile?: boolean }) => (
  <a
    href={href}
    className={`relative font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary ${
      mobile ? "text-lg py-2" : "text-sm"
    } group`}
  >
    <span className="absolute -left-3 opacity-0 transition-opacity group-hover:opacity-100 text-primary">[</span>
    {children}
    <span className="absolute -right-3 opacity-0 transition-opacity group-hover:opacity-100 text-primary">]</span>
  </a>
);
