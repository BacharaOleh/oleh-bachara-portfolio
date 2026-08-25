import { PROJECTS } from "@/data/portfolio-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageClient } from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.en.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.en.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Oleh Bachara`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Oleh Bachara`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectEn = PROJECTS.en.find((p) => p.id === id);
  const projectPl = PROJECTS.pl.find((p) => p.id === id);

  if (!projectEn || !projectPl) {
    notFound();
  }

  return <ProjectPageClient projectEn={projectEn} projectPl={projectPl} />;
}
