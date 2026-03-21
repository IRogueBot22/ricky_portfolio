import { motion } from "framer-motion";
import InView, { fadeUp } from "./InView";
import { EXPERIENCE } from "../constants/data";

export default function Experience() {
  return (
    <InView className="exp-section">
      <motion.h2 className="section-title center" variants={fadeUp}>
        My <span className="orange">Work Experience</span>
      </motion.h2>
      <div className="timeline">
        <div className="timeline-line" />
        {EXPERIENCE.map((e, i) => (
          <motion.div key={e.company} className="timeline-row" variants={fadeUp} custom={i}>
            <div className="timeline-left">
              <span className="tl-company">{e.company}</span>
              <span className="tl-period">{e.period}</span>
            </div>
            <div className="timeline-dot-wrap">
              <motion.div
                className="tl-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 220 }}
              />
            </div>
            <div className="timeline-right">
              <span className="tl-role">{e.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </InView>
  );
}
