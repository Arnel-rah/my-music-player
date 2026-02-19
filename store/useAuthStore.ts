import { create } from "zustand";
import { supabase } from "@/services/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  loadSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({
        user: {
          id: session.user.id,
          name: session.user.user_metadata?.name ?? session.user.email?.split("@")[0] ?? "User",
          email: session.user.email ?? "",
          avatar: session.user.user_metadata?.avatar_url,
        },
        isAuthenticated: true,
      });
    }
    set({ isLoading: false });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    if (data.user) {
      set({
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.name ?? email.split("@")[0],
          email: data.user.email ?? "",
          avatar: `https://picsum.photos/seed/${email}/100/100`,
        },
        isAuthenticated: true,
      });
    }
    return null;
  },

  signup: async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return error.message;
    if (data.user) {
      set({
        user: {
          id: data.user.id,
          name,
          email,
          avatar: `https://picsum.photos/seed/${email}/100/100`,
        },
        isAuthenticated: true,
      });
    }
    return null;
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));