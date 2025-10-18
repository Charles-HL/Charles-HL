"use client";

import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import projectsData from "../../data/projects.json";
import { motion } from "framer-motion";
import Button from "./Button";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const t = useTranslations("projects");
  const locale = useLocale();

  // Show only the first 3 projects for the home page
  const featuredProjects = projectsData.projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-900/90 dark:to-gray-800/90"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              index={index}
              maxTechnologies={3}
              buttonText={t("viewProject")}
            />
          ))}
        </div>

        {/* CTA to Full Projects Page */}
        <div className="flex justify-center items-center mt-8 w-full text-center">
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            className="inline-flex items-center"
          >
            {t("viewAll")}
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
