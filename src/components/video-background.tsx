'use client';
import { useState } from 'react';

export default function VideoBackground() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="">
      {!videoReady && (
        <div
          className="
            fixed inset-0 z-20
            bg-foreground
            animate-pulse
          "
        />
      )}
      <video
        className="w-full h-full fixed -z-10 right-0 top-0 mix-blend-overlay object-cover overflow-clip"
        autoPlay
        loop
        muted
        playsInline
        src="/videos/galaxy.mp4"
        style={{
          overflowClipMargin: 'content-box',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onCanPlayThrough={() => setVideoReady(true)} // Khi video đủ dữ liệu để chơi
      />
    </div>
  );
}
