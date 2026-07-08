import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { DESIGN_PROCESS } from "../constants/data";

// Waypoint percentages along the path for each step (aligns with the extrema of the curve)
const WAYPOINTS = [0.14, 0.28, 0.43, 0.57, 0.71];

export default function DesignProcess() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Stroke dashoffset drives the "trail" effect
  const dashOffset = useTransform(scrollYProgress, [0.1, 0.9], [pathLength, 0]);

  // Track active step
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pathRef.current || pathLength === 0 || prefersReducedMotion) return;

    const progress = Math.min(Math.max((v - 0.1) / 0.8, 0), 1);

    // Determine active step
    let newActive = -1;
    for (let i = WAYPOINTS.length - 1; i >= 0; i--) {
      if (progress >= WAYPOINTS[i] - 0.05) {
        newActive = i;
        break;
      }
    }
    setActiveStep(newActive);
  });

  // Compute waypoint pixel positions for card placement
  const [wayPointPositions, setWayPointPositions] = useState([]);
  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const positions = WAYPOINTS.map((wp) => {
        const pt = pathRef.current.getPointAtLength(wp * pathLength);
        return { x: pt.x, y: pt.y };
      });
      setWayPointPositions(positions);
    }
  }, [pathLength]);

  // The fixed S-curve path, widened viewBox to 1000 so the path is strictly in the middle (300 to 700)
  // This allows the cards to be placed in the safe zones (0-300 and 700-1000) without overlapping the path.
  const svgPath =
    "M 500 0 C 500 80, 700 120, 700 200 S 300 320, 300 400 S 700 520, 700 600 S 300 720, 300 800 S 700 920, 700 1000 S 300 1120, 300 1200 S 500 1320, 500 1400";

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

      <div className="dp-path-container">
        {/* SVG winding path */}
        <svg
          className="dp-svg"
          viewBox="0 0 1000 1400"
          preserveAspectRatio="xMidYMid meet"
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
            // i=0 -> dot is at x=700 (right), so card must be on the RIGHT
            // i=1 -> dot is at x=300 (left), so card must be on the LEFT
            const isLeft = i % 2 !== 0; 
            const isActive = activeStep >= i || isReduced;
            const wpY = wayPointPositions[i]
              ? (wayPointPositions[i].y / 1400) * 100
              : (WAYPOINTS[i] * 100);

            return (
              <motion.div
                key={step.title}
                className={`dp-step-card ${isLeft ? "dp-card-left" : "dp-card-right"} ${isActive ? "active" : ""}`}
                style={{ top: `${wpY}%` }}
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
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

