import React, { useContext, useEffect, useState, createContext } from "react";
import { supabase } from "./supabaseService";

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthCtx);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Auth state with JWT integration, persist session on reload
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check existing session
  useEffect(() => {
    let unsub = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    supabase.auth.getSession().then(({data}) => {
      setUser(data?.session?.user ?? null);
      setLoading(false);
    });
    return () => { unsub?.data?.subscription?.unsubscribe?.(); }
  }, []);

  // PUBLIC_INTERFACE
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // PUBLIC_INTERFACE
  const signInWithProvider = async (provider) => {
    // provider: "google" or "linkedin"
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  // PUBLIC_INTERFACE
  const signupWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  // PUBLIC_INTERFACE
  const loginWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    logout,
    signInWithProvider,
    signupWithEmail,
    loginWithEmail,
  };

  return (
    <AuthCtx.Provider value={value}>
      {loading ? <div style={{ textAlign: "center", marginTop: 40 }}>Loading user...</div> : children}
    </AuthCtx.Provider>
  );
}
