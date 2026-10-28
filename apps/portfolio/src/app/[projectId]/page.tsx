import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../../components/project/ProjectDetail";
import { FEATURED_PROJECTS, getProject } from "../../constants/projects";

type Props = { params: Promise<{ projectId: string }> };

export function generateStaticParams() {
  return FEATURED_PROJECTS.map(({ id }) => ({ projectId: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) notFound();
  return {
    title: `${project.title} | 홍재훈 Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | 홍재훈 Portfolio`,
      description: project.description,
      url: `https://portfolio.bududak.com/${project.id}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
