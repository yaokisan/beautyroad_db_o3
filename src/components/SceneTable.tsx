"use client";
import Link from 'next/link';

export type SceneWithActors = {
  id: string;
  title: string;
  start_at: string | Date;
  end_at: string | Date;
  script_url?: string | null;
  note?: string | null;
  actors?: {
    id: string;
    name: string;
    duty?: string | null;
  }[];
};

interface Props {
  scenes: SceneWithActors[];
}

export const SceneTable: React.FC<Props> = ({ scenes }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold">企画名</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">時間</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">出演者 / 役割</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">台本</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">補足</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {scenes.map((scene) => (
          <tr key={scene.id}>
            <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
              {scene.title}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
              {scene.start_at && scene.end_at
                ? `${new Date(scene.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}〜${new Date(scene.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : '未定'}
            </td>
            <td className="whitespace-pre-wrap px-4 py-2 text-sm text-gray-900">
              {scene.actors?.map((a) => `${a.name}${a.duty ? `(${a.duty})` : ''}`).join('\n') || '-'}
            </td>
            <td className="px-4 py-2 text-sm text-blue-600 underline">
              {scene.script_url ? (
                <Link href={scene.script_url} target="_blank">
                  台本
                </Link>
              ) : (
                'なし'
              )}
            </td>
            <td className="px-4 py-2 text-sm text-gray-900">
              {scene.note || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}; 