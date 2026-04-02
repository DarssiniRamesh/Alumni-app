import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { supabase } from "./supabaseService";

// Uses fields as in registration form
const REASONS = [
  "Networking",
  "Mentorship",
  "Job Opportunities",
  "Giving Back",
  "Social Activities"
];
const BRANCHES = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
  "Other"
];
const BATCHES = Array.from({ length: 20 }, (_, i) => `${2000 + i}`);

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");

  // Load profile on mount
  useEffect(() => {
    if (user)
      supabase
        .from("alumni")
        .select("*")
        .eq("email", user.email)
        .single()
        .then(({ data }) => setProfile(data));
  }, [user]);

  if (!user) return <div style={{ margin: "40px auto", maxWidth: 440, textAlign: "center", color:"red"}}>Please log in to view your profile.</div>;

  if (!profile) return <div style={{ margin: 38, textAlign:"center"}}>Loading profile...</div>;

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setWorking(true);
    setMessage("");
    try {
      await supabase.from("alumni").update({
        name: profile.name,
        branch: profile.branch,
        batch: profile.batch,
        reason: profile.reason,
      }).eq("email", profile.email);
      setMessage("Profile updated!");
      setEdit(false);
    } catch (err) {
      setMessage("Failed to update: " + (err.message || err));
    } finally {
      setWorking(false);
    }
  }

  return (
    <div style={{maxWidth:400, margin:'2em auto',background:"var(--bg-secondary)",borderRadius:13,boxShadow:"0 2px 8px #e9ecef",padding:30,textAlign:"center" }}>
      <h2>User Profile</h2>
      <div><b>Email: </b>{profile.email}</div>
      {edit ? (
        <form onSubmit={handleUpdate}>
        <label>
          Name
          <input type="text" name="name" value={profile.name} onChange={handleFieldChange} required style={{width:'100%',marginBottom:9,padding:8,border:'1px solid var(--border-color)',borderRadius:7}} />
        </label>
        <label>
          Branch
          <select name="branch" value={profile.branch} onChange={handleFieldChange} style={{width:"100%",marginBottom:9,padding:8,border:'1px solid var(--border-color)',borderRadius:7}}>
            {BRANCHES.map(b => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label>
          Batch
          <select name="batch" value={profile.batch} onChange={handleFieldChange} style={{width:"100%",marginBottom:9,padding:8,border:'1px solid var(--border-color)',borderRadius:7}}>
            {BATCHES.map(b => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label>
          Reason
          <select name="reason" value={profile.reason} onChange={handleFieldChange} style={{width:"100%",marginBottom:14,padding:8,border:'1px solid var(--border-color)',borderRadius:7}}>
            {REASONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
        {/* Submit button for saving profile changes */}
        <button
          type="submit"
          className="theme-toggle"
          disabled={working}
          style={{width:"90%"}}
          aria-label="Save Profile Changes"
        >
          {working?"Saving...":"Save Changes"}
        </button>
        </form>
      ) : (
        <div>
          <div style={{margin:"10px 0"}}><b>Name: </b>{profile.name}</div>
          <div style={{margin:"10px 0"}}><b>Branch:</b> {profile.branch}</div>
          <div style={{margin:"10px 0"}}><b>Batch:</b> {profile.batch}</div>
          <div style={{margin:"10px 0"}}><b>Reason:</b> {profile.reason}</div>
        </div>
      )}
      {edit ?
        <button className="theme-toggle" onClick={()=>setEdit(false)} style={{marginTop: 10,width:"80%"}}>Cancel</button> :
        <button className="theme-toggle" onClick={()=>setEdit(true)} style={{marginTop: 10,width:"80%"}}>Edit Profile</button>
      }
      <button
        className="theme-toggle"
        style={{marginTop:18,width:"80%",background:"#df4444"}}
        onClick={logout}
      >Logout</button>
      {message && <div style={{marginTop:10,color:message.includes("updated")?"green":"red"}}>{message}</div>}
    </div>
  );
}
