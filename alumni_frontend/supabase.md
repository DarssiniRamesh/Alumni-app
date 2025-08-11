# Supabase Integration Guide for Alumni Events

## 1. Supabase Client Setup (React)
- Client is initialized in `src/supabaseService.js` via environment variables:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_KEY`
- Ensure these are present in your `.env` file.

---

## 2. Events Table Schema (Deployed as of [auto-update])

The following table is now present and ready for frontend event management:

| Column      | Type        | Nullable | Default        | Notes                                    |
|-------------|-------------|----------|----------------|------------------------------------------|
| id          | serial      |   No     |                | Primary key                              |
| title       | text        |   No     |                | Event title                              |
| description | text        |   No     |                | Event description                        |
| datetime    | timestamptz |   No     |                | Date and time of event                   |
| location    | text        |   No     |                | Event location                           |
| publicity   | text        |   No     | 'public'       | Enum: `public`, `alumni`, `private`      |
| photos      | text[]      |   Yes    | ARRAY[]::text[]| Array of event image URLs                |
| created_at  | timestamptz |   No     | now()          | Automatically set, record created time   |

- Primary Key: `id`
- Row Level Security: enabled
- Current RLS policy:
  - `SELECT` is allowed for all users, including anonymous/public.
  - If you need to restrict visibility, adjust this in the Supabase Dashboard.

---

## 3. Row Level Security (RLS)
- RLS is ENABLED on the `events` table.
- Policy for `SELECT` allows public read (anyone can view events via frontend—useful for public event listing).
- To restrict insert/update/delete or make it alumni-only, add further RLS policies based on your requirements.

---

## 4. Event Photos Storage Bucket

**IMPORTANT:**  
Supabase Storage Bucketing is not automatable via this script.  
- Please create a storage bucket named `event-photos` in your Supabase project dashboard.
- Set permissions to allow "upload" by authenticated users and "public read" for event display.
- Frontend expects files at: `event-photos/{eventId}/filename`.

- See: [Supabase Docs on Storage Buckets](https://supabase.com/docs/guides/storage)

---

## 5. Frontend Usage

- All database interactions (events and image URLs) and storage uploads are managed in `src/supabaseService.js`.
- No secrets are hardcoded—uses environment variables.

---

## 6. Environment Variables

**.env file example:**
```
REACT_APP_SUPABASE_URL=<your-project-url>
REACT_APP_SUPABASE_KEY=<your-anon-public-key>
```

---

## 7. Deployment/Policy Reminders

- Confirm Supabase project site URL allows both localhost and your production domain for auth/redirects if using authentication.
- Review RLS and storage bucket permissions in Supabase Dashboard as needed.

---

_Last updated: [Automated, event table and RLS configured via script]_
