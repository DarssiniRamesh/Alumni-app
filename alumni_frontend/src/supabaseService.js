import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

// PUBLIC_INTERFACE
export async function createEvent(event) {
  /**
   * Create a new event in the Supabase 'events' table.
   * @param {Object} event - { title, description, datetime, location, publicity }
   * @returns {Object} Inserted row or error.
   */
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select();
  if (error) throw error;
  return data[0];
}

// PUBLIC_INTERFACE
export async function fetchEvents() {
  /**
   * Fetch all events in descending datetime.
   */
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('datetime', { ascending: false });
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function updateEvent(id, updates) {
  /**
   * Update event by id.
   * @param {number} id 
   * @param {Object} updates 
   */
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

// PUBLIC_INTERFACE
export async function uploadEventImages(eventId, files) {
  /**
   * Upload event images to supabase storage bucket 'event-photos/{eventId}/'.
   * Returns public URLs.
   */
  let uploadedUrls = [];
  for (let file of files) {
    const path = `${eventId}/${Date.now()}_${encodeURIComponent(
      file.name.replace(/\s/g, '_')
    )}`;
    let { data, error } = await supabase.storage
      .from('event-photos')
      .upload(path, file);
    if (error) throw error;
    // PUBLIC URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('event-photos')
      .getPublicUrl(path);
    uploadedUrls.push(publicUrl);
  }
  // Append photo URLs to event row
  await supabase
    .from('events')
    .update({
      photos: uploadedUrls,
    })
    .eq('id', eventId);
  return uploadedUrls;
}
