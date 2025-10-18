"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isExternal?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  isExternal = false,
}: ButtonProps) => {
  // Base styles
  const baseStyles =
    "font-semibold rounded-2xl transition-all duration-300 inline-block text-center";

  // Size variants
  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  // Variant styles - Professional and conversion-focused
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 font-semibold",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    glass:
      "glass-card text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800",
    outline:
      "border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-700",
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${
    variantStyles[variant]
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  // Motion props - Subtle and professional
  const motionProps = {
    whileHover: disabled
      ? {}
      : {
          scale: 1.02,
          transition: { duration: 0.2 },
        },
    whileTap: disabled ? {} : { scale: 0.98 },
  };

  // Render as external link
  if (href && isExternal) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  // Render as internal anchor link
  if (href && href.startsWith("#")) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  // Render as Next.js Link
  if (href) {
    return (
      <motion.div {...motionProps} style={{ width: "fit-content" }}>
        <Link
          href={
            href as
              | "/"
              | "/about"
              | "/experience"
              | "/projects"
              | "/contact"
              | "/quote"
          }
          className={buttonClasses}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  // Render as button
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;
