"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Database, Brain, Layers, ExternalLink, Cpu } from "lucide-react";
import Button from "./Button";
import Image from "next/image";

const About = () => {
  const t = useTranslations("about");

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t("skills.frontend"),
      description: "React, Next.js, Vue.js, Angular, TypeScript",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: t("skills.backend"),
      description: "Node.js, Java, Python, Spring Boot, APIs REST, C#",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: t("skills.ai"),
      description: "Machine Learning, Deep Learning, TensorFlow, PyTorch, XAI",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("skills.data"),
      description:
        "Reinforcement Learning, NLP, Dataiku DSS, Data Visualization",
      color: "from-orange-600 to-orange-700",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: t("skills.robotics"),
      description: "Robotic Arms, Trajectory Optimization, DDPG, MADDPG",
      color: "from-blue-700 to-blue-800",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-12 bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16 relative will-change-transform"
        >
          {/* Profile Photo - Centered on mobile, positioned absolutely on desktop */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6 lg:mb-0 lg:block lg:absolute lg:top-0 lg:right-16 will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-xl">
              <Image
                src="/charles-hl-profile.jpg"
                alt="Charles HL - Full Stack Software Engineer & AI Specialist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 160px"
                priority
              />
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">{t("title")}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="will-change-transform"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            {t("skills.title")}
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 border-2 border-blue-100 dark:border-blue-900/30 shadow-md hover:shadow-xl group "
              >
                <div
                  className={`inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-r ${skill.color} text-white mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-200 shadow-md`}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full">
                      {skill.icon}
                    </div>
                  </div>
                </div>
                <h4 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">
                  {skill.title}
                </h4>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center will-change-transform"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-gray-900 dark:text-white border-2 border-blue-100 dark:border-blue-900/30 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
              {t("additional.title")}
              <span
                className="text-2xl not-italic webkit-text-fill-color-white"
                style={{
                  fontFamily: "system-ui",
                }}
              >
                🇫🇷
              </span>
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              {t("additional.description")}
            </p>
            {/* View More Button */}
            <div className="flex justify-center items-center mt-8 w-full text-center">
              <Button
                href="/about"
                variant="primary"
                size="md"
                className="inline-flex items-center"
              >
                {t("learnMore")}
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
