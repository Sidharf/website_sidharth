'use client';

import CurvedLoop from '@/components/features/CurvedLoop/CurvedLoop';
import StaggeredMenu from '@/components/features/StaggeredMenu/StaggeredMenu';
import PixelTrail from '@/components/features/PixelTrail/PixelTrail';

const menuItems = [
  { label: 'Writing', ariaLabel: 'View writing', link: '/writing' },
  { label: 'Projects', ariaLabel: 'View projects', link: '/projects' },
  { label: 'Resume', ariaLabel: 'View resume', link: '/resume' },
  { label: 'Bio', ariaLabel: 'Read bio', link: '/bio' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/Sidharf' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/sirdeshmukh/' },
  { label: 'Twitter', link: 'https://x.com/sidharf' },
];

export default function LandingClient() {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <PixelTrail
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
          color="#5227FF"
          gooeyFilter={{ id: 'pixel-trail-goo', strength: 2 }}
        />
      </div>
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
        <CurvedLoop
          marqueeText="Sidharth ✦ Sirdeshmukh ✦ Drug Discovery ✦ Lab Automation ✦ Software ✦"
          speed={2}
          curveAmount={400}
          interactive
        />
      </div>
    </>
  );
}
