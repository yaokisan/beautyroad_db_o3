import { supabaseBrowser } from '@/lib/supabase/browser';
import { Timeline } from '@/components/Timeline';
import { SceneTable } from '@/components/SceneTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Supabase からの結合結果用の簡易型
type SceneActorRow = {
  actor_id: string;
  duty: string | null;
  actors: {
    name: string;
  } | null;
};

type SceneJoin = {
  scenes: {
    id: string;
    title: string;
    start_at: string | null;
    end_at: string | null;
    script_url: string | null;
    note: string | null;
    scene_actors: SceneActorRow[];
  };
};

// 型互換エラーを避けるため、Next.js の PageProps 制約を満たしつつ any で受け取る
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ActorPage({ params }: any) {
  const resolvedParams = (await Promise.resolve(params)) as {
    slug: string;
    actorId: string;
  };

  const supabase = supabaseBrowser();

  // 出演者情報 + 企画情報取得
  const { data: actor, error } = await supabase
    .from('actors')
    .select(
      `id, name, in_time_min, in_time_max, out_time_min, out_time_max,
       scenes:scene_actors(scene_id, duty, scenes!inner(id, title, start_at, end_at, script_url, note, scene_actors(actor_id, actors(name))))`
    )
    .eq('id', resolvedParams.actorId)
    .single();

  if (error) {
    return <p className="p-6 text-red-500">エラー: {error.message}</p>;
  }
  if (!actor) {
    return <p className="p-6">出演者が見つかりません</p>;
  }

  // Supabase 型が自動生成されていないため `unknown` 経由でキャスト
  const sceneData = (actor.scenes as unknown as SceneJoin[] | undefined)?.map((sa) => {
    const { scenes } = sa;
    return {
      id: scenes.id,
      title: scenes.title,
      // null の場合は空文字にして型を合わせる
      start_at: scenes.start_at ?? '',
      end_at: scenes.end_at ?? '',
      script_url: scenes.script_url,
      note: scenes.note,
      confirmed: Boolean(scenes.start_at && scenes.end_at),
      actors: scenes.scene_actors?.map((sca: SceneActorRow) => ({
        id: sca.actor_id,
        name: sca.actors?.name ?? '',
        duty: sca.duty,
      })),
    };
  }) || [];

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Link href={`/p/${resolvedParams.slug}`} className="text-sm text-blue-600 underline">
        ← プロジェクトトップへ
      </Link>
      <h1 className="text-2xl font-bold">{actor.name} さんの出演情報</h1>

      <section>
        <h2 className="font-semibold mb-1">入り / 上がり 時間</h2>
        <p>
          {actor.in_time_min ? new Date(actor.in_time_min).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '未定'}
          {' 〜 '}
          {actor.out_time_max ? new Date(actor.out_time_max).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '未定'}
        </p>
      </section>

      <section>
        <h2 className="font-semibold mb-2">出演企画</h2>
        <SceneTable scenes={sceneData} />
      </section>

      <section>
        <h2 className="font-semibold mb-2">当日スケジュール</h2>
        <Timeline scenes={sceneData} />
      </section>
    </div>
  );
} 