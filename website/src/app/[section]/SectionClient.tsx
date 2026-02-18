'use client';

import StaggeredMenu from '@/components/features/StaggeredMenu/StaggeredMenu';
import SectionHeader from '@/components/features/SectionHeader';

const menuItems = [
  { label: 'Writing', ariaLabel: 'View writing', link: '/writing' },
  { label: 'Projects', ariaLabel: 'View projects', link: '/projects' },
  { label: 'Resume', ariaLabel: 'View resume', link: '/resume' },
  { label: 'Bio', ariaLabel: 'Read bio', link: '/bio' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
];

const sectionContent: Record<string, { heading: string; description: string; items: string[] }> = {
  writing: {
    heading: 'Writing',
    description: 'Thoughts on drug discovery, lab automation, and software engineering.',
    items: [
      'The Future of Automated Laboratories',
      'Building Robust Pipelines for Drug Discovery',
      'Software Patterns for Scientific Computing',
    ],
  },
  projects: {
    heading: 'Projects',
    description: 'A selection of work across drug discovery, automation, and software.',
    items: [
      'Automated High-Throughput Screening Platform',
      'ML-Driven Compound Library Optimization',
      'Lab Instrument Integration Framework',
    ],
  },
  resume: {
    heading: 'Resume',
    description: 'Experience spanning drug discovery, lab automation, and software development.',
    items: [
      'Research Scientist — Drug Discovery',
      'Software Engineer — Lab Automation',
      'Full-Stack Developer — Scientific Tools',
    ],
  },
  bio: {
    heading: 'Bio',
    description:
      'Sidharth Sirdeshmukh works at the intersection of drug discovery, laboratory automation, and software engineering. Passionate about building tools that accelerate scientific progress.',
    items: [],
  },
};

export default function SectionClient({ section }: { section: string }) {
  const content = sectionContent[section];
  const title = content?.heading ?? section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen
        colors={['#B19EEF', '#5227FF']}
        accentColor="#8B6DFF"
        logoText="SS"
        isFixed
      />

      <main
        style={{
          padding: '6rem 2.5rem 4rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <SectionHeader title={title} />

        {content?.description && (
          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.7)',
              marginTop: '1.5rem',
              maxWidth: '600px',
            }}
          >
            {content.description}
          </p>
        )}

        {content?.items.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {content.items.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s, border-color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(139,109,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
