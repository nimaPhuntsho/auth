# Session-Based Authentication Server

## Overview

This project is a custom session-based authentication system built to understand how authentication works under the hood beyond framework-provided abstractions. Instead of relying on managed auth helpers, the system implements server-side sessions using Express, Redis, Supabase (PostgreSQL), and a Next.js frontend.

The goal of the project is educational and architectural: to explore authentication trade-offs, session lifecycle management, and real-world backend concerns such as security, scalability, and correctness.

## Why Session-Based Auth?

This project intentionally uses sessions instead of JWT-only auth to explore:

- Immediate server-side revocation

- Secure logout semantics

- Reduced token leakage risk

- Centralized session control

The trade-offs (scaling Redis, stateful backend) are acknowledged and discussed.

## What I Learned

- How authentication works beyond SDKs

- Why database constraints matter more than frontend validation

- How Redis is used in real production systems

- Common auth edge cases (duplicate users, stale sessions)

- Security implications of cookies and session handling

## Limitations & Future Improvements

- Redis as a single point of failure

- No refresh-session rotation

- No rate limiting on auth endpoints

- No multi-device session management

## Tech Stack

### Backend

- Node.js + Express

- Supabase (PostgreSQL)

- Redis (session store)

### Frontend

- HTTP-only cookies

- Server-managed sessions

- Password hashing

- Database constraints (UNIQUE, NOT NULL)

## Architecture Overview

1. The frontend (Next.js) sends authentication requests to the Express API.

2. The API validates credentials against Supabase Postgres.

3. On successful login:

- A session ID (SID) is generated

- Session data is stored in Redis under session:<sid>

- The SID is sent back as an HTTP-only cookie

4. Subsequent requests authenticate using the session cookie.

5. Logout deletes the Redis session and clears the cookie.

## Authentication Flow

### Signup

- User submits name, email, and password

- Password is hashed before storage

- Email is enforced as UNIQUE at the database level

- On duplicate email, PostgreSQL raises error code 23505

### Login

- Credentials are verified against the database

- A server-side session is created in Redis

- Session ID is returned as an HTTP-only cookie

### Session Validation

- Each protected request checks for a valid session ID

- Redis is queried to confirm session existence

### Logout

- Redis session is deleted

- Session cookie is cleared from the browser

## Prerequisites

Make sure you have the following installed:

- Node.js
  (v18+ recommended)

- npm
  or yarn

## Installation

### Clone repo

git clone https://github.com/nimaPhuntsho/auth.git

### Install dependencies for both frontend and backend:

## Install backend dependencies

cd api
npm install

## Install frontend dependencies

cd web
npm install

## Environment Variables

NEXT_PUBLIC_SUPABASE_URL=YOUR SUPABASE URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR ENON KEY

## Disclaimer

This project is built for learning and demonstration purposes. In production systems, managed auth solutions or additional hardening would be recommended.
