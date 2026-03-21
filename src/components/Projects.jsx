import { motion } from "framer-motion";
import InView, { fadeUp, stagger } from "./InView";
import { GRAPHIC_ROW1, GRAPHIC_ROW2, UIUX_PROJECTS } from "../constants/data";

function GCard({ p, i }) {
  const card = (
    <motion.div className="gcard" variants={fadeUp} custom={i % 4} whileHover={{ scale: 1.02 }}>
      <div className="gcard-img-wrap">
        <img src={p.img} alt={p.title} className="gcard-img" />
      </div>
      <p className="gcard-title">{p.title}</p>
    </motion.div>
  );
  return p.link ? <a href={p.link} target="_blank" rel="noreferrer">{card}</a> : card;
}

export default function Projects() {
  return (
    <InView id="projects" className="projects-section">
      <motion.div className="designs-head" variants={fadeUp}>
        <p className="designs-sub">Lets have a look at my</p>
        <h2 className="designs-title">Designs</h2>
      </motion.div>

      <motion.h3 className="sub-heading" variants={fadeUp}>Graphic Design Works</motion.h3>
      <motion.div className="grid-4" variants={stagger}>
        {GRAPHIC_ROW1.map((p, i) => <GCard key={p.title} p={p} i={i} />)}
      </motion.div>
      <motion.div className="grid-3" variants={stagger}>
        {GRAPHIC_ROW2.map((p, i) => <GCard key={p.title} p={p} i={i} />)}
      </motion.div>

      <motion.h3 className="sub-heading" variants={fadeUp} style={{ marginTop: 64 }}>UIUX Design Works</motion.h3>
      <div className="uiux-list">
        {UIUX_PROJECTS.map((p, i) => (
          <motion.div key={p.title} className="uiux-row" variants={fadeUp} custom={i}>
            <div className="uiux-left">
              <img src={p.img} alt={p.title} className="uiux-img" />
              <p className="uiux-img-title">{p.title}</p>
            </div>
            <div className="uiux-right">
              <p className="uiux-desc">{p.desc}</p>
              <motion.a 
                href={p.link} 
                target="_blank" 
                rel="noreferrer" 
                className="view-btn" 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.96 }}
              >
                View Project
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.h3 className="sub-heading cyan center" variants={fadeUp} style={{ marginTop: 80 }}>My Edits</motion.h3>
      <motion.div className="edits-cta" variants={fadeUp} custom={1}>
        <motion.a
          href="https://drive.google.com/drive/folders/1FqMTHGMpMR1v0YAuI1NQih2jTVfsyaOf"
          target="_blank" rel="noreferrer"
          className="view-btn"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        >
          View my works
        </motion.a>
        <p className="edits-headline">
          Have an Awesome Project<br />
          <span className="orange">Idea? Let's Discuss</span>
        </p>
      </motion.div>
    </InView>
  );
}
