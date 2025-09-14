import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Logo />
      <LanguageToggle />
      <Navigation />
      <div className="relative z-10">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </div>
    </main>
  );
}
