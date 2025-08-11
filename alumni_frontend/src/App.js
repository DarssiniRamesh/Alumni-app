import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventForm from './EventForm';
import EventList from './EventList';

function Navbar({ theme, toggleTheme }) {
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
      <Link to="/events" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Events</Link>
      <Link to="/events/new" style={{ marginRight: 18, color: 'var(--text-primary)', textDecoration: 'none' }}>Create Event</Link>
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
      <div className="App" style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main style={{ padding: '2em 0' }}>
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
                  Register, connect, and stay updated with alumni events.
                </p>
                <p>
                  Navigate to <Link to="/events">Events</Link> to see what's happening.
                </p>
              </div>
            } />
            <Route path="/events/new" element={<EventForm />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
