import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-title-img-wrap"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/assets/hero.png" alt="Ricky Raj" className="hero-title-img" />
      </motion.div>

      <motion.div
        className="hero-img-wrap"
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
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
