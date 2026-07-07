import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES } from "../constants/data";
import { ChevronUp } from "lucide-react";

export default function HeroServicesScroll() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

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
              {SERVICES.map((s, i) => (
                <div key={s.title} className="service-row">
                  <span className="service-row-title">{i + 1}. {s.title.toUpperCase()}</span>
                  <ChevronUp size={24} className="service-row-icon" />
                </div>
              ))}
            </div>
          </div>
          <div className="services-right-spacer"></div>
        </section>

      </div>
    </div>
  );
}
