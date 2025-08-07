'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function VideoBackground() {
  const [videoReady, setVideoReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Always call hooks before any return!
  useEffect(() => {
    setMounted(true);
  }, []);

  // Conditional returns go after hooks
  if (resolvedTheme !== 'dark') {
    return null;
  }
  if (!mounted) return null; // Wait for client mount

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
