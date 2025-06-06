import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * サーバー側 (route handlers, getServerSideProps 相当) で使用する Supabase クライアント。
 * CookieStore を引数に渡すことで、auth 状態を維持する。
 */
export const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}; 