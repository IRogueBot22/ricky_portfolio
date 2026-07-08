import Navbar from "./components/Navbar";
import HeroServicesScroll from "./components/HeroServicesScroll";
import DesignProcess from "./components/DesignProcess";
import Experience from "./components/Experience";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroServicesScroll />
        <DesignProcess />
        <Experience />
        <Tools />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
