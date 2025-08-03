'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
  other: 'Other Tools',
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

const ITEMS_PER_ROW = 4;
const PLANET_MIN_SIZE = 40;
const PLANET_MAX_SIZE = 50;

// ====== FRAMER-MOTION random floating =====
const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;
function getRandomAnim() {
  return {
    x: [0, getRandom(-20, 20), getRandom(-8, 8), 0],
    y: [0, getRandom(20, 40), getRandom(0, 40), 0],
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
  // Tính toán vị trí và kích thước từng icon theo hàng/cột
  const [randoms, setRandoms] = useState<
    { left: number; top: number; size: number }[][]
  >([]);
  const [catRows, setCatRows] = useState<number[]>([]);

  useEffect(() => {
    const allRandoms: { left: number; top: number; size: number }[][] = [];
    const rowsArr: number[] = [];
    CATEGORY_LIST.forEach((cat) => {
      const arr = skillsData[cat] ?? [];
      const count = arr.length;
      if (count === 0) {
        allRandoms.push([]);
        rowsArr.push(0);
        return;
      }
      const rows = Math.ceil(count / ITEMS_PER_ROW);
      rowsArr.push(rows);

      const groupRandoms: { left: number; top: number; size: number }[] = [];
      for (let idx = 0; idx < count; idx++) {
        const row = Math.floor(idx / ITEMS_PER_ROW);
        const col = idx % ITEMS_PER_ROW;
        // Chia đều 80% chiều ngang, lề trái phải mỗi bên 10%
        const left =
          10 +
          (80 * col) / Math.min(ITEMS_PER_ROW - 1, count - 1) +
          getRandom(-2, 2);
        // Mỗi hàng cách nhau 25%, bắt đầu từ 18%
        const top = 18 + row * 25 + getRandom(-4, 4);
        groupRandoms.push({
          left,
          top,
          size: getRandom(PLANET_MIN_SIZE, PLANET_MAX_SIZE),
        });
      }
      allRandoms.push(groupRandoms);
    });
    setRandoms(allRandoms);
    setCatRows(rowsArr);
  }, [skillsData]);

  // ===== RENDER =====
  return (
    <section className="w-full mx-auto px-2" style={{ minHeight: '470px' }}>
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
          // Tính minHeight động theo số hàng
          const rows = catRows[catIdx] || 1;
          const minHeight = rows * 80 + 150; // 80px/hàng, +150 cho padding

          // Intersection Observer cho từng category section
          const sectionId = `skills-section-${cat}`;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { ref, inView } = useInView({
            threshold: 0.16,
            triggerOnce: false, // Animate mỗi lần vào/ra viewport
          });

          return (
            <div
              ref={ref}
              key={cat}
              id={sectionId}
              className={`relative w-full mx-auto mb-0 ${CATEGORY_BG[cat]} py-8`}
              style={{ minHeight }}
            >
              <div className="text-center text-base md:text-lg font-bold tracking-[0.2em] text-black dark:text-violet-200 uppercase drop-shadow-lg select-none z-10">
                {CATEGORY_LABELS[cat]}
              </div>
              <div
                className={`relative w-full mx-auto mb-0 rounded-2xl py-2 transition-all`}
                style={{
                  height: minHeight - 60,
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
                        overflow: 'visible',
                      }}
                      animate={inView ? getRandomAnim() : { x: 0, y: 0 }}
                    >
                      <div
                        className={`
                          rounded-full dark:bg-white/10
                          border border-white/10 relative
                          transition-all duration-300
                          group-hover:shadow-lg group-hover:scale-110
                          opacity-85 p-2
                        `}
                        style={{
                          opacity: 0.89,
                        }}
                      >
                        {/* Glow chỉ khi hover */}
                        <div className="absolute -inset-3 rounded-full pointer-events-none z-0 opacity-0 group-hover:opacity-20 transition-all bg-cyan-100 blur-sm" />
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
