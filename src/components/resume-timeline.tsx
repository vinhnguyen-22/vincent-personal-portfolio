'use client';

import { Briefcase, Building2, ExternalLink } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type ResumeSkill = { name: string };
type ResumeAchievement = { name: string; icon?: any };

type ResumeCardItem = {
  _id: string;
  company: string;
  title: string;
  logo?: { asset?: { url?: string } };
  endDate?: string;
  startDate?: string;
  url?: string;
  location?: string;
  achievements?: ResumeAchievement[];
  description?: any; // PortableTextBlock[] or string[]
  skills?: (ResumeSkill | string)[];
};

type ResumeCardProps = {
  item: ResumeCardItem;
  id: number;
  isActive: boolean;
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isVisible };
};

const MagicalBlur = ({ children, delay = 0, className = '' }: any) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-8 blur-sm'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(16)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

const SkillBadge = ({ name }: { name: string }) => (
  <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50/60 to-indigo-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105 cursor-default dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-purple-900/10 dark:text-blue-200 dark:border-blue-500/30">
    {name}
  </span>
);

const AchievementBadge = ({
  achievement,
  id,
}: {
  achievement: ResumeAchievement;
  id: number;
}) => (
  <div
    className="flex items-center text-emerald-700 dark:text-emerald-200 gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 hover:shadow-md transition-all duration-300 hover:scale-105 dark:from-emerald-900/20 dark:to-teal-900/10 dark:border-emerald-700/40"
    style={{ animationDelay: `${id * 150}ms` }}
  >
    {achievement?.icon?.asset?.url && (
      <Image
        src={achievement.icon.asset.url}
        alt={achievement.name}
        width={18}
        height={18}
        className="rounded-full bg-emerald-700  dark:bg-emerald-20 object-contain"
      />
    )}
    <span className="text-xs font-medium">{achievement?.name}</span>
  </div>
);

const TimelineDot = ({
  isActive,
  delay,
}: {
  isActive: boolean;
  delay: number;
}) => (
  <div className="relative flex items-center justify-center">
    <div
      className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-4 md:border-4 border-white dark:border-gray-950 shadow-lg transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110'
          : 'bg-gray-300 dark:bg-gray-700'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping opacity-50" />
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900" />
        </>
      )}
    </div>
  </div>
);

const ResumeCard: React.FC<ResumeCardProps> = ({ item, id, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden opacity-80 rounded-2xl border transition-all duration-700 ease-out transform
        border-gradient-to-r from-gray-200 to-blue-200 dark:bg-black/10 shadow-2xl scale-[1.02]'
        hover:scale-[1.03] hover:-translate-y-2
        px-3 py-5 md:px-8 md:py-8
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
          isHovered
            ? 'from-blue-50/90 via-purple-50/50 to-pink-50/30 opacity-100 dark:from-blue-900/20 dark:to-purple-900/10'
            : 'from-blue-50/30 to-purple-50/20 opacity-0'
        }`}
      />
      {isHovered && <FloatingParticles />}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 md:gap-6 mb-5 md:mb-7">
          <div className="relative group/logo">
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 shadow-lg transition-all duration-300
                ${
                  isHovered
                    ? 'border-blue-300 scale-110 rotate-3'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {item.logo?.asset?.url ? (
                  <Avatar className="border size-10 md:size-12 m-auto bg-muted-background dark:bg-foreground">
                    <AvatarImage
                      src={item.logo.asset.url}
                      alt={item.company}
                      className="object-contain"
                    />
                    <AvatarFallback>{item.company[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Building2 className="w-7 h-7 md:w-8 md:h-8 text-gray-600 dark:text-gray-400" />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3
                  className={`text-base  leading-snug font-extrabold transition-all duration-300
                    ${
                      isHovered
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                >
                  {item.company}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-[1.01rem]">
                    {item.title}
                  </span>
                </div>
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ml-2 w-5 h-5 inline-flex items-center transition-all duration-300 ${
                    isHovered
                      ? 'text-blue-500 scale-110'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <ExternalLink />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
          {(item.achievements || []).map((ach, i) => (
            <AchievementBadge key={i} achievement={ach} id={i} />
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2 md:space-y-3 mb-4 md:mb-5 text-gray-800 dark:text-gray-100 text-sm leading-relaxed ">
          {<PortableText value={item.description} />}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2">
          {(item.skills || []).map((skill, i) => (
            <SkillBadge
              key={typeof skill === 'string' ? skill : skill.name || i}
              name={typeof skill === 'string' ? skill : skill.name}
            />
          ))}
        </div>

        {/* Animated bottom accent */}
        <div
          className={`absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ${
            isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          } origin-left rounded-b-3xl`}
        />
      </div>
    </div>
  );
};

function formatPeriod(period: string) {
  return period.replace(/-/g, '–').replace(/\s+/g, ' ');
}

const ResumeTimeline = ({ works }: { works: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hidden md:block absolute top-10 left-24 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
      </div>

      <div className="mx-auto px-2 md:px-8 py-5 md:py-7 relative z-10">
        {/* Hero Section */}
        <MagicalBlur delay={0}>
          <div className="text-center mb-10 md:mb-20">
            <p className="text-base md:text-xl  text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              A curated showcase of professional milestones, technical
              achievements, and transformative contributions across data
              science, finance, and web development domains.
            </p>
          </div>
        </MagicalBlur>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute hidden md:block md:left-44 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 opacity-50
            -translate-x-1/2 md:translate-x-0"
          />
          <div className="space-y-8 md:space-y-16">
            {(works || []).map((item, id) => (
              <MagicalBlur key={item._id} delay={id * 200}>
                <div
                  className="relative flex flex-col md:flex-row items-start gap-3 md:gap-[39px]"
                  onMouseEnter={() => setActiveIndex(id)}
                >
                  {/* Timeline date */}
                  <div className="w-full md:w-32 flex-shrink-0 md:text-right mb-1 md:mb-0">
                    <div className="sticky top-4 md:top-8 space-y-1 md:space-y-2">
                      <div className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        {formatPeriod(
                          `${item.startDate} - ${item.endDate ?? 'Present'}`
                        )}
                      </div>
                      <div className="w-14 h-px bg-gradient-to-r from-transparent to-blue-300 ml-0 md:ml-auto" />
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="hidden md:block flex items-center justify-center md:block mb-2 md:mb-0">
                    <TimelineDot
                      isActive={activeIndex === id}
                      delay={id * 100}
                    />
                  </div>
                  {/* Card */}
                  <div className="flex-1 pb-6 md:pb-8 w-full">
                    <ResumeCard
                      item={item}
                      id={id}
                      isActive={activeIndex === id}
                    />
                  </div>
                </div>
              </MagicalBlur>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTimeline;
