'use client';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  DraftingCompassIcon,
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  PackageOpenIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function Navbar({ author }: any) {
  return (
    <div className="opacity-80 pointer-events-none fixed inset-x-0 bottom-0 md:top-7 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-3xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background/45"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {[
          { href: '/', icon: HomeIcon, label: 'Home' },
          { href: '#skills', icon: DraftingCompassIcon, label: 'Skills' },
          { href: '#projects', icon: PackageOpenIcon, label: 'Projects' },
        ].map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12'
                  )}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      const el = document.getElementById(item.href.slice(1));
                      if (el) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    }
                  }}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full" />
        {[
          {
            url: `mailto:${author?.social?.email || ''}`,
            icon: MailIcon,
            name: 'Contact',
          },
          {
            name: 'GitHub',
            icon: GithubIcon,
            url: author?.social?.github || '#',
          },
          {
            name: 'LinkedIn',
            icon: LinkedinIcon,
            url: author?.social?.linkedin || '#',
          },
        ].map((social) => (
          <DockIcon key={social.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12'
                  )}
                  target="_blank"
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
