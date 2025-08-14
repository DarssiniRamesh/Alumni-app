import { Link } from "react-router-dom";

export default function AuthError() {
  return (
    <div style={{ maxWidth: 480, margin: "3rem auto", textAlign: "center" }}>
      <h2>Authentication Error</h2>
      <p style={{ color: "#b00020" }}>
        There was a problem completing your sign-in. This can happen if the redirect URL
        isn't allowlisted or your session link expired.
      </p>
      <ul style={{ textAlign: "left", margin: "1rem auto", maxWidth: 420 }}>
        <li>Ensure your redirect URL is allowed in Supabase Authentication settings.</li>
        <li>Try the sign-in again, or use a different method.</li>
      </ul>
      <div style={{ marginTop: 16 }}>
        <Link to="/login" style={{ textDecoration: "none", fontWeight: 700 }}>
          Return to Login
        </Link>
      </div>
    </div>
  );
}
