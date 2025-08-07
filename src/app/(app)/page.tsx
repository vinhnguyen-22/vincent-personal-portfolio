import BoldSkillsUI, { SkillsData } from '@/components/block-skills';
import BlurFade from '@/components/magicui/blur-fade';
import { ProjectDetailDialog } from '@/components/project-detail';
import { ResumeCard } from '@/components/resume-card';
import ResumeTimeline from '@/components/resume-timeline';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { portableTextToPlainText } from '@/lib/utils';
import {
  getAuthorData,
  getEducation,
  getProjects,
  getSkills,
  getWorkExperience,
} from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import Spline from '@splinetool/react-spline';
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
    <main className="min-h-[100dvh] space-y-10  relative w-full h-full antialiased max-w-5xl mx-auto">
      <section
        id="hero"
        className="relative w-full min-h-[500px] overflow-hidden  py-10 "
      >
        {/* Spline background layer */}
        <div className="absolute md:top-[-10%] inset-0  md:-right-[55%] min-w-[300px] min-h-[200px] ">
          <Spline
            className="object-cover"
            scene="https://prod.spline.design/eu8ydTm5qMXIyxbH/scene.splinecode"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left: Info */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            {/* Avatar + Resume */}
            <div className="flex flex-col  items-center md:items-start gap-5 pt-4">
              <Avatar className="size-28 md:size-36 border-2 border-gray-400 shadow-lg">
                <AvatarImage
                  alt={author.name ?? ''}
                  src={author.avatar?.asset?.url ?? ''}
                />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <span className="text-4xl md:text-6xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                Hi, I{"'"}m {author.name?.split(' ')[0] ?? ''}
                <span className="text-[48px] md:text-[55px] pb-2 -mt-1">
                  👋🏼
                </span>
              </span>
            </div>
            <div>
              <p className="text-lg md:text-2xl text-gray-200 font-medium max-w-xl">
                {portableTextToPlainText(author.description!)}
              </p>
            </div>
            <a
              href={author.resume?.asset?.url ?? '#'}
              download
              target="_blank"
              className="
            mt-3 sm:mt-0
            inline-flex items-center gap-2 px-5 py-2 rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-black
            text-gray-900 dark:text-gray-100
            font-semibold text-base shadow hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
          "
            >
              Resume
              <DownloadIcon className="size-5 ml-1" />
            </a>
          </div>
          {/* Optional right space for balance */}
          <div className="flex-1 hidden md:block" />
        </div>
      </section>

      <section id="about">
        <div className="">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty text-justify font-sans text-sm text-muted-foreground dark:prose-invert">
              <PortableText value={author.summary ?? []} />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {education.map((item: any, id: any) => (
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
      <section id="skills" className="max-w-full relative">
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
                  I have worked on a variety of data-driven projects, from
                  interactive analytics dashboards to advanced machine learning
                  platforms. Here are a few of my favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-6">
            {projects.map((project: any, id: any) => (
              <BlurFade
                key={project._id}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectDetailDialog key={project._id} project={project} />
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
    </main>
  );
}
