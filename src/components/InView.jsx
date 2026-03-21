import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.55, 
      delay: i * 0.08, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }),
};

export const stagger = { 
  hidden: {}, 
  visible: { 
    transition: { staggerChildren: 0.09 } 
  } 
};

export default function InView({ children, className = "", id, tag = "section" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Tag = motion[tag] || motion.section;
  
  return (
    <Tag 
      id={id} 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={stagger} 
      className={className}
    >
      {children}
    </Tag>
  );
}
