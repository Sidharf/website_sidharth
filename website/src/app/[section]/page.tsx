import { notFound } from 'next/navigation';
import SectionClient from './SectionClient';

const VALID_SECTIONS = ['writing', 'projects', 'resume', 'bio'] as const;
type ValidSection = (typeof VALID_SECTIONS)[number];

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: SectionPageProps) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as ValidSection)) {
    return { title: 'Not Found' };
  }
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  return {
    title: `${title} — Sidharth Sirdeshmukh`,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as ValidSection)) {
    notFound();
  }

  return <SectionClient section={section as ValidSection} />;
}
