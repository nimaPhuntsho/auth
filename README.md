# Auth server with Express + TS

A monorepo combining an **Express** session-based auth API and a **Next.js** SSR frontend.  
Built for learning and ready for production hardening.

# Project layout

/api -> Express server (src, services)

/web -> NextJS app (app, components)

# API endpoints (summary)

[POST] /api/v1/login – Validate user and set sid cookie

[POST] /api/v1/logout – Destory the session

[GET] /api/v1/session – Returns the current sid or 401

[POST] /api/v1/register – Creates a new user
