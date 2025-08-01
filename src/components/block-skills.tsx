'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// ===== TYPE =====
export type SkillBlock = {
  name: string;
  icon: string;
  category: string;
};
export type SkillsData = {
  [category: string]: SkillBlock[];
};
type Props = { skillsData: SkillsData };

// ===== CONFIG =====
const CATEGORY_LABELS: Record<string, string> = {
  programming: 'Programming',
  ml: 'Machine Learning',
  data_engineering: 'Data Engineering',
  visualization: 'Visualization / BI',
  deployment: 'Deployment / MLOps',
  other: 'Other',
};

const CATEGORY_LIST = [
  'programming',
  'ml',
  'data_engineering',
  'visualization',
  'deployment',
  'other',
];

const CATEGORY_BG: Record<string, string> = {
  programming:
    'bg-gradient-to-l from-transparent md:from-blue-900/10 via-indigo-900/10 to-transparent',
  ml: 'bg-gradient-to-r  from-transparent md:from-teal-900/10 via-green-900/10 to-transparent',
  data_engineering:
    'bg-gradient-to-l from-transparent md:from-orange-900/10 via-yellow-900/10 to-transparent',
  visualization:
    'bg-gradient-to-r from-transparent md:from-pink-900/10  via-purple-900/10 to-transparent',
  deployment:
    'bg-gradient-to-l from-transparent md:from-cyan-900/10 via-sky-900/10 to-transparent',
  other: 'bg-gradient-to-r from-transparent md:from-gray-900/10 to-transparent',
};

const CATEGORY_HEIGHT = 0;
const PLANET_MIN_SIZE = 40;
const PLANET_MAX_SIZE = 50;

// ====== FRAMER-MOTION random floating =====
const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;
function getRandomAnim() {
  return {
    x: [0, getRandom(-20, 20), getRandom(-8, 8), 0],
    y: [100, getRandom(20, 40), getRandom(0, 40), 0],
    transition: {
      duration: getRandom(7, 13),
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
      delay: getRandom(0, 2.5),
    },
  };
}

// ===== COMPONENT =====
const BoldSkillsUI = ({ skillsData }: Props) => {
  // Random vị trí/size từng planet trong từng vùng
  const [randoms, setRandoms] = useState<
    { left: number; top: number; size: number }[][]
  >([]);
  useEffect(() => {
    setRandoms(
      CATEGORY_LIST.map((cat) => {
        const arr = skillsData[cat] ?? [];
        return arr.map((_, idx) => ({
          left: getRandom(
            7 + idx * (86 / Math.max(arr.length, 1)),
            18 + idx * (82 / Math.max(arr.length, 1))
          ),
          top: getRandom(18, 65),
          size: getRandom(PLANET_MIN_SIZE, PLANET_MAX_SIZE),
        }));
      })
    );
  }, [skillsData]);

  // Starfield
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 64 }).map(() => ({
        left: Math.random() * 98,
        top: Math.random() * 98,
        width: 1.2 + Math.random() * 2.7,
        height: 1.2 + Math.random() * 2.7,
        opacity: Math.random() * 0.36 + 0.2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  // ===== RENDER =====
  return (
    <section
      className="relative w-full max-w-[1020px] mx-auto px-2"
      style={{ minHeight: CATEGORY_HEIGHT * CATEGORY_LIST.length + 70 }}
    >
      {/* Star background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/35 blur-[2px]"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.width}px`,
              height: `${star.height}px`,
              opacity: star.opacity,
              animation: 'twinkle 2.7s infinite',
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      {/* Big title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none md:block hidden">
        <h1 className="text-[140px] md:text-[170px] font-black text-white/5 tracking-wider">
          VINCENT
        </h1>
      </div>
      {/* Canvas group */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-0 ">
        {CATEGORY_LIST.map((cat, catIdx) => {
          const group = skillsData[cat] ?? [];
          if (!group.length) return null;
          return (
            <div
              key={cat}
              className={`relative w-full mx-auto min-h-[300px] mb-0  ${CATEGORY_BG[cat]} py-8 `}
            >
              <div className=" text-center text-base md:text-lg font-bold tracking-[0.2em] text-black  dark:text-violet-200 uppercase drop-shadow-lg select-none z-10">
                {CATEGORY_LABELS[cat]}
              </div>
              <div
                className={`relative w-full mx-auto min-h-[${CATEGORY_HEIGHT}px] mb-0 rounded-2xl py-2 transition-all `}
                style={{
                  height: CATEGORY_HEIGHT,
                }}
              >
                {/* Planets */}
                {group.map((skill, idx) => {
                  const r = randoms[catIdx]?.[idx] ?? {
                    left: 15 + idx * 13,
                    top: 30,
                    size: 54,
                  };
                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute group flex flex-col items-center select-none"
                      style={{
                        left: `${r.left}%`,
                        top: `${r.top}%`,
                        width: `${r.size}px`,
                        height: `${r.size}px`,
                        overflow: 'visible', // hoặc hidden nếu muốn
                      }}
                      animate={getRandomAnim()}
                    >
                      <div
                        className={`
                        rounded-full bg-white/10 shadow-lg transition-all duration-300 group-hover:scale-110 border border-white/10 relative hover:shadow-2xl
                        opacity-85 p-2
                        `}
                        style={{
                          opacity: 0.89,
                        }}
                      >
                        {/* Glow ngoài cùng */}
                        <div className="absolute -inset-3 rounded-full pointer-events-none z-0 opacity-[0.08] group-hover:opacity-20 transition-all bg-cyan-100 blur-md" />
                        {/* Icon */}

                        <div className="z-10 flex items-center justify-center ">
                          {skill.icon?.startsWith('http') ? (
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              width={r.size}
                              height={r.size}
                              style={{
                                borderRadius: '50%',
                                objectFit: 'contain',
                                aspectRatio: '1/1',
                                display: 'block',
                              }}
                            />
                          ) : (
                            <span className="text-lg md:text-xl">
                              {skill.icon}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Label */}
                      <span className="mt-2 text-center px-2 py-1 text-xs font-medium rounded-lg bg-black/35 text-white/90 shadow-sm select-none">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BoldSkillsUI;
