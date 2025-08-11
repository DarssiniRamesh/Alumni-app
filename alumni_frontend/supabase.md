# Supabase Integration Guide for Alumni Events

## 1. Supabase Client Setup (React)
- Client is initialized in `src/supabaseService.js` via environment variables:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_KEY`
- These must be present in your `.env` file.

## 2. Events Table Schema

A table named `events` must exist in Supabase with columns:
- `id` (serial primary key)
- `title` (text)
- `description` (text)
- `datetime` (timestamp/timestamptz)
- `location` (text)
- `publicity` (text; valid values: 'public', 'alumni', 'private')
- `photos` (text[] or JSONB) -- stores URLs of event images (optional; default empty array)
- `created_at` (timestamp, default now())
- (Optionally: organizer_id, foreign key to user, if you wish to record ownership/admin)

**Row Level Security (RLS):**
- If events should be public, allow "select" to anon/public.
- If alumni-only, restrict via Supabase policies.

## 3. Event Photos Storage

- In Supabase Storage, create a bucket called `event-photos`.
- Allow "upload" and "public read" access as needed for your use case.
- Uploaded files are stored at path: `event-photos/{eventId}/filename`.

## 4. Usage in Frontend

- All reads, writes, and file uploads are handled via the `supabaseService.js`.
- No secrets are hardcoded.

## 5. Environment Variables

**.env file example:**
```
REACT_APP_SUPABASE_URL=<your-project-url>
REACT_APP_SUPABASE_KEY=<your-anon-public-key>
```

## 6. Next Steps

- Apply policy in Supabase dashboard for table/storage.
- Optionally, link events to creator's user/organizer via `auth.uid()` and configure privacy accordingly.

----
Last updated: [Auto-generated]
