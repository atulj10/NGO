import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Impact from "./components/Impact";
import Objectives from "./components/Objectives";
import WhatWeDo from "./components/WhatWeDo";
import JoinUs from "./components/JoinUs";
import Footer from "./components/Footer";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Objectives />
        <WhatWeDo />
        <JoinUs />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
