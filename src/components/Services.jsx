import { motion } from "framer-motion";
import InView, { fadeUp } from "./InView";
import { SERVICES } from "../constants/data";

const SVC_ICONS = {
  "UI/UX Design": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  "Graphic Design": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>
  ),
  "Video Editing": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      <img 
        src="/assets/services-bg.png" 
        alt="" 
        className="services-bg" 
        aria-hidden="true" 
      />
      <div className="services-content">
        <InView className="services-inner">
          <motion.h2 className="section-title" variants={fadeUp}>
            My <span className="orange">Services</span>
          </motion.h2>
          <div className="services-list">
            {SERVICES.map((s, i) => (
              <motion.div 
                key={s.title} 
                className="service-card" 
                variants={fadeUp} 
                custom={i} 
                whileHover={{ x: 6 }}
              >
                <div className="service-header">
                  <span className="service-icon" aria-hidden="true">{SVC_ICONS[s.title]}</span>
                  <h3 className="service-title">{s.title}</h3>
                </div>
                <div className="service-divider" />
                <p className="service-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}
