import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useSupabaseRows<T>(table: string, fallback: T[], orderColumn?: string) {
  const [rows, setRows] = useState<T[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    let query = supabase.from(table).select('*').eq('status', 'published');
    if (orderColumn) query = query.order(orderColumn, { ascending: true });
    query.then(({ data, error }) => {
      if (!error && data && data.length > 0) setRows(data as T[]);
    });
  }, [table, orderColumn]);

  return rows;
}
