import BoldSkillsUI, { SkillsData } from '@/components/block-skills';
import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { ProjectCard } from '@/components/project-card';
import { ResumeCard } from '@/components/resume-card';
import ResumeTimeline from '@/components/resume-timeline';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VideoBackground from '@/components/video-background';
import { portableTextToPlainText } from '@/lib/utils';
import {
  getAuthorData,
  getEducation,
  getProjects,
  getSkills,
  getWorkExperience,
} from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import { DownloadIcon } from 'lucide-react';
import Link from 'next/link';

const BLUR_FADE_DELAY = 0.04;

export const dynamic = 'force-static';
export const revalidate = 604800; // 1 week

export default async function Page() {
  const [author, work, education, projects, skills] = await Promise.all([
    getAuthorData(),
    getWorkExperience(),
    getEducation(),
    getProjects(),
    getSkills(),
  ]);

  if (!author) return null;

  // Tự động group kỹ năng thành object {category: [skills]}
  const skillsData: SkillsData = skills.reduce((acc: any, skill: any) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({
      name: skill.name,
      icon:
        typeof skill.icon?.asset?.url === 'string'
          ? skill.icon?.asset?.url
          : '/', // hoặc xử lý icon là emoji, hoặc url
      category: cat,
    });
    return acc;
  }, {} as SkillsData);
  return (
    <main className="min-h-[100dvh] space-y-10 relative w-full h-full">
      <VideoBackground />
      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${author.name?.split(' ')[0] ?? ''}`}
                emoji={{
                  value: '👋🏼',
                  className: 'text-[55px] ml-2.5 pb-2 -mt-1',
                }}
              />

              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="relative max-w-[600px] ">
                  <BlurFadeText
                    className="md:text-xl"
                    delay={BLUR_FADE_DELAY}
                    text={portableTextToPlainText(author.description!)}
                  />
                  <div className="flex items-center justify-center"></div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="flex items-center gap-3 flex-col">
                <Avatar className="size-36 border relative">
                  <AvatarImage
                    alt={author.name ?? ''}
                    src={author.avatar?.asset?.url ?? ''}
                  />
                  <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
                <a
                  href={author.resume?.asset?.url ?? '#'}
                  download
                  className="
    inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
    border border-gray-300 dark:border-gray-700
    bg-white dark:bg-black
    text-gray-800 dark:text-gray-100
    font-normal text-sm shadow-sm
    hover:bg-gray-100 dark:hover:bg-gray-800
    hover:border-gray-400 dark:hover:border-gray-500
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
  "
                >
                  Resume
                  <DownloadIcon className="size-4 ml-0.5" />
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty text-justify font-sans text-sm text-muted-foreground dark:prose-invert">
            <PortableText value={author.summary ?? []} />
          </div>
        </BlurFade>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {education.map((item, id) => (
            <BlurFade key={item._id} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={item._id}
                href={item.url ?? ''}
                logoUrl={item.logo?.asset?.url ?? ''}
                altText={item.school ?? ''}
                title={item.school ?? ''}
                subtitle={item.degree ?? ''}
                period={`${item.startDate} - ${item.endDate}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="work">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Experiences
          </h2>
        </BlurFade>
        <ResumeTimeline works={work} />
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="w-full min-h-[600px]">
              <BoldSkillsUI skillsData={skillsData} />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I &apos;ve worked on a variety of data-driven projects, from
                  interactive analytics dashboards to advanced machine learning
                  platforms. Here are a few of my favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-[800px] mx-auto">
            {projects.map((project, id) => (
              <BlurFade
                key={project._id}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  key={project._id}
                  title={project.title ?? ''}
                  description={project.description ?? []}
                  tags={project.technologies ?? []}
                  image={project.image?.asset?.url ?? ''}
                  video={project.video ?? ''}
                  links={project.links ?? []}
                  href={project.links?.[0]?.url ?? ''}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{' '}
                <Link
                  href={author.social?.twitter ?? ''}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{' '}
                and I&apos;ll respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <footer className="pb-12 sm:pb-6 text-center text-xs text-muted-foreground">
        <p>
          Built with Next.js and Sanity.{' '}
          <Link
            href="https://github.com/vinhnguyen-22/vincent-personal-portfolio"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub
          </Link>
        </p>
      </footer>
    </main>
  );
}
