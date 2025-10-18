"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ProjectCardProps {
  project: {
    id: string;
    title: { [key: string]: string };
    subtitle: { [key: string]: string };
    period: { [key: string]: string };
    type: { [key: string]: string };
    description: { [key: string]: string };
    technologies: string[];
  };
  locale: string;
  index?: number;
  maxTechnologies?: number;
  buttonText?: string;
}

const ProjectCard = ({
  project,
  locale,
  index = 0,
  maxTechnologies = 3,
  buttonText = "View Project",
}: ProjectCardProps) => {
  const CardWrapper = motion.div;
  const motionProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut" as const,
    },
    whileHover: {
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    // Ensure stable final state
    animate: { opacity: 1, y: 0 },
  };

  const cardStyles =
    "bg-white dark:bg-gray-800 rounded-2xl p-6 group border-2 border-blue-100 dark:border-blue-900/30 shadow-md hover:shadow-xl transition-all duration-200 will-change-transform";

  const typeStyles =
    "px-3 py-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-700";

  const titleStyles =
    "text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200";

  const techStyles =
    "inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600";

  const techMoreStyles =
    "inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700";

  const buttonStyles =
    "inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg";

  return (
    <CardWrapper
      className={`${cardStyles} flex flex-col h-full`}
      {...motionProps}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className={typeStyles}>{project.type[locale]}</span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {project.period[locale]}
          </div>
        </div>

        <h3 className={titleStyles}>{project.title[locale]}</h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm font-medium">
          {project.subtitle[locale]}
        </p>

        <p className="text-gray-700 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description[locale]}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, maxTechnologies).map((tech) => (
              <span key={tech} className={techStyles}>
                <Tag className="w-3 h-3 mr-1" />
                {tech}
              </span>
            ))}
            {project.technologies.length > maxTechnologies && (
              <span className={techMoreStyles}>
                +{project.technologies.length - maxTechnologies} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Link
          href={{
            pathname: "/projects/[slug]",
            params: { slug: project.id },
          }}
          className={buttonStyles}
        >
          {buttonText}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
