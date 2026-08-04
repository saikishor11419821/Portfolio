import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GridBackground from "./components/Effects/GridBackground";
import ParticleField from "./components/Effects/ParticleField";
import CursorGlow from "./components/Effects/CursorGlow";
import EasterEgg from "./components/Effects/EasterEgg";
import IntroScreen from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedGame from "./components/FeaturedGame";
import GameProjects from "./components/GameProjects";
import GameplayShowcase from "./components/GameplayShowcase";
import AssetVault from "./components/AssetVault";
import Pipeline from "./components/Pipeline";
import TechnicalSystems from "./components/TechnicalSystems";
import Skills from "./components/Skills";
import Resume from "./components/Resume";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="scanlines vignette relative min-h-screen">
      <GridBackground />
      <ParticleField />
      <CursorGlow />
      <EasterEgg />

      <IntroScreen onDone={() => setIntroDone(true)} />

      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <FeaturedGame />
              <GameProjects />
              <GameplayShowcase />
              <AssetVault />
              <Pipeline />
              <TechnicalSystems />
              <Skills />
              <Resume />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
