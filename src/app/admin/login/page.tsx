"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email: 'yaoki.kobayashi@empire-art.jp',
      password: pw,
    });
    if (error) return setErr(error.message);
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-md bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-center text-xl font-bold">管理者ログイン</h1>
        <input
          type="password"
          placeholder="パスワード"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />
        {err && <p className="mb-4 text-sm text-red-600">{err}</p>}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          ログイン
        </button>
      </form>
    </div>
  );
} 