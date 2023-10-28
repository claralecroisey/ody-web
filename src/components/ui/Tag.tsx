import { ReactNode } from 'react';

interface TagProps {
  color: string;
  children: ReactNode;
}

export default function Tag({ color, children }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
    >
      {children}
    </span>
  );
}
