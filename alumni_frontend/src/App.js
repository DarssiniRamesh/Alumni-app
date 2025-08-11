import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventForm from './EventForm';
import EventList from './EventList';
import AlumniRegistrationForm from './AlumniRegistrationForm';
import AlumniDirectory from './AlumniDirectory';
import UserProfile from "./UserProfile";
import LoginSignup from "./LoginSignup";
import { AuthProvider, useAuth } from './AuthProvider';

function Navbar({ theme, toggleTheme }) {
  // Always call hooks at top level, never conditionally
  const { user, logout } = useAuth();

  return (
    <nav style={{
      width: '100%',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <img src={logo} alt="logo" style={{ width: 44, height: 44, marginRight: 16 }} />
      <Link to="/" style={{ marginRight: 18, fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>Home</Link>
      <Link to="/directory" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Directory</Link>
      <Link to="/profile" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Profile</Link>
      <Link to="/register" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Register</Link>
      <Link to="/login" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Login</Link>
      <Link to="/events" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Events</Link>
      <Link to="/events/new" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Create Event</Link>
      {user && <button className="theme-toggle" style={{ marginLeft: "10px" }} onClick={logout}>Logout</button>}
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        style={{ marginLeft: 'auto' }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  );
}

// PUBLIC_INTERFACE
function AppContent({ theme, toggleTheme }) {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{
          maxWidth: 500,
          margin: '2em auto',
          textAlign: 'center',
          padding: 32,
          background: 'var(--bg-secondary)',
          borderRadius: 16,
          boxShadow: '0 2px 8px var(--border-color)'
        }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Alumni Connect Platform</h1>
          <p>
            Register, connect, and stay updated with alumni and events.
          </p>
          <p>
            Jump to <Link to="/directory">Directory</Link> or <Link to="/events">Events</Link>.
          </p>
        </div>
      } />
      <Route path="/register" element={<AlumniRegistrationForm />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/directory" element={<AlumniDirectory />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/new" element={<EventForm />} />
    </Routes>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main style={{ padding: '2em 0' }}>
            <AppContent theme={theme} toggleTheme={toggleTheme} />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
