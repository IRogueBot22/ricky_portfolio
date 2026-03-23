import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Experience from "./components/Experience";
import WhyHire from "./components/WhyHire";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experience />
        <WhyHire />
        <Tools />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
