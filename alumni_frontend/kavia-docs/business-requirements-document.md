# Business Requirements Document (BRD)  
**Alumni Registration and Directory Platform**

---

## 1. Project Overview

The Alumni Registration and Directory Platform is a web-based application designed to streamline the process of alumni registration and facilitate networking among alumni through a searchable directory. The platform now includes robust event management features, empowering alumni to create, share, and update events associated with the alumni community.

The platform supports modern, convenient authentication methods—including Google, LinkedIn, and email/password—enabling alumni to sign up, manage their profiles, participate in community events, and connect with others from their university. The system is built using a clean, modern React frontend and integrates with Supabase for backend services, including data and media storage.

---

## 2. Business Objectives

- **Expand and Maintain Alumni Engagement:**  
  Provide graduates with an accessible, easy-to-use platform to register as alumni, verify their credentials, and stay connected with their peers and institution.

- **Enable Secure, Flexible Authentication:**  
  Support sign up and login via popular OAuth2 providers (Google, LinkedIn) and traditional email/password, lowering barriers to entry and increasing trust.

- **Centralize Alumni Data and Networking:**  
  Allow the university administration to maintain a single, canonical directory of alumni—updating, managing, and searching records as needed.

- **Facilitate Community Events and Participation:**  
  Enable alumni and relevant staff to create, publicize, and share events (including reunions, networking opportunities, and university activities) with configurable visibility. Support post-event engagement with updates, details, or photo sharing.

- **Promote Institutional Relationships and Opportunities:**  
  Empower alumni and current students to discover professional/academic opportunities, networking contacts, or reasons for engagement (as captured in registration and event participation).

- **Reduce Administrative Overhead:**  
  Automate routine processes (registration, verification, profile management, and event publication), reducing the workload for administrative staff.

---

## 3. Project Description

The platform allows alumni to register via a web form, specifying their name, academic branch, graduation batch, and a reason for joining (selected from a defined list). Once registered, users can log in with Google, LinkedIn, or email. All users may subsequently manage their profiles and search the directory to find other alumni based on concise search parameters.

In addition to directory features, the platform offers a dedicated event management system. Authenticated alumni can create new events by submitting details such as title, description, date/time, location, and desired publicity level. Events can be designated as public, alumni-only, or private. After creation, events are listed and shared on the platform according to their settings, and can also be further distributed using public/shareable links.

Following an event, alumni (or designated organizers) may upload photographs and refine event details (such as descriptive text or location), ensuring a living record of alumni gatherings and activities. All event data and associated media are securely stored and managed through Supabase.

The user interface features a responsive, modern design with intuitive navigation. The backend leverages Supabase for authentication, data storage (including event data and images), and directory/event management. Administrative access allows university staff to oversee directory entries and manage alumni engagement.

---

## 4. Stakeholders

**Primary Stakeholders:**
- **University Administration:**  
  Oversees alumni verification, data retention, and institutional reporting.

- **Alumni Members:**  
  Use the platform to register, update profiles, and network with peers.

- **IT and Platform Administrators:**  
  Responsible for maintenance, platform updates, user support, and security compliance.

**Secondary Stakeholders:**
- **Current Students** (future users, networking exploration)
- **University Marketing and Development Teams** (outreach, event planning)

---

## 5. High-Level Requirements

### 5.1. Registration & Authentication

- Alumni must be able to register using a form capturing:
    - Full Name
    - Academic Branch/Department
    - Graduation Batch (year or range)
    - Reason to Join (chosen from enumerated options)
- Registration and authentication flows shall support Google, LinkedIn, and standard email/password methods.
- Users must confirm email address upon registration (if using email/password).

### 5.2. Profile Management

- Alumni can update basic profile information post-registration (excluding immutable fields such as email)
- Users can optionally add further personal/professional information in later releases

### 5.3. Alumni Directory & Search

- Registered users can search and browse the alumni directory using parameters such as name, branch, batch, and reason to join.
- The directory presents concise profiles, enabling alumni to identify and connect with peers.
- Directory is accessible only to authenticated/registered users.

### 5.4. Platform Administration

- University/IT administrators can access the directory backend with additional privileges (user verification, record updates, analytics)
- Security and privacy controls maintain compliance with institutional and legal requirements

### 5.5. Event Management

- All registered alumni may create an event by providing:
    - Title
    - Description
    - Date and Time
    - Location
    - Publicity/Visibility (options: Public, Alumni Only, Private/Invitation)
- Upon creating an event, the event is persisted in the system (Supabase-backed storage) and becomes available according to its visibility settings:
    - Public: Visible and shareable to all visitors.
    - Alumni Only: Visible only to authenticated/registered alumni.
    - Private: Accessible to invited users/alumni only.
- The event creator and permitted participants can edit event details, share the event (public link), and—after the event—upload photos or update descriptions and location via the platform.
- Event listings are presented in the main directory interface, with options to search, view, and interact with events according to their visibility.
- All uploaded images/media are stored in Supabase storage and linked to the event’s entry.
- The application supports secure file uploads and enforces required fields and minimum content standards for event information.
- Event data and post-event modifications are handled through Supabase using environment-provided access credentials, ensuring security and data consistency.

---

## 6. Out-of-Scope/Assumptions

- Alumni messaging and job-board features are out of scope for this release.
- Only basic profile management and event management are provided—advanced social or administrative features may be considered for future phases.
- Assumes alumni email or credentials can be verified by the administration as needed.

---

## 7. Success Criteria

- **Usability:**  
  Alumni can register, log in, and search directory entries with minimal friction and high satisfaction.

- **Adoption:**  
  Achieve a target number of registered alumni within the first three to six months post-launch.

- **Security & Compliance:**  
  Authentication is robust; data is protected via Supabase, with compliance to institutional security standards.

- **Data Integrity:**  
  Administration can reliably access, verify, and manage alumni records.

- **System Stability:**  
  Platform up-time and responsiveness meet agreed-upon Service Level Objectives (SLOs).

---

## 8. Dependencies & Environment

- **Frontend:** React (alumni_frontend)
- **Backend Services:** Supabase (managed via environment variables `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_KEY`)
- **Deployment Environment:** Web, supporting modern browsers. Responsive design for mobile and desktop.
- **Integration:** Backend alumni database and authentication/OAuth providers

---

## 9. Approval & Change Management

This document provides a baseline for feature design and implementation. Any subsequent changes or enhancements to the business requirements must be documented and approved by the university administration and IT leads.

---

**Document Version:** 1.0  
**Date:** [Auto-generated: Insert current date upon implementation]

