import { projects } from "../../data/projects";
import type { Project } from "@/types/project";

export const ECOSYSTEM_PROJECT_SLUG = "ecosysteme-si-pme";
export const AGENTIC_PROJECT_SLUG = "chaine-developpement-agentique";

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
const projectsBySlug = new Map(
  sortedProjects.map((project) => [project.slug, project])
);

export function getAllProjects(): Project[] {
  return sortedProjects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsBySlug.get(slug);
}

export function getFeaturedProjects(): Project[] {
  return sortedProjects.filter((project) => project.featured);
}

/** Resolves slugs in the given order, failing loudly on a typo. */
export function getProjectsBySlugs(slugs: readonly string[]): Project[] {
  return slugs.map((slug) => {
    const project = projectsBySlug.get(slug);
    if (!project) {
      throw new Error(`Unknown project slug: ${slug}`);
    }
    return project;
  });
}
