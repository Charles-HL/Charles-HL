import Navigation from "./Navigation";
import Footer from "./Footer";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import AnimatedBackground from "./AnimatedBackground";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Landing pages use the animated particles; inner pages the static gradient. */
  background?: "animated" | "static";
  className?: string;
}

function StaticBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-purple-900/80">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-300 opacity-30 mix-blend-multiply blur-xl filter" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-purple-300 opacity-30 mix-blend-multiply blur-xl filter" />
      {/* Motif de grille subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.6) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

const PageLayout = ({
  children,
  background = "static",
  className = "",
}: PageLayoutProps) => {
  return (
    <div
      className={`relative min-h-screen overflow-x-clip ${
        background === "static"
          ? "bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
          : ""
      } ${className}`}
    >
      {background === "animated" ? <AnimatedBackground /> : <StaticBackground />}
      <Logo />
      <LanguageToggle />
      <Navigation />

      <main id="main" className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
