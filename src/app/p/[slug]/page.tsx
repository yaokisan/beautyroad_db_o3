import { supabaseBrowser } from '@/lib/supabase/browser';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  return { title: `${params.slug} | Project` };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectPublicPage({ params }: any) {
  const supabase = supabaseBrowser();
  const { data: project, error } = await supabase
    .from('projects')
    .select('id, title, shoot_date, total_time, location, location_url, actors(id, name)')
    .eq('slug', params.slug)
    .single();

  if (error) {
    return <p className="p-6 text-red-500">エラー: {error.message}</p>;
  }
  if (!project) {
    return <p className="p-6">プロジェクトが見つかりません</p>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>収録日: {project.shoot_date ?? '-'}</p>
          <p>全体収録時間: {project.total_time ?? '-'}</p>
          <p>
            場所:{' '}
            {project.location_url ? (
              <a
                href={project.location_url}
                className="text-blue-600 underline"
                target="_blank"
              >
                {project.location}
              </a>
            ) : (
              project.location ?? '-'
            )}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">出演者</h2>
        {project.actors?.length ? (
          <ul className="space-y-1 list-disc list-inside">
            {project.actors.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/p/${params.slug}/actors/${a.id}`}
                  className="text-blue-600 underline"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>まだ出演者が登録されていません。</p>
        )}
      </section>
    </main>
  );
} 