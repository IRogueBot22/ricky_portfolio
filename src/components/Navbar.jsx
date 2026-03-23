import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Service", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="navbar"
        aria-label="Main Navigation"
      >
        <div className="nav-inner">
          <ul className="nav-pills">
            {links.map((l) => (
              <li key={l.label} className="nav-pill-item">
                <motion.a 
                  href={l.href} 
                  className={`nav-pill ${l.label === "Home" ? "active" : ""}`}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.96 }}
                >
                  {l.label}
                </motion.a>
              </li>
            ))}
          </ul>
          <button 
            className="hamburger" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="mobile-menu"
            >
              {links.map((l) => (
                <a 
                  key={l.label} 
                  href={l.href} 
                  className="mobile-link" 
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
