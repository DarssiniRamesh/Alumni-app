import React, { useState } from 'react';
import { createEvent } from './supabaseService';

// PUBLIC_INTERFACE
function EventForm({ onEventCreated }) {
  /**
   * Form to create a new event.
   * Calls Supabase service and informs parent of new event.
   */
  const [form, setForm] = useState({
    title: '',
    description: '',
    datetime: '',
    location: '',
    publicity: 'public',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const event = await createEvent(form);
      setForm({
        title: '',
        description: '',
        datetime: '',
        location: '',
        publicity: 'public',
      });
      if (onEventCreated) onEventCreated(event);
    } catch (err) {
      setError('Failed to create event: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} style={{
      maxWidth: 400, margin: 'auto', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #e9ecef'
    }}>
      <h2 style={{ marginBottom: 16 }}>Create Event</h2>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required minLength={3}
          style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid var(--border-color)', borderRadius: 6 }} />
      </label>
      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} required
          style={{ width: '100%', padding: 8, minHeight: 56, marginBottom: 8, border: '1px solid var(--border-color)', borderRadius: 6 }} />
      </label>
      <label>
        Date & Time
        <input name="datetime" type="datetime-local" value={form.datetime} onChange={handleChange} required
          style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid var(--border-color)', borderRadius: 6 }} />
      </label>
      <label>
        Location
        <input name="location" value={form.location} onChange={handleChange} required minLength={3}
          style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid var(--border-color)', borderRadius: 6 }} />
      </label>
      <label>
        Publicity
        <select name="publicity" value={form.publicity} onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 12, border: '1px solid var(--border-color)', borderRadius: 6 }}>
          <option value="public">Public (anyone can view)</option>
          <option value="alumni">Alumni Only</option>
          <option value="private">Private/Invitation</option>
        </select>
      </label>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" className="theme-toggle" disabled={loading}>
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}

export default EventForm;
