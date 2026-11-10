import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetail from "../../components/WorkDetail";
import { WORKS, getWork } from "../../constants/works";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return WORKS.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const work = getWork(id);
  if (!work) notFound();
  return {
    title: `${work.title} | 홍재훈 Playground`,
    description: work.description,
    alternates: { canonical: `/${work.id}` },
  };
}

export default async function WorkPage({ params }: Props) {
  const { id } = await params;
  const work = getWork(id);
  if (!work) notFound();
  const { Component } = work;
  return (
    <WorkDetail title={work.title} description={work.description}>
      <Component />
    </WorkDetail>
  );
}
