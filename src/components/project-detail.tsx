'use client';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PortableText } from '@portabletext/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BookText,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Github,
  Globe,
  Play,
  Target,
  Telescope,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from './project-card';

type Project = {
  title: string;
  image?: any;
  video?: string | null;
  description: any[]; // Sanity PortableText
  tags?: string[];
  links?: any[];
  role?: string;
  responsibilities?: string[];
  technologies?: string[];
  outcome?: string;
  teamSize?: number;
  projectType?: string;
  status?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
};

type Props = {
  project: Project;
  trigger?: React.ReactNode;
};

const linkTypeMap: Record<
  string,
  { icon: React.ReactNode; fallback: string; badgeClass: string }
> = {
  source: {
    icon: <Github className="size-4" />,
    fallback: 'GitHub',
    badgeClass: 'bg-gray-900 hover:bg-gray-800 text-white shadow-md',
  },
  website: {
    icon: <Globe className="size-4" />,
    fallback: 'Website',
    badgeClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
  },
  demo: {
    icon: <Play className="size-4" />,
    fallback: 'Demo',
    badgeClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md',
  },
  docs: {
    icon: <BookText className="size-4" />,
    fallback: 'Docs',
    badgeClass: 'bg-violet-600 hover:bg-violet-700 text-white shadow-md',
  },
  default: {
    icon: <ExternalLink className="size-4" />,
    fallback: 'Visit',
    badgeClass: 'bg-slate-600 hover:bg-slate-700 text-white shadow-md',
  },
};

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  completed: {
    color:
      'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    icon: <CheckCircle className="size-4" />,
  },
  'in progress': {
    color:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800',
    icon: <div className="size-3 rounded-full bg-blue-500 animate-pulse" />,
  },
  planned: {
    color:
      'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    icon: <Clock className="size-4" />,
  },
};

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectDetailDialog({ project }: Props) {
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    title,
    image,
    video,
    description,
    tags,
    links,
    role,
    responsibilities,
    technologies,
    outcome,
    teamSize,
    projectType,
    status,
    startDate,
    endDate,
  } = project;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = scrollRef.current.scrollTop;
        const scrollHeight =
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        setScrollPosition(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const formatDate = (dateString?: string | null) => {
    return dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : 'Present';
  };

  const displayedTechnologies = showAllTechnologies
    ? technologies || []
    : (technologies || []).slice(0, 8);

  // Chặn image/video nếu không có src thực
  const hasImage = image && typeof image === 'string' && image.trim() !== '';
  const hasVideo = video && typeof video === 'string' && video.trim() !== '';

  // Animation variants
  const contentVariant = {
    initial: { opacity: 0, scale: 0.96, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 40 },
    transition: { duration: 0.32, ease: [0.43, 0.13, 0.23, 0.96] },
  };

  const sectionVariant = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.36 },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-full cursor-pointer">
          <ProjectCard
            title={project.title ?? ''}
            description={project.description ?? []}
            tags={project.technologies ?? []}
            image={project.image?.asset?.url ?? ''}
            video={project.video ?? ''}
            links={project.links ?? []}
          />
        </div>
      </DialogTrigger>
      <AnimatePresence>
        <DialogContent
          autoFocus={false}
          className={cn(
            'max-w-4xl w-[95vw] h-[85vh] p-0 rounded-2xl overflow-hidden border shadow-xl',
            'bg-white dark:bg-black flex flex-col'
          )}
        >
          <motion.div
            {...contentVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={contentVariant.transition}
            className="h-full flex flex-col"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-black z-50">
              <div
                className="h-full bg-blue-600 transition-all duration-150"
                style={{ width: `${scrollPosition * 100}%` }}
              />
            </div>
            <DialogTitle className="sr-only">{title}</DialogTitle>
            {/* Hero */}
            <motion.div
              {...sectionVariant(0.05)}
              className="relative flex-shrink-0"
            >
              {project.image && (
                <div className="relative w-full h-44 sm:h-56 md:h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#19173a] dark:to-[#0d1126] overflow-hidden opacity-50">
                  <Image
                    src={project.image?.asset?.url || ''}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              )}
              {/* Status Badge */}
              {status && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <Badge
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 font-medium border text-xs',
                      statusConfig[status.toLowerCase()]?.color ||
                        statusConfig.completed.color
                    )}
                  >
                    {statusConfig[status.toLowerCase()]?.icon ||
                      statusConfig.completed.icon}
                    <span className="capitalize">{status}</span>
                  </Badge>
                </motion.div>
              )}
              {/* Title & Tags Overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-3 md:py-4 text-white pointer-events-none">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">
                  {title}
                </h1>
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md shadow-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white dark:bg-black"
            >
              <motion.div
                {...sectionVariant(0.1)}
                className="p-4 sm:p-6 space-y-8"
              >
                {/* Description */}
                {description && (
                  <motion.div {...sectionVariant(0.13)}>
                    <div className="prose prose-slate max-w-none dark:prose-invert">
                      <PortableText value={description} />
                    </div>
                  </motion.div>
                )}
                {/* Overview Grid */}
                <motion.section {...sectionVariant(0.17)}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Target className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Project Overview
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={<Briefcase />}
                      label="Role"
                      value={role || 'Not specified'}
                      color="blue"
                    />
                    <InfoCard
                      icon={<Users />}
                      label="Team Size"
                      value={teamSize ? `${teamSize} members` : 'Individual'}
                      color="emerald"
                    />
                    <InfoCard
                      icon={<Building />}
                      label="Project Type"
                      value={
                        projectType
                          ? projectType.charAt(0).toUpperCase() +
                            projectType.slice(1)
                          : 'Personal'
                      }
                      color="violet"
                    />
                    <InfoCard
                      icon={<Calendar />}
                      label="Timeline"
                      value={`${formatDate(startDate)} - ${formatDate(
                        endDate
                      )}`}
                      color="amber"
                    />
                  </div>
                </motion.section>
                {/* Achievements */}
                {outcome && (
                  <motion.section {...sectionVariant(0.2)}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <Award className="size-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Key Achievements
                      </h2>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                      <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  </motion.section>
                )}
                {/* Responsibilities */}
                {responsibilities && responsibilities.length > 0 && (
                  <motion.section {...sectionVariant(0.23)}>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      Key Responsibilities
                    </h2>
                    <div className="space-y-3">
                      {responsibilities.map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="size-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </div>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
                {/* Technology Stack */}
                {technologies && technologies.length > 0 && (
                  <motion.section {...sectionVariant(0.27)}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                          <Telescope />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          Technology Stack
                        </h2>
                      </div>
                      {technologies.length > 8 && (
                        <motion.button
                          whileHover={{ scale: 1.07 }}
                          className="flex items-center cursor-pointer gap-1.5 text-sm font-medium text-blue-600 hover:text-white dark:text-blue-400 transition-colors"
                          onClick={() =>
                            setShowAllTechnologies(!showAllTechnologies)
                          }
                        >
                          {showAllTechnologies ? (
                            <>
                              Show Less <ChevronUp className="size-4" />
                            </>
                          ) : (
                            <>
                              Show All ({technologies.length}){' '}
                              <ChevronDown className="size-4" />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {displayedTechnologies.map((tech, index) => (
                        <motion.div key={tech} whileHover={{ scale: 1.08 }}>
                          <Badge
                            className={cn(
                              'px-3 py-1.5 text-sm font-medium border transition-colors',
                              index < 3
                                ? 'bg-blue-50 text-blue-700  hover:text-white cursor-pointer border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800'
                                : 'bg-slate-100 text-slate-700 hover:text-white cursor-pointer border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                            )}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div {...sectionVariant(0.31)}>
              <DialogFooter className="flex-shrink-0 flex flex-row gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 justify-between items-center">
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {links &&
                    links.map((l, idx) => {
                      if (!l?.url) return null;
                      const typeKey = l.type ? l.type.toLowerCase() : 'default';
                      const mapItem =
                        linkTypeMap[typeKey] || linkTypeMap.default;
                      return (
                        <motion.a
                          key={idx}
                          whileHover={{ scale: 1.09 }}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                        >
                          <Badge
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors',
                              mapItem.badgeClass
                            )}
                          >
                            {mapItem.icon}
                            {l.title ?? mapItem.fallback}
                          </Badge>
                        </motion.a>
                      );
                    })}
                </div>
                <DialogClose asChild>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 px-4 py-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </DialogClose>
              </DialogFooter>
            </motion.div>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
}

// Helper Card for Overview section
function InfoCard({
  icon,
  label,
  value,
  color = 'blue',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: 'blue' | 'emerald' | 'violet' | 'amber';
}) {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    emerald:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    violet:
      'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    amber:
      'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  };
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg flex-shrink-0', colorMap[color])}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
            {label}
          </div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailDialog;
