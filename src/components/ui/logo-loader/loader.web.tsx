import Lottie from 'lottie-react';
import React from 'react';

import animationData from '@/assets/loading-animation.json';

export function LogoLoader({ bgColor }: { bgColor?: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor || 'transparent',
      }}
    >
      <Lottie animationData={animationData} autoplay loop style={{ width: 80, height: 80 }} />
    </div>
  );
}
