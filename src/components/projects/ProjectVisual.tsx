import Image from "next/image";
import { projectCategoryVisuals } from "@/lib/project-categories";
import type { Project } from "@/types/project";
import { projectIcons } from "./project-icons";

interface ProjectVisualProps {
  project: Project;
  variant?: "card" | "hero";
  className?: string;
}

const variantStyles = {
  card: { frame: "aspect-[5/2]", icon: "h-12 w-12", sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" },
  hero: { frame: "aspect-[16/10] rounded-2xl shadow-xl", icon: "h-20 w-20 md:h-24 md:w-24", sizes: "(max-width: 1024px) 100vw, 560px" },
};

/**
 * Project cover. Until real screenshots exist, shows the project icon on the
 * gradient and motif of its main category; a `cover` path takes over as-is.
 */
export default function ProjectVisual({
  project,
  variant = "card",
  className = "",
}: ProjectVisualProps) {
  const styles = variantStyles[variant];

  if (project.cover) {
    return (
      <div className={`relative overflow-hidden ${styles.frame} ${className}`}>
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={styles.sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const Icon = projectIcons[project.icon];
  const visual = projectCategoryVisuals[project.categories[0]];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-gradient-to-br ${visual.gradient} ${styles.frame} ${className}`}
    >
      <div className={`absolute inset-0 pattern-${visual.pattern}`} />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/30 backdrop-blur-sm">
          <Icon className={`${styles.icon} text-white drop-shadow`} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
