import { domAnimation, LazyMotion, m, MotionConfig } from 'framer-motion';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <m.main
          id="main"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="outline-none"
        >
          <Hero />
          <div className="section-divider" aria-hidden="true" />
          <Services />
          <Skills />
          <Projects />
          <Experience />
          <Process />
          <Testimonials />
          <Faq />
          <Contact />
        </m.main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
