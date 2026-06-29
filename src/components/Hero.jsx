import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <motion.p 
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ILLURI RICKY RAJ
        </motion.p>
        <motion.h1 
          className="hero-big-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          DIGITAL
        </motion.h1>
      </div>

      <div className="hero-center" style={{ perspective: "1500px" }}>
        <motion.div
          initial={{ opacity: 0, y: 300, rotateY: 90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ 
            y: { duration: 1, ease: "easeIn" },
            rotateY: { duration: 0.9, ease: "easeInOut", delay: 1 },
            opacity: { duration: 0.8 }
          }}
          className="hero-img-wrap"
        >
          <img src="/bg_img.png" alt="Illuri Ricky Raj" className="hero-img" />
        </motion.div>
      </div>

      <div className="hero-right">
        <motion.h1 
          className="hero-big-text"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          DESIGNER
        </motion.h1>
      </div>
    </section>
  );
}
