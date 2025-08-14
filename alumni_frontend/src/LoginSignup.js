import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { signupWithEmail, loginWithEmail, signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // PUBLIC_INTERFACE
  const emailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFeedback("");
    setPending(true);
    const form = Object.fromEntries(new FormData(e.target));
    try {
      if (isLogin) {
        await loginWithEmail(form.email, form.password);
        setFeedback("Logged in!");
        navigate(from, { replace: true });
      } else {
        await signupWithEmail(form.email, form.password);
        setFeedback("Check your email for confirmation!");
        // For email signup, often verification is required; do not auto-redirect.
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setPending(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleOAuth = async provider => {
    setError(""); setPending(true);
    try {
      await signInWithProvider(provider);
      // OAuth will redirect; post-redirect, ProtectedRoute/Home will load.
    } catch (err) {
      setError(err.message || String(err));
    } finally { setPending(false); }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "2em auto",
      background: "var(--bg-secondary)",
      borderRadius: 13,
      boxShadow: "0 2px 8px #e9ecef",
      padding: 30,
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: 10 }}>{isLogin ? "Login" : "Sign Up"}</h2>
            
      <button
        className="theme-toggle"
        style={{marginBottom: 6, width: '100%', display: "block"}}
        onClick={() => handleOAuth("google")}
        disabled={pending}
      >{pending ? "Connecting..." : "Continue with Google"}</button>
      <button
        className="theme-toggle"
        style={{marginBottom: 10, width: '100%', display: "block"}}
        onClick={() => handleOAuth("linkedin")}
        disabled={pending}
      >{pending ? "Connecting..." : "Continue with LinkedIn"}</button>
      <div style={{margin:"14px 0", fontWeight:600}}>or with email</div>
      <form onSubmit={emailSubmit}>
        <input
          required
          minLength={3}
          name="email"
          placeholder="Email"
          type="email"
          style={{width: "100%", marginBottom:10, padding:7, borderRadius:7, border:"1px solid var(--border-color)"}}
        />
        <input
          required
          minLength={6}
          name="password"
          placeholder="Password"
          type="password"
          style={{width: "100%", marginBottom:10, padding:7, borderRadius:7, border:"1px solid var(--border-color)"}}
        />
        <button className="theme-toggle" disabled={pending} style={{width: "100%"}}>{pending ? "Processing..." : (isLogin ? "Login" : "Sign Up")}</button>
      </form>
      <div style={{marginTop:7, fontSize:14}}>
        {isLogin ? (
          <>No account? <button style={{color:"var(--button-bg)", background:"none", border:"none",textDecoration:"underline",cursor:"pointer"}} onClick={()=>setIsLogin(false)}>Sign up</button></>
        ) : (
          <>Have an account? <button style={{color:"var(--button-bg)", background:"none", border:"none", textDecoration:"underline",cursor:"pointer"}} onClick={()=>setIsLogin(true)}>Log in</button></>
        )}
      </div>
      {error && <div style={{color:"red",marginTop:8}}>{error}</div>}
      {feedback && <div style={{color:"green",marginTop:8}}>{feedback}</div>}
    </div>
  );
}
