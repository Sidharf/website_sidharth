'use client';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h1
      style={{
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 700,
        letterSpacing: '-2px',
        textTransform: 'uppercase',
        color: '#fff',
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      {title}
    </h1>
  );
}
