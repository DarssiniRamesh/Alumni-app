import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseService";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export default function AlumniDirectory() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [alumni, setAlumni] = useState([]);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    loadAlumni();
    // eslint-disable-next-line
  }, []);

  const loadAlumni = async () => {
    setFetching(true);
    setError("");
    let { data, error: err } = await supabase
      .from("alumni")
      .select("*")
      .order("name");
    setFetching(false);
    if (err) setError(err.message || String(err));
    else setAlumni(data);
  };

  // Filter alumni by search (by name, branch, batch, reason)
  const filtered = alumni.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.name || "").toLowerCase().includes(q) ||
      (a.branch || "").toLowerCase().includes(q) ||
      (a.batch || "").toLowerCase().includes(q) ||
      (a.reason || "").toLowerCase().includes(q)
    );
  });

  if (!user) {
    return <div style={{ margin: "40px auto", maxWidth: 440, textAlign: "center", color:"red"}}>Please log in to view the alumni directory.</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "2em auto" }}>
      <h2>Alumni Directory</h2>
      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          {error}
        </div>
      )}
      <input
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder="Search by name, branch, batch, reason..."
        style={{
          width: "92%",
          maxWidth: 350,
          padding: 8,
          marginBottom: 18,
          border: "1px solid var(--border-color)",
          borderRadius: 7
        }}
      />
      <div style={{display: "flex", flexWrap:"wrap", gap:24 }}>
        {fetching && <div>Loading...</div>}
        {filtered.length === 0 && !fetching && <div>No alumni found.</div>}
        {filtered.map(alum => (
          <div
            key={alum.id}
            style={{
              minWidth: 270,
              background: "var(--bg-secondary)",
              borderRadius: 8,
              boxShadow: "0 2px 8px #e9ecef",
              padding: 16,
              marginBottom: 8,
              flex: "1 1 250px"
            }}
          >
            <h4 style={{margin:"8px 0 6px"}}>{alum.name}</h4>
            <div style={{fontSize: 14, color: "#555"}}>
              {alum.branch}, Batch {alum.batch}
            </div>
            <div style={{fontSize: 13, color: "#888"}}>
              Reason: <strong>{alum.reason}</strong>
            </div>
            <div style={{fontSize: 12, marginTop:6, color:"#444"}}>Email: {alum.email || "Not shown"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
