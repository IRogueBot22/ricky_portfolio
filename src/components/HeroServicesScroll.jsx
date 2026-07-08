import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SERVICES } from "../constants/data";
import { ChevronUp } from "lucide-react";

// Custom brief with spring slide-up typographic animation
const ServiceBrief = ({ text }) => {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };
  
  const wordVariants = {
    hidden: { 
      y: "100%",
      rotate: 6
    },
    visible: { 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 14,
      }
    }
  };

  return (
    <motion.p 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", margin: 0, overflow: "hidden" }}
    >
      {words.map((word, idx) => (
        <span 
          key={idx} 
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "2px" }}
        >
          <motion.span 
            variants={wordVariants}
            style={{ display: "inline-block", originX: 0, originY: 1 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export default function HeroServicesScroll() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 960);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The wrapper is 2 sections tall.
  // As we scroll through it, scrollYProgress goes 0 -> 1.
  const cardRotateY = useTransform(scrollYProgress, [0.2, 0.8], [0, 180]);
  const cardRotateZ = useTransform(scrollYProgress, [0.2, 0.8], [0, 6]);
  
  const desktopX = ["0vw", "22vw"];
  const mobileX = ["0vw", "0vw"];
  // On mobile, services section stacks vertically, so the image spacer is further down.
  // We'll move it down slightly on mobile.
  const desktopY = ["0vh", "0vh"];
  const mobileY = ["0vh", "20vh"];
  
  const cardX = useTransform(scrollYProgress, [0.2, 0.8], isDesktop ? desktopX : mobileX);
  const cardY = useTransform(scrollYProgress, [0.2, 0.8], isDesktop ? desktopY : mobileY);

  return (
    <div ref={containerRef} className="hero-services-wrapper" style={{ position: "relative" }}>
      
        {/* --- STICKY 3D CARD OVERLAY --- */}
      <div 
        className="sticky-card-layer" 
        style={{ 
          position: "sticky", 
          top: 0, 
          height: "100vh", 
          zIndex: 10, 
          pointerEvents: "none", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        <motion.div 
          className="card-3d-wrapper"
          style={{ x: cardX, y: cardY, pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ y: 300, rotateY: -90 }}
            animate={{ y: 0, rotateY: 0 }}
            transition={{
              y: { duration: 1.2, ease: "easeOut" },
              rotateY: { duration: 1.2, ease: "easeOut" }
            }}
            style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="card-3d"
              style={{ rotateY: cardRotateY, rotateZ: cardRotateZ }}
            >
              <div className="card-face card-front">
                <img src="/bg_img.png" alt="Profile" className="hero-img" />
              </div>
              <div className="card-face card-back">
                <img src="/assets/service.jpg" alt="Services" className="service-img" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- NORMAL DOCUMENT FLOW (Underneath Sticky Layer) --- */}
      <div style={{ position: "relative", zIndex: 5, marginTop: "-100vh" }}>
        
        {/* HERO SECTION */}
        <section id="home" className="hero-layer" style={{ minHeight: "100vh", marginBottom: "25vh", display: "flex", alignItems: "center", justifyContent: "center", overflowX: "clip" }}>
          <motion.div 
            className="hero-left"
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="hero-left-inner">
              <h1 className="hero-name">ILLURI RICKY RAJ</h1>
              <p className="hero-big-text">DIGITAL</p>
            </div>
          </motion.div>
          <div className="hero-center-spacer"></div>
          <motion.div 
            className="hero-right"
            initial={{ x: "50vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="hero-big-text">DESIGNER</p>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="services-layer" style={{ display: "flex", alignItems: "center", padding: "120px 18px", maxWidth: "1400px", margin: "0 auto 25vh auto" }}>
          <div className="services-left">
            <h2 className="services-heading">WHAT I CAN DO FOR YOU</h2>
            <p className="services-subtitle">
              As a digital designer, I transform ideas into engaging visual experiences.
            </p>
            <div className="services-accordion">
              {SERVICES.map((s, i) => {
                const isOpen = expandedIndex === i;
                return (
                  <div 
                    key={s.title} 
                    className="service-item-wrapper" 
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div 
                      className="service-row" 
                      onClick={() => setExpandedIndex(isOpen ? null : i)}
                      style={{ borderBottom: "none", padding: "28px 0" }}
                    >
                      <span className="service-row-title">{i + 1}. {s.title.toUpperCase()}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ChevronUp size={24} className="service-row-icon" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { height: "auto", opacity: 1, marginBottom: 24 },
                            collapsed: { height: 0, opacity: 0, marginBottom: 0 }
                          }}
                          transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="service-brief-container" style={{ color: "var(--muted)", fontSize: "clamp(13px, 1.6vw, 16px)", lineHeight: "1.7", maxWidth: "600px" }}>
                            <ServiceBrief text={s.desc} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="services-right-spacer"></div>
        </section>

      </div>
    </div>
  );
}
