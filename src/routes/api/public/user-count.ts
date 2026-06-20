import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/user-count')({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        const count = data?.total ?? data?.users?.length ?? 0;
        return new Response(JSON.stringify({ count }), { headers: { 'Content-Type': 'application/json' } });
      }
    }
  }
});
