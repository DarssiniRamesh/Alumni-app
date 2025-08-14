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

_Last updated: [Automated, event & alumni table and RLS configured via script]_

---

## Alumni Table Schema (as of [auto-update])

The alumni table is present and required for registration, directory, and profile features.

| Column      | Type        | Nullable | Default        | Notes                              |
|-------------|-------------|----------|----------------|------------------------------------|
| id          | serial      |   No     |                | Primary key                        |
| name        | text        |   No     |                | Full name (editable)               |
| branch      | text        |   No     |                | Branch/Department                  |
| batch       | text        |   No     |                | Batch year                         |
| reason      | text        |   No     |                | Reason to join (enum, editable)    |
| email       | text        |   No     |                | Auth email, unique (immutable)     |
| created_at  | timestamptz |   No     | now()          | Record creation timestamp          |

- Primary Key: `id`
- Unique: `email`
- RLS: enabled (see below)

---

## Row Level Security (RLS) Policies

### Events Table
- RLS enabled.
- SELECT: allowed for any user (public read).
- UPDATE/INSERT: restrict as needed via Supabase dashboard.

### Alumni Table
- RLS enabled.
- SELECT: allowed for authenticated users only.
- INSERT: allowed for authenticated users only if the inserted row’s email equals the JWT email (`email = auth.jwt()->>'email'`).
- UPDATE: only allowed for the record owner where the row’s email equals the JWT email (`email = auth.jwt()->>'email'`).

Policy summary (effective):
- INSERT: authenticated WITH CHECK (email = (auth.jwt() ->> 'email'))
- SELECT: authenticated USING (true)
- UPDATE: authenticated USING (email = (auth.jwt() ->> 'email')) WITH CHECK (email = (auth.jwt() ->> 'email'))

Additionally:
- A partial unique index enforces unique email (case-insensitive) when email is not null:
  CREATE UNIQUE INDEX alumni_email_unique_idx ON public.alumni (lower(email)) WHERE email IS NOT NULL;

---

## Storage Buckets

Bucket: `event-photos`
- Set up manually in Supabase UI.
- Must allow upload for authenticated users and public read for all.
- Used for event images (`event-photos/{eventId}/filename`).

---

## Environment & Auth Setup

1. **Env Variables**
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_KEY`
   - Must be present in `.env` for the React app.

2. **Supabase Auth Site URL**
   - In Supabase Dashboard, set Auth | URL Configuration to BOTH:
     - `http://localhost:3000/**`
     - `<production-domain>`
   - All redirect URLs for OAuth and email sign-in must use these allowed domains.

---

## IMPORTANT: Manual Tasks Required

- You **MUST** create the `event-photos` bucket via Supabase storage UI.
- You **MUST** update environment variables (`REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_KEY`).
- You **MUST** allow relevant redirects in Supabase Auth settings.

---



