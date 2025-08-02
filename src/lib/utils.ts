import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPeriod = (period: string) => {
  const [start, end] = period.split(' - ');
  const startDate = new Date(start).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const endDate =
    end === 'Present'
      ? end
      : new Date(end).toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        });
  return `${startDate} - ${endDate}`;
};

export function portableTextToPlainText(blocks: any[] = []): string {
  return (
    blocks
      ?.map((block) =>
        block._type === 'block'
          ? block.children?.map((child: any) => child.text).join('')
          : ''
      )
      .join(' ') ?? ''
  );
}

export function getDuration(start: any, end: any) {
  // Nếu end là "Present" thì dùng ngày hôm nay
  const endDate = end === 'Present' ? new Date() : new Date(end);
  const startDate = new Date(start);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0) return `${months} tháng`;
  if (months === 0) return `${years} năm`;
  return `${years} năm ${months} tháng`;
}
