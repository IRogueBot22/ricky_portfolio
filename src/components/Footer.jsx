import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import InView, { fadeUp } from "./InView";

export default function Footer() {
  return (
    <footer>
      <InView id="contact" className="footer-section">
        <motion.h2 className="footer-connect" variants={fadeUp}>Let's Connect</motion.h2>
        <div className="footer-grid">
          <div className="footer-brand">
            <motion.p className="footer-name" variants={fadeUp} custom={1}>Ricky Raj illuri</motion.p>
            <motion.p className="footer-quote" variants={fadeUp} custom={2}>
              "I design digital experiences that are simple, clear, and visually memorable.
              From interfaces to graphics, my work balances usability, strong typography,
              and a consistent visual voice."
            </motion.p>
            <motion.div className="footer-socials" variants={fadeUp} custom={3}>
              <motion.a
                href="https://www.instagram.com/rix.designs._"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                whileHover={{ scale: 1.12 }}
                aria-label="Visit my Instagram profile"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/illuri-ricky-raj-04197a32a/"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                whileHover={{ scale: 1.12 }}
                aria-label="Visit my LinkedIn profile"
              >
                <Linkedin size={20} />
              </motion.a>
            </motion.div>
          </div>
          <motion.div className="footer-col" variants={fadeUp} custom={4}>
            <p className="footer-col-title">Navigation</p>
            {[
              { label: "Home", href: "#home" },
              { label: "Service", href: "#services" },
              { label: "Resume", href: "/Ricky_illluri_Resume.pdf", external: true },
              { label: "Projects", href: "#projects" }
            ].map((l, i) => (
              <motion.a 
                key={l.label} 
                href={l.href} 
                variants={fadeUp}
                custom={i + 1}
                target={l.external ? "_blank" : undefined} 
                rel={l.external ? "noreferrer" : undefined} 
                className="footer-link"
                aria-label={l.external ? `Download ${l.label}` : `Go to ${l.label} section`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
          <motion.div className="footer-col" variants={fadeUp} custom={5}>
            <p className="footer-col-title">Contact</p>
            <motion.a variants={fadeUp} custom={1} href="tel:+917330844997" className="footer-link" aria-label="Call me at +91 7330844997">+91 7330844997</motion.a>
            <motion.a variants={fadeUp} custom={2} href="mailto:rickyilluri008@gmail.com" className="footer-link" aria-label="Email me at rickyilluri008@gmail.com">rickyilluri008@gmail.com</motion.a>
          </motion.div>
        </div>
      </InView>
    </footer>
  );
}
