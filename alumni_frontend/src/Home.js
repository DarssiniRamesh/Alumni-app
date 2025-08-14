import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Home() {
  /** 
   * Alumni-themed Home dashboard shown after authentication.
   * Includes a hero welcome, highlights, and testimonials placeholders.
   */
  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
          color: "#fff",
          padding: "48px 20px",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2 }}>
            Welcome back, Alumni!
          </h1>
          <p style={{ marginTop: 10, fontSize: 16, opacity: 0.95 }}>
            Celebrate achievements, reconnect with your peers, and stay close to campus.
          </p>
          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              to="/directory"
              className="btn-primary"
              style={{
                background: "#fff",
                color: "var(--brand-primary)",
                fontWeight: 700,
                padding: "10px 16px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Explore Directory
            </Link>
            <Link
              to="/events"
              className="btn-secondary"
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                fontWeight: 600,
                padding: "10px 16px",
                borderRadius: 8,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section style={{ maxWidth: 980, margin: "28px auto", padding: "0 16px" }}>
        <h2 style={{ marginBottom: 8 }}>Alumni Highlights</h2>
        <p style={{ marginTop: 0, color: "#555" }}>
          Inspirational journeys and milestones from our alumni community.
        </p>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: "1 1 280px",
                minWidth: 260,
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 2px 8px #e9ecef",
              }}
            >
              <div style={{ width: "100%", height: 150, overflow: "hidden" }}>
                <img
                  src={`https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop`}
                  alt="Alumni celebration"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: "6px 0 4px", fontSize: 18 }}>
                  Celebrating Success
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
                  Alumni achievements showcased here. Add real stories later.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          background: "var(--brand-section-bg)",
          padding: "26px 16px",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 8 }}>What Alumni Say</h2>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 380px",
                  minWidth: 300,
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <img
                    src={`https://via.placeholder.com/64x64.png?text=A${i}`}
                    alt="Alumni"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>Alumnus {i}</div>
                    <div style={{ fontSize: 12, color: "#777" }}>
                      Class of 20{10 + i}, Computer Science
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: 10, color: "#444", fontSize: 14 }}>
                  “This platform keeps me connected to friends and campus events.
                  It’s amazing to see how the community continues to grow.”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              Keep your profile up to date
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>
              Update your details so classmates can find you in the directory.
            </div>
          </div>
          <Link
            to="/profile"
            style={{
              background: "var(--brand-primary)",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
            }}
            aria-label="Update Profile"
          >
            Update Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
