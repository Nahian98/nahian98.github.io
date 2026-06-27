import {
  Navbar,
  Footer,
  ScrollProgress,
  BackToTop,
  CustomCursor,
} from '@/components/layout';
import { BackgroundDecoration } from '@/components/common';
import {
  Hero,
  About,
  Skills,
  TechStack,
  Projects,
  Experience,
  // OpenSource, // re-enable alongside <OpenSource /> below
  Contact,
} from '@/sections';

/**
 * Single-page portfolio. All sections live on one page with smooth scrolling;
 * the navbar's scroll-spy tracks the active section. Decorative/utility layers
 * (background, scroll progress, cursor) are siblings of the main content so they
 * never interfere with document flow or accessibility.
 */
export default function HomePage() {
  return (
    <>
      <BackgroundDecoration />
      <ScrollProgress />
      <Navbar />
      <CustomCursor />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Experience />
        {/* <OpenSource /> */}
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
