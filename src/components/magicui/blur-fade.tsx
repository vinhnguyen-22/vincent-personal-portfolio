'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Custom animation variants, override default (optional)
   */
  variant?: Variants;
  /**
   * Animation duration in seconds (default: 0.5)
   */
  duration?: number;
  /**
   * Animation delay in seconds (default: 0)
   */
  delay?: number;
  /**
   * Vertical offset for start (default: 16)
   */
  yOffset?: number;
  /**
   * If true, only animate on scroll into view (default: true)
   */
  inView?: boolean;
  /**
   * Margin for inView detection (default: "-10%")
   * Ex: "0px 0px -10% 0px"
   */
  rootMargin?: string;
  /**
   * CSS blur for initial state (default: "8px")
   */
  blur?: string;
  /**
   * If true, will reset and animate again every time enter view (default: false)
   */
  triggerEveryTime?: boolean;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 16,
  inView = true,
  rootMargin = '0px 0px -10% 0px',
  blur = '8px',
  triggerEveryTime = false,
}: BlurFadeProps) => {
  const ref = useRef(null);
  // Nếu muốn luôn animate mỗi lần scroll lại, set once: false
  const isInView = useInView(ref, {
    once: !triggerEveryTime,
    amount: 0.15, // hoặc "some" hoặc "all"
  });

  // Nếu không dùng inView, luôn visible
  const show = inView ? isInView : true;

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blur})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={variant || defaultVariants}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
