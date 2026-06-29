import { motion } from "framer-motion";
import InView, { fadeUp, stagger } from "./InView";
import { TOOLS } from "../constants/data";

export default function Tools() {
  return (
    <InView className="tools-section">
      <motion.h2 className="tools-title" variants={fadeUp}>Tools <span className="orange">I Use</span></motion.h2>
      <motion.div className="tools-row" variants={stagger}>
        {TOOLS.map((t, i) => (
          <motion.div 
            key={t.name} 
            className="tool-item" 
            variants={fadeUp} 
            custom={i}
          >
            <img src={t.img} alt={t.name} className="tool-img" />
            <span className="tool-name">{t.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </InView>
  );
}
