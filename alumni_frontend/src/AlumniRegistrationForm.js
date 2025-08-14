import React, { useState } from "react";
import { registerAlumnus } from "./supabaseService";
import "./App.css";

// Enumerated reasons to join (adjust as needed)
const REASONS = [
  "Networking",
  "Mentorship",
  "Job Opportunities",
  "Giving Back",
  "Social Activities"
];

// Branch list (could extend)
const BRANCHES = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
  "Other"
];

// Batch years - static for demo, recommend pulling from Supabase config/backend in production
const BATCHES = Array.from({length: 20}, (_,i) => `${2000+i}`);

export default function AlumniRegistrationForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    branch: BRANCHES[0],
    batch: BATCHES[BATCHES.length-1],
    reason: REASONS[0],
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    const {name, value} = e.target;
    setForm(f => ({...f, [name]: value}));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setSuccess("");
    try {
      await registerAlumnus(form);
      setSuccess("Registration complete. Your info has been submitted!");
      if (onSuccess) onSuccess();
      setForm({
        name: "",
        branch: BRANCHES[0],
        batch: BATCHES[BATCHES.length-1],
        reason: REASONS[0]
      });
    } catch (error) {
      setErr(error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        background: 'var(--bg-secondary)',
        maxWidth: 430,
        width: 'min(100%, 430px)',
        margin: "clamp(12px, 3vh, 24px) auto",
        borderRadius: 14,
        padding: 32,
        boxShadow: '0 2px 8px #e9ecef'
      }}
      aria-label="Alumni Registration Form"
    >
      <h2 style={{marginBottom:16}}>Alumni Registration</h2>
      <label>
        Full Name
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          minLength={2}
          style={{width: '100%', marginBottom: 10, padding: 8, border: '1px solid var(--border-color)', borderRadius: 8}}
        />
      </label>
      <label>
        Branch
        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
          style={{width: '100%', marginBottom: 10, padding: 8, border: '1px solid var(--border-color)', borderRadius: 8}}
        >{BRANCHES.map(b => <option key={b}>{b}</option>)}</select>
      </label>
      <label>
        Batch
        <select
          name="batch"
          value={form.batch}
          onChange={handleChange}
          style={{width: '100%', marginBottom: 10, padding: 8, border: '1px solid var(--border-color)', borderRadius: 8}}
        >{BATCHES.map(b => <option key={b}>{b}</option>)}</select>
      </label>
      <label>
        Reason to join
        <select
          name="reason"
          value={form.reason}
          onChange={handleChange}
          style={{width: '100%', marginBottom: 10, padding: 8, border: '1px solid var(--border-color)', borderRadius: 8}}
        >{REASONS.map(r => <option key={r}>{r}</option>)}</select>
      </label>
      {err && <div style={{ color:"red", marginBottom:8 }}>{err}</div>}
      {success && <div style={{ color:"green", marginBottom:8 }}>{success}</div>}
      <button className="theme-toggle" disabled={loading}>
        {loading ? "Submitting..." : "Register"}
      </button>
    </form>
  );
}
