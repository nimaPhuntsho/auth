# Session-Based Authentication Server

## Overview

This project is a custom session-based authentication system built to understand how authentication works under the hood beyond framework-provided abstractions. Instead of relying on managed auth helpers, the system implements server-side sessions using Express, Redis, Supabase (PostgreSQL), and a Next.js frontend.

The goal of the project is educational and architectural: to explore authentication trade-offs, session lifecycle management, and real-world backend concerns such as security, scalability, and correctness.

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

# Project layout

/api -> Express server (src, services)

/web -> NextJS app (app, components)

# API endpoints (summary)

[POST] /api/v1/login – Validate user and set sid cookie

[POST] /api/v1/logout – Destory the session

[GET] /api/v1/session – Returns the current sid or 401

[POST] /api/v1/register – Creates a new user
