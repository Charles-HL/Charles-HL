import Navigation from "./Navigation";
import Footer from "./Footer";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import AnimatedBackground from "./AnimatedBackground";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <main
      className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 ${className}`}
    >
      <div className="z-0 absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-purple-900/80">
        {/* Animated geometric shapes - plus subtiles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float will-change-transform"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float will-change-transform"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-200 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float will-change-transform"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-100 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-24 animate-float will-change-transform"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Motif de grille subtil */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.6) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative">
        {/* <AnimatedBackground /> */}
        <Logo />
        <LanguageToggle />
        <Navigation />

        <div className="relative z-10">{children}</div>

        <Footer />
      </div>
    </main>
  );
};

export default PageLayout;
