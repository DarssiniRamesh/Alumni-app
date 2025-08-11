import React, { useEffect, useState } from 'react';
import { fetchEvents, updateEvent, uploadEventImages } from './supabaseService';

// PUBLIC_INTERFACE
function EventList() {
  /**
   * Displays a listing of events, with view/share and post-event update functionality.
   */
  const [events, setEvents] = useState([]);
  const [showUpload, setShowUpload] = useState({});
  const [uploading, setUploading] = useState({});
  const [error, setError] = useState('');
  const [editDetail, setEditDetail] = useState({});

  // PUBLIC_INTERFACE
  useEffect(() => {
    fetchEvents().then(setEvents).catch(err => setError(err.message));
  }, []);

  // PUBLIC_INTERFACE
  const toggleUpload = id => {
    setShowUpload(sh => ({ ...sh, [id]: !sh[id] }));
  };

  // PUBLIC_INTERFACE
  const handleFiles = async (id, files) => {
    setUploading(u => ({ ...u, [id]: true }));
    try {
      await uploadEventImages(id, files);
      // Reload event list
      const refreshed = await fetchEvents();
      setEvents(refreshed);
      setShowUpload(su => ({ ...su, [id]: false }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(u => ({ ...u, [id]: false }));
    }
  };

  // PUBLIC_INTERFACE
  const handleEditDetails = (id, updates) => {
    updateEvent(id, updates)
      .then(() => fetchEvents().then(setEvents))
      .catch(err => setError(err.message));
    setEditDetail(e => ({ ...e, [id]: false }));
  };

  if (error) {
    return <div style={{ color: 'red', margin: 16 }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '2em auto' }}>
      <h2 style={{ textAlign: 'left' }}>Events</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {events.length === 0 && <p>No events found.</p>}
        {events.map(ev => (
          <div key={ev.id}
            style={{
              background: 'var(--bg-secondary)',
              padding: 18,
              borderRadius: 8,
              minWidth: 320,
              flex: '1 1 320px',
              border: '1px solid var(--border-color)',
              marginBottom: 12,
            }}>
            <h3>{ev.title}</h3>
            <p style={{ fontSize: 15, margin: 0, color: '#555' }}>{ev.description}</p>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 3 }}>
              <b>{new Date(ev.datetime).toLocaleString()}</b> at {ev.location}
            </div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>
              Publicity: <strong>{ev.publicity}</strong>
            </div>
            {!!ev.photos && ev.photos.length > 0 && (
              <div style={{ margin: '8px 0' }}>
                {ev.photos.map(url => (
                  <img key={url} src={url}
                    alt="event"
                    style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 6, borderRadius: 6, border: '1px solid #ddd' }} />
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <a href={window.location.origin + `/event/${ev.id}`} target="_blank" rel="noopener noreferrer" className="App-link"
                style={{ fontSize: 14 }}>🔗 Share</a>
              <button className="theme-toggle" style={{ fontSize: 13, padding: '5px 12px' }}
                onClick={() => toggleUpload(ev.id)} disabled={uploading[ev.id]}>
                {showUpload[ev.id] ? 'Cancel' : 'Upload Photos'}
              </button>
              <button className="theme-toggle" style={{ fontSize: 13, padding: '5px 12px' }}
                onClick={() => setEditDetail(d => ({ ...d, [ev.id]: !d[ev.id] }))}>
                {editDetail[ev.id] ? 'Cancel Edit' : 'Edit Details'}
              </button>
            </div>
            {showUpload[ev.id] && (
              <div style={{ marginTop: 8 }}>
                <input type="file" multiple accept="image/*"
                  disabled={uploading[ev.id]}
                  onChange={e => handleFiles(ev.id, e.target.files)} />
                {uploading[ev.id] && <span>Uploading...</span>}
              </div>
            )}
            {editDetail[ev.id] && (
              <EditEventDetails event={ev} onSave={u => handleEditDetails(ev.id, u)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Tiny inline editor for event details (used post-event for detail update).
 */
function EditEventDetails({ event, onSave }) {
  const [desc, setDesc] = useState(event.description || '');
  const [loc, setLoc] = useState(event.location || '');

  return (
    <form style={{ marginTop: 8 }} onSubmit={e => {
      e.preventDefault();
      onSave({ description: desc, location: loc });
    }}>
      <input value={desc} onChange={e => setDesc(e.target.value)} required
        style={{ width: '60%', marginBottom: 5, padding: 5, borderRadius: 4, border: '1px solid #dedede' }} />
      <input value={loc} onChange={e => setLoc(e.target.value)} required
        style={{ width: '38%', marginLeft: 6, padding: 5, borderRadius: 4, border: '1px solid #dedede' }} />
      <button type="submit" className="theme-toggle" style={{ padding: '4px 10px', fontSize: 12 }}>Save</button>
    </form>
  );
}

export default EventList;
