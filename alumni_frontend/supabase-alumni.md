# Supabase Integration - Alumni Registration and Directory

## 1. Table: alumni

Table name: **alumni**

| Column   | Type    | Nullable | Default | Description                            |
|----------|---------|----------|---------|----------------------------------------|
| id       | serial  | No       |         | PK                                     |
| name     | text    | No       |         | Full name (editable)                   |
| branch   | text    | No       |         | Branch/Department (editable)           |
| batch    | text    | No       |         | Batch year (editable)                  |
| reason   | text    | No       |         | Reason to join (enum, editable)        |
| email    | text    | No       |         | Auth email, unique (immutable)         |
| created_at | timestamptz | No  | now()   | Record created                         |

- Enforce `email` uniqueness (1:1 with auth user).
- RLS:
  - INSERT: Allowed for authenticated users if the inserted email equals the JWT email (`email = auth.jwt()->>'email'`).
  - SELECT: Allowed for authenticated users (directory access).
  - UPDATE: Allowed only for the record owner (`email = auth.jwt()->>'email'`).
- Admin may view all via dashboard.
- Directory requires `SELECT` on all rows for authenticated users.

## 2. Profile Management

- Profile page loads from `alumni` table with user's email.
- Updates allowed to name, branch, batch, reason (but not email).

## 3. Registration

- Registration form inserts into `alumni` for the logged in user's email.

## 4. Directory

- SELECT rows for search/list UI, restricted to authenticated users.
