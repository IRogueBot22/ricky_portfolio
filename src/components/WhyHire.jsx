import { motion } from "framer-motion";
import InView, { fadeUp } from "./InView";

export default function WhyHire() {
  return (
    <InView className="why-wrap">
      <motion.div className="why-card" variants={fadeUp}>
        <motion.h2 className="why-title" variants={fadeUp} custom={1}>Why <span className="orange">Hire me</span>?</motion.h2>
        <motion.p className="why-desc" variants={fadeUp} custom={2}>
          I am a creative, fast‑learning designer with a strong eye for layout, typography, and color, 
          focused on making designs both visually appealing and easy to use.
        </motion.p>
        <div className="stats-row">
          <motion.div className="stat" variants={fadeUp} custom={3}>
            <span className="stat-num">7</span>
            <span className="stat-label">Graphic Design Projects Completed</span>
          </motion.div>
          <motion.div className="stat" variants={fadeUp} custom={4}>
            <span className="stat-num">2</span>
            <span className="stat-label">UI/UX Interface Designs Completed</span>
          </motion.div>
        </div>
        <motion.a 
          href="#contact" 
          className="hire-btn" 
          variants={fadeUp} custom={5}
          whileHover={{ background: "#1a1a1a", color: "#fff" }} 
          whileTap={{ scale: 0.96 }}
          aria-label="Hire me - scroll to contact section"
        >
          Hire me
        </motion.a>
      </motion.div>
    </InView>
  );
}
