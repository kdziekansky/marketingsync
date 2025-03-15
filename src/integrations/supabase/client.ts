
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zqzxyqtfccjxyhdtsqqu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxenh5cXRmY2NqeHloZHRzcXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTgxMDQsImV4cCI6MjA1NzU3NDEwNH0.Z1JC9B1HtLXEuXGzzBJBuPhATYSDnzZ46A3x1aRpAhM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Rozszerzenie typu Database dodające tabelę profiles
declare module './types' {
  interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            email: string;
            name: string | null;
            avatar_url: string | null;
            role: string;
            created_at: string;
          };
          Insert: {
            id: string;
            email: string;
            name?: string | null;
            avatar_url?: string | null;
            role?: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            email?: string;
            name?: string | null;
            avatar_url?: string | null;
            role?: string;
            created_at?: string;
          };
        };
      } & Database['public']['Tables'];
    };
  }
}
