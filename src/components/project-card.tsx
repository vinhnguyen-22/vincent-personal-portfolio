import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { TypedObject } from 'sanity';
import { Github, Globe, BookText, Play } from 'lucide-react';

const linkTypeMap: Record<
  string,
  { icon: React.ReactNode; fallback: string; badgeClass: string }
> = {
  source: {
    icon: <Github className="size-3.5 mr-0.5" />,
    fallback: 'Github',
    badgeClass: 'bg-black text-white hover:bg-gray-800',
  },
  code: {
    icon: <Github className="size-3.5 mr-0.5" />,
    fallback: 'Github',
    badgeClass: 'bg-gray-900 text-white hover:bg-gray-800',
  },
  website: {
    icon: <Globe className="size-3.5 mr-0.5" />,
    fallback: 'Website',
    badgeClass: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  demo: {
    icon: <Play className="size-3.5 mr-0.5" />,
    fallback: 'Demo',
    badgeClass: 'bg-green-600 text-white hover:bg-green-700',
  },
  docs: {
    icon: <BookText className="size-3.5 mr-0.5" />,
    fallback: 'Docs',
    badgeClass: 'bg-indigo-600 text-white hover:bg-indigo-700',
  },
  default: {
    icon: <Globe className="size-3.5 mr-0.5" />,
    fallback: 'Visit',
    badgeClass: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  },
};

// Mapping màu badge theo tech, thêm hoặc sửa tùy stack của bạn!

function formatTag(tag: string) {
  return tag.trim().toLowerCase();
}

interface Props {
  title: string;
  href?: string;
  description: TypedObject[];
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?:
    | {
        title: string | null;
        url: string | null;
        type: string | null;
      }[]
    | null;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden border bg-card transition-all duration-300 ease-out h-full',
        'hover:scale-[1.025] hover:shadow-2xl group',
        className
      )}
    >
      <Link
        href={href || '#'}
        className={cn('block cursor-pointer relative aspect-[5/3]')}
        tabIndex={-1}
      >
        {/* Video ưu tiên, fallback image */}
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            poster={image}
            className="h-40 w-full object-cover object-top transition duration-300 group-hover:brightness-75"
          />
        ) : (
          <Image
            src={image || ''}
            alt={title || 'Project cover'}
            width={500}
            height={300}
            className="h-40 w-full object-cover object-top transition duration-300 group-hover:brightness-75"
          />
        )}
        <span className="sr-only">{title}</span>
      </Link>
      <CardHeader className="px-3 pt-2 pb-0">
        <CardTitle className="mt-1 text-base font-bold leading-snug tracking-tight line-clamp-2">
          {title}
        </CardTitle>
        {/* Hide link preview, mainly for printing */}
        <div className="hidden font-sans text-xs underline print:visible">
          {link?.replace('https://', '').replace('www.', '').replace('/', '')}
        </div>
        <div className="prose prose-sm max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert text-justify line-clamp-4">
          <PortableText value={description} />
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-3 pb-2 pt-1">
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap flex-row gap-1">
            {tags.map((tag) => {
              const key = formatTag(tag);
              return (
                <Badge
                  className={cn(
                    'px-1.5 py-0.5 text-[10px] font-semibold rounded-md border-0 capitalize shadow-sm'
                  )}
                  key={tag}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-0 mt-auto flex flex-row flex-wrap gap-2">
        {links &&links.map((l, idx) => {
          if (!l?.url) return null;
          const typeKey = l.type ? l.type.toLowerCase() : 'default';
          const mapItem = linkTypeMap[typeKey] || linkTypeMap.default;
          return (
            <Link
              href={l.url}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              tabIndex={0}
            >
              <Badge
                className={`flex gap-1 px-2 py-1 text-[11px] font-medium border-0 shadow-sm items-center transition-colors duration-150 ${mapItem.badgeClass}`}
              >
                {mapItem.icon}
                {l.title ?? mapItem.fallback}
              </Badge>
            </Link>
          );
        })}
      </CardFooter>
    </Card>
  );
}
