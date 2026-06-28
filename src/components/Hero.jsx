import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ color: "#ffffff", textAlign: "left", width: "100%", maxWidth: "600px", marginRight: "auto" }}
      >
        <h1 style={{ fontSize: "4rem", fontWeight: "800", lineHeight: "1.2", margin: 0 }}>
          Hello, I am<br />
          <span style={{ color: "#ED8A00" }}>illuri Ricky Raj</span>
        </h1>
      </motion.div>
    </section>
  );
}
