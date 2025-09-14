"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:block fixed top-4 left-4 z-50"
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link href="/" className="block">
          <div className="relative group">
            {/* Fond avec glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>

            {/* Logo principal */}
            <div className="relative glass-nav rounded-2xl p-3 transition-all duration-300 group-hover:bg-white/20 dark:group-hover:bg-white/10 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12">
                <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                  CHL
                </span>
              </div>
            </div>

            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
