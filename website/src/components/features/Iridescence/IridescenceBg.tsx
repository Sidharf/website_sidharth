'use client';

import Iridescence from './Iridescence';

export default function IridescenceBg() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Iridescence color={[0.5, 0.6, 0.8]} mouseReact amplitude={0.1} speed={0} />
    </div>
  );
}
