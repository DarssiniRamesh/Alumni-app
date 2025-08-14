import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import EventForm from './EventForm';
import EventList from './EventList';
import AlumniRegistrationForm from './AlumniRegistrationForm';
import AlumniDirectory from './AlumniDirectory';
import UserProfile from "./UserProfile";
import LoginSignup from "./LoginSignup";
import { AuthProvider, useAuth } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

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
      zIndex: 100,
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      rowGap: 8,
      columnGap: 12,
      overflowX: 'hidden'
    }}>
      <Link to="/" style={{ marginRight: 18, fontWeight: 800, color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span role="img" aria-label="mortarboard" style={{ fontSize: 22 }}>🎓</span>
        <span>Alumni Connect</span>
      </Link>

      {user ? (
        <>
          <Link to="/" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Home</Link>
          <Link to="/directory" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Directory</Link>
          <Link to="/profile" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Profile</Link>
          <Link to="/register" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Register</Link>
          <Link to="/events" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Events</Link>
          <Link to="/events/new" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Create Event</Link>
          <button className="theme-toggle" style={{ marginLeft: "10px" }} onClick={logout}>Logout</button>
        </>
      ) : (
        <div style={{ marginLeft: 6, fontSize: 14, color: '#666' }}>
          {/* Minimal nav when unauthenticated */}
        </div>
      )}

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        style={{ marginLeft: 'auto' }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      {!user && (
        <Link
          to="/login"
          style={{
            marginLeft: 10,
            background: "var(--brand-primary)",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700
          }}
        >
          Login / Register
        </Link>
      )}
    </nav>
  );
}

// PUBLIC_INTERFACE
function AppContent() {
  const { user, loading } = useAuth();

  // While loading auth state, prevent redirects flicker
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  }

  return (
    <Routes>
      {/* Redirect authenticated users away from login */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginSignup />} />

      {/* All other routes require authentication */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <AlumniRegistrationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/directory"
        element={
          <ProtectedRoute>
            <AlumniDirectory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/new"
        element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        }
      />
      {/* Fallback to root (protected) */}
      <Route path="*" element={<Navigate to="/" replace />} />
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
        <div className="App" style={{ minHeight: '100dvh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main style={{ padding: '1.25rem 0', flex: 1, width: '100%', boxSizing: 'border-box', minHeight: 0 }}>
            <AppContent />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
// End
