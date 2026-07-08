import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { DESIGN_PROCESS } from "../constants/data";

export default function DesignProcess() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const cardRefs = useRef([]);

  const [pathLength, setPathLength] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, heights: Array(DESIGN_PROCESS.length).fill(0) });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure container width and card heights dynamically
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const width = containerRef.current.offsetWidth;
      const heights = cardRefs.current.map(el => el ? el.offsetHeight : 0);
      setDimensions({ width, heights });
    };

    updateDimensions();
    
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    cardRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  // Compute Layout to guarantee EXACTLY a 10px vertical gap between the bottom of one card and the top of the next
  const gap = 10;
  let currentY = 0;
  const cardPositions = dimensions.heights.map(h => {
    const top = currentY;
    const center = top + h / 2;
    currentY += h + gap;
    return { top, center, height: h };
  });
  
  const totalHeight = Math.max(currentY + 100, 400); // 100px padding at bottom

  // Generate dynamic SVG path in absolute DOM pixels that matches the exact shape of the original S-curve
  const svgWidth = dimensions.width || 1000;
  // Use exactly 30% and 70% to match the safe zones so the path NEVER overlaps the cards
  const leftX = svgWidth * 0.3;
  const rightX = svgWidth * 0.7;
  const startX = svgWidth / 2;

  const wayPointPositions = [];
  let svgPath = `M ${startX} 0`;
  
  cardPositions.forEach((pos, i) => {
    if (pos.height === 0) return;
    // Dot on right for card 0, left for card 1, to match the safe zones
    const isLeft = i % 2 !== 0;
    const dotX = isLeft ? leftX : rightX;
    const dotY = pos.center;
    wayPointPositions.push({ x: dotX, y: dotY });
    
    if (i === 0) {
      const cpY = dotY * 0.6;
      svgPath += ` C ${startX} ${cpY}, ${dotX} ${cpY}, ${dotX} ${dotY}`;
    } else {
      const prevDot = wayPointPositions[i - 1];
      // Use 0.4 and 0.6 bezier points to mathematically replicate the beautiful S-curve belly of the original design
      const cp1Y = prevDot.y + 0.4 * (dotY - prevDot.y);
      const cp2Y = prevDot.y + 0.6 * (dotY - prevDot.y);
      svgPath += ` C ${prevDot.x} ${cp1Y}, ${dotX} ${cp2Y}, ${dotX} ${dotY}`;
    }
  });
  
  if (wayPointPositions.length > 0) {
    const lastDot = wayPointPositions[wayPointPositions.length - 1];
    const cpY1 = lastDot.y + 0.4 * (totalHeight - lastDot.y);
    const cpY2 = lastDot.y + 0.6 * (totalHeight - lastDot.y);
    svgPath += ` C ${lastDot.x} ${cpY1}, ${startX} ${cpY2}, ${startX} ${totalHeight}`;
  } else {
    svgPath = `M ${startX} 0 L ${startX} ${totalHeight}`;
  }

  // Update path length dynamically
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [svgPath, dimensions]);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const dashOffset = useTransform(scrollYProgress, [0.1, 0.9], [pathLength, 0]);

  // Track active step for the orange glowing trail effect
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReducedMotion || totalHeight === 0) return;
    
    const progress = Math.min(Math.max((v - 0.1) / 0.8, 0), 1);
    const currentScrollY = progress * totalHeight;

    let newActive = -1;
    for (let i = cardPositions.length - 1; i >= 0; i--) {
      if (currentScrollY >= cardPositions[i].top - 60) {
        newActive = i;
        break;
      }
    }
    setActiveStep(newActive);
  });

  const isReduced = prefersReducedMotion;

  return (
    <section ref={sectionRef} className="dp-section">
      <div className="dp-header">
        <motion.h2
          className="dp-heading"
          initial={isReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          MY <span className="orange">DESIGN</span> PROCESS
        </motion.h2>
        <motion.p
          className="dp-subtitle"
          initial={isReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The design thinking framework I follow on every project — from first
          conversation to final delivery.
        </motion.p>
      </div>

      <div 
        className="dp-path-container" 
        ref={containerRef} 
        style={{ height: `${totalHeight}px`, position: "relative" }}
      >
        {/* SVG winding path */}
        <svg
          className="dp-svg"
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8784a" />
              <stop offset="50%" stopColor="#d4a853" />
              <stop offset="100%" stopColor="#e8784a" />
            </linearGradient>
            <filter id="markerGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background dim path */}
          <path
            d={svgPath}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Animated trail path */}
          {!isReduced && (
            <motion.path
              ref={pathRef}
              d={svgPath}
              stroke="url(#pathGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              style={{ strokeDashoffset: dashOffset }}
            />
          )}

          {/* Static path for reduced motion */}
          {isReduced && (
            <path
              ref={pathRef}
              d={svgPath}
              stroke="url(#pathGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Waypoint dots */}
          {wayPointPositions.map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={activeStep >= i || isReduced ? 8 : 5}
              fill={activeStep >= i || isReduced ? "#e8784a" : "rgba(255,255,255,0.15)"}
              stroke={activeStep >= i || isReduced ? "#d4a853" : "rgba(255,255,255,0.08)"}
              strokeWidth="2"
              style={{
                transition: "all 0.4s ease",
                filter: activeStep === i ? "drop-shadow(0 0 8px rgba(232,120,74,0.6))" : "none",
              }}
            />
          ))}
        </svg>

        {/* Step cards */}
        <div className="dp-cards-overlay">
          {DESIGN_PROCESS.map((step, i) => {
            const isLeft = i % 2 !== 0;
            const isActive = activeStep >= i || isReduced;
            const pos = cardPositions[i];
            
            // Due to CSS transform: translateY(-50%), top needs to be set to the card`s vertical center
            const centerTop = pos ? `${pos.center}px` : "0px";

            return (
              <motion.div
                key={step.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`dp-step-card ${isLeft ? "dp-card-left" : "dp-card-right"} ${isActive ? "active" : ""}`}
                style={{ top: centerTop }}
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isReduced ? 0 : 0.1,
                }}
              >
                <div className="dp-step-number-wrap">
                  <span className="dp-step-number">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="dp-step-content">
                  <span className="dp-step-icon">{step.icon}</span>
                  <h3 className="dp-step-title">{step.title}</h3>
                  <p className="dp-step-desc">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

