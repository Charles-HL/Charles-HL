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
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-lg",
    lg: "px-10 py-4 text-xl",
  };

  // Variant styles
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl backdrop-blur-sm",
    secondary:
      "glass-card text-blue-600 dark:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10",
    glass:
      "glass-card text-blue-600 dark:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10",
    outline:
      "glass-light border-2 border-blue-600/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20 dark:hover:bg-blue-400/20",
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${
    variantStyles[variant]
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  // Motion props
  const motionProps = {
    whileHover: disabled
      ? {}
      : {
          scale: 1.05,
          ...(variant === "primary" && {
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }),
        },
    whileTap: disabled ? {} : { scale: 0.95 },
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
