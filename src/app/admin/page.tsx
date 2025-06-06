import Link from 'next/link';

export const dynamic = 'force-static';

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Admin ダッシュボード</h1>
      <p>ここにプロジェクト一覧や新規作成ボタンを実装予定です。</p>
      <Link href="/admin/projects/new" className="text-blue-600 underline">
        [+] プロジェクトを作成
      </Link>
    </main>
  );
} 