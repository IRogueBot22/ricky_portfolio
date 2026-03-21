import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import InView, { fadeUp } from "./InView";

export default function Footer() {
  return (
    <InView id="contact" className="footer-section">
      <motion.h2 className="footer-connect" variants={fadeUp}>Let's Connect</motion.h2>
      <div className="footer-grid">
        <motion.div className="footer-brand" variants={fadeUp}>
          <p className="footer-name">Ricky Raj illuri</p>
          <p className="footer-quote">
            "I design digital experiences that are simple, clear, and visually memorable.
            From interfaces to graphics, my work balances usability, strong typography,
            and a consistent visual voice."
          </p>
          <div className="footer-socials">
            <motion.a
              href="https://www.instagram.com/rix.designs._"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              whileHover={{ scale: 1.12 }}
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/illuri-ricky-raj-04197a32a/"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              whileHover={{ scale: 1.12 }}
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </motion.div>
        <motion.div className="footer-col" variants={fadeUp} custom={1}>
          <p className="footer-col-title">Navigation</p>
          {[
            { label: "Home", href: "#home" },
            { label: "Service", href: "#services" },
            { label: "Resume", href: "/Ricky_illluri_Resume.pdf", external: true },
            { label: "Projects", href: "#projects" }
          ].map(l => (
            <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined} className="footer-link">{l.label}</a>
          ))}
        </motion.div>
        <motion.div className="footer-col" variants={fadeUp} custom={2}>
          <p className="footer-col-title">Contact</p>
          <a href="tel:+917330844997" className="footer-link">+91 7330844997</a>
          <a href="mailto:rickyilluri008@gmail.com" className="footer-link">rickyilluri008@gmail.com</a>
        </motion.div>
      </div>
    </InView>
  );
}
