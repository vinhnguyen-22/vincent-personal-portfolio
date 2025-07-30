import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { ProjectCard } from '@/components/project-card';
import { ResumeCard } from '@/components/resume-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { portableTextToPlainText } from '@/lib/utils';
import {
  getAuthorData,
  getEducation,
  getProjects,
  getWorkExperience,
} from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

const BLUR_FADE_DELAY = 0.04;

export const dynamic = 'force-static';
export const revalidate = 604800; // 1 week

export default async function Page() {
  const [author, work, education, projects] = await Promise.all([
    getAuthorData(),
    getWorkExperience(),
    getEducation(),
    getProjects(),
  ]);

  if (!author) return null;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
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
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={portableTextToPlainText(author.description!)}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage
                  alt={author.name ?? ''}
                  src={author.avatar?.asset?.url ?? ''}
                />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
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
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {work.map((item, id) => (
            <BlurFade key={item._id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={item._id}
                logoUrl={item.logo?.asset?.url ?? ''}
                altText={item.company ?? ''}
                title={item.company ?? ''}
                subtitle={item.title ?? ''}
                href={item.url ?? ''}
                period={`${item.startDate} - ${item.endDate ?? 'Present'}`}
                description={item.description ?? []}
              />
            </BlurFade>
          ))}
        </div>
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
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Skills</h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const skills = author.skills ?? [];
              const CATEGORY_LABELS: Record<string, string> = {
                programming: 'Programming',
                data_engineering: 'Data Engineering',
                ml: 'Machine Learning',
                visualization: 'Visualization/BI',
                deployment: 'Deployment/MLOps',
              };
              const grouped: Record<string, typeof skills> = {};
              skills
                .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
                .forEach((skill) => {
                  const cat = skill.category || 'Other';
                  if (!grouped[cat]) grouped[cat] = [];
                  grouped[cat].push(skill);
                });

              return Object.entries(grouped).map(([category, skills], idx) => (
                <div
                  key={category}
                  className="bg-gradient-to-br from-white/10 to-violet-700/10 shadow-2xl rounded-xl flex flex-col items-center min-h-[220px] p-8
        transition-all duration-200 hover:scale-105 hover:shadow-purple-500/30 hover:bg-white/20
        backdrop-blur-md"
                >
                  <h3 className="text-md font-extrabold mb-6 text-center text-violet-300 tracking-tight drop-shadow-sm">
                    {CATEGORY_LABELS[category] || category}
                  </h3>
                  <div className="flex flex-col gap-2 px-2 w-full">
                    {skills.map((skill) => (
                      <Badge
                        key={skill._key}
                        className="flex items-center gap-1 w-full justify-center bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white
              rounded-lg px-1 py-2 font-semibold text-xs shadow-md hover:brightness-110 hover:shadow-lg
              transition-all min-h-[20px] border-0"
                      >
                        {skill.icon?.asset?.url ? (
                          <Image
                            src={skill.icon.asset.url}
                            alt={
                              typeof skill.name === 'string' ? skill.name : ''
                            }
                            width={20}
                            height={20}
                            className="rounded"
                          />
                        ) : null}
                        <span>{skill.name}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
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
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
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
