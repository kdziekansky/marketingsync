
export type AuthProvider = 'email' | 'google' | 'github' | 'facebook';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: 'client' | 'employee' | 'admin' | 'superadmin';
  created_at: string;
}

export interface AuthSession {
  user: UserProfile | null;
  session: any;
  isLoading: boolean;
  error: string | null;
}
