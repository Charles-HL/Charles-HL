"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Database, Brain, Layers, ExternalLink, Cpu } from "lucide-react";
import Button from "./Button";

const About = () => {
  const t = useTranslations("about");

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t("skills.frontend"),
      description: "React, Next.js, Vue.js, Angular, TypeScript",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: t("skills.backend"),
      description: "Node.js, Java, Python, Spring Boot, APIs REST, C#",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: t("skills.ai"),
      description: "Machine Learning, Deep Learning, TensorFlow, PyTorch, XAI",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("skills.data"),
      description:
        "Reinforcement Learning, NLP, Dataiku DSS, Data Visualization",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: t("skills.robotics"),
      description: "Robotic Arms, Trajectory Optimization, DDPG, MADDPG",
      color: "from-indigo-500 to-blue-500",
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
          {/* Photo placeholder - positioned absolutely to not affect layout */}
          <motion.div
            variants={itemVariants}
            className="absolute top-0 right-4 md:right-8 lg:right-16 will-change-transform"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <span className="text-sm md:text-base lg:text-lg font-bold text-gray-400 dark:text-gray-500">
                  CHL
                </span>
              </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                }}
                className="glass-card rounded-2xl p-6 transition-all duration-300 group glass-hover will-change-transform"
              >
                <div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${skill.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {skill.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {skill.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
          <div className="glass-nav rounded-2xl p-8 text-gray-900 dark:text-white border border-white/20">
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
