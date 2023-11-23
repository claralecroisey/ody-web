import { ReactNode } from 'react';

interface TagProps {
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: ReactNode;
}

export default function Tag({ color = 'primary', children }: TagProps) {
  return <div className={`badge badge-${color} badge-lg`}>{children}</div>;
}
