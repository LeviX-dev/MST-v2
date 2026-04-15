import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import mstLogo from "./assests/mst-logo.svg";

const links = [
  { path: "/", label: "Home" },
  { path: "/ecosystem", label: "Ecosystem" },
  { path: "/solutions", label: "Solutions" },
  { path: "/build-with-mst", label: "Build with MST" },
  { path: "/about", label: "About" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
              <img src={mstLogo} alt="MST" className="w-8 h-8" />
          <span className="font-display font-bold text-lg text-foreground">
            MST <span className="text-gradient-primary">Blockchain</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/build-with-mst"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity pulse-glow"
          >
            Launch App
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden glass-strong mt-2 mx-4 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/build-with-mst"
                className="mt-2 px-4 py-3 text-center text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
