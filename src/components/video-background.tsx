'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function VideoBackground() {
  const [videoReady, setVideoReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Không render video nếu theme là 'light'
  if (resolvedTheme !== 'dark') {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Đợi client mới render video

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <video
        className={`w-full h-full fixed inset-0 object-cover mix-blend-overlay transition-opacity duration-[1600ms] ease-in-out pointer-events-none`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/galaxy.png"
        src="/videos/galaxy.mp4"
        style={{
          overflowClipMargin: 'content-box',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onLoadedData={() => setVideoReady(true)}
      />
    </div>
  );
}
function setMounted(arg0: boolean) {
  throw new Error('Function not implemented.');
}
