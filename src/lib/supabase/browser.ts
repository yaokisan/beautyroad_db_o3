import { createBrowserClient } from '@supabase/ssr';

/**
 * ページ/コンポーネントのクライアント側で呼び出して下さい。
 * 
 * env には NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定しておくこと。
 */
export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ); 