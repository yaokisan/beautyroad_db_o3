"use client";
import { format } from 'date-fns';

export type SceneForTimeline = {
  id: string;
  title: string;
  start_at: string | Date;
  end_at: string | Date;
  confirmed?: boolean;
};

interface Props {
  scenes: SceneForTimeline[];
}

export const Timeline: React.FC<Props> = ({ scenes }) => {
  const sorted = [...scenes].sort(
    (a, b) => +new Date(a.start_at) - +new Date(b.start_at)
  );

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {sorted.map((s) => (
        <li key={s.id} className="mb-6 ml-6">
          <span
            className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900 ${
              s.confirmed ? 'bg-green-500' : 'bg-yellow-400'
            }`}
          />
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {format(new Date(s.start_at), 'HH:mm')} – {format(new Date(s.end_at), 'HH:mm')}
          </time>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            {s.title}
          </p>
        </li>
      ))}
    </ol>
  );
}; 