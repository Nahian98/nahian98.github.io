import { Navbar, Footer } from '@/components/layout';
import { Hero, About, Experience, Projects, Skills, Education, Contact } from '@/sections';

/** Single-page portfolio; the navbar's scroll-spy tracks the active section. */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
