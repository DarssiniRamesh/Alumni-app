import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseService";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase JS v2 no longer exposes getSessionFromUrl; try both for compatibility
        if (typeof supabase.auth.getSessionFromUrl === "function") {
          const { error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) throw error;
        } else if (typeof supabase.auth.exchangeCodeForSession === "function") {
          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession({ code });
            if (error) throw error;
          }
        }
        // After successful session retrieval, redirect user to a reasonable default
        navigate("/dashboard", { replace: true });
      } catch (error) {
        // If callback handling fails, send the user to the error page
        console.error("Auth callback error:", error);
        navigate("/auth/error", { replace: true });
      }
    };

    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ textAlign: "center", marginTop: 40 }}>Processing authentication...</div>;
}
