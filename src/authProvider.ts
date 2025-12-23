import { AuthProvider } from "@refinedev/core";
import { supabase } from "./lib/supabaseClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    // --- 1. Handle Social Login (Google/GitHub) ---
    if (providerName) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
            redirectTo: `${window.location.origin}/admin`, // Redirect back to admin after login
        }
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            name: "LoginError",
          },
        };
      }

      return {
        success: true,
      };
    }

    // --- 2. Handle Email/Password Login ---
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: "LoginError",
        },
      };
    }

    if (data?.session) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "LoginError",
      },
    };
  },
  logout: async () => {
    await supabase.auth.signOut();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }
    return {};
  },
  check: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
      logout: true,
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      return {
        id: data.user.id,
        name: data.user.email,
        avatar: data.user.user_metadata?.avatar_url,
      };
    }
    return null;
  },
};