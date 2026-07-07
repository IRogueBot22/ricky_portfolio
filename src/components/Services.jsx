import { motion } from "framer-motion";
import InView, { fadeUp, stagger } from "./InView";
import { SERVICES } from "../constants/data";
import { ChevronUp } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="services-section">
      <InView className="services-inner-new">
        <div className="services-left">
          <motion.h2 className="services-heading" variants={fadeUp}>
            WHAT I CAN DO FOR YOU
          </motion.h2>
          <motion.p className="services-subtitle" variants={fadeUp}>
            As a digital designer, I transform ideas into engaging visual experiences.
          </motion.p>
          <motion.div className="services-accordion" variants={stagger}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} className="service-row" variants={fadeUp}>
                <span className="service-row-title">{i + 1}. {s.title.toUpperCase()}</span>
                <ChevronUp size={24} className="service-row-icon" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="services-right" style={{ perspective: "1500px" }}>
          <motion.div
            initial={{ rotateY: -180, opacity: 0, scale: 0.8 }}
            whileInView={{ rotateY: 0, opacity: 1, rotateZ: 6, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="service-img-wrap"
          >
            <img src="/assets/service.jpg" alt="Services" className="service-img" />
          </motion.div>
        </div>
      </InView>
    </section>
  );
}
