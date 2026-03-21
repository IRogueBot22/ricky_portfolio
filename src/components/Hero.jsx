import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-title-img-wrap"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/assets/hero.png" alt="Ricky Raj" className="hero-title-img" />
      </motion.div>

      <motion.div
        className="hero-img-wrap"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="https://framerusercontent.com/images/NToqkty8hspmkn5qNpKQBTkw.png?width=800"
          alt="Ricky Raj"
          className="hero-img"
        />
      </motion.div>
    </section>
  );
}
