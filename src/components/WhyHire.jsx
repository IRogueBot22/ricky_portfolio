import { motion } from "framer-motion";
import InView, { fadeUp } from "./InView";

export default function WhyHire() {
  return (
    <InView className="why-wrap">
      <motion.div className="why-card" variants={fadeUp}>
        <h2 className="why-title">Why <span className="orange">Hire me</span>?</h2>
        <p className="why-desc">
          I am a creative, fast‑learning designer with a strong eye for layout, typography, and color, 
          focused on making designs both visually appealing and easy to use.
        </p>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">7</span>
            <span className="stat-label">Graphic Design Projects Completed</span>
          </div>
          <div className="stat">
            <span className="stat-num">2</span>
            <span className="stat-label">UI/UX Interface Designs Completed</span>
          </div>
        </div>
        <motion.a 
          href="#contact" 
          className="hire-btn" 
          whileHover={{ background: "#1a1a1a", color: "#fff" }} 
          whileTap={{ scale: 0.96 }}
        >
          Hire me
        </motion.a>
      </motion.div>
    </InView>
  );
}
