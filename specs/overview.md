# Todo App Overview

## Purpose
A multi-user Todo full-stack web application that evolves from console app to web.

## Current Phase
Phase II: Full-Stack Web Application

## Tech Stack
- Frontend: Next.js 16+ (App Router)
- Backend: FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT

## Features
- [ ] User signup/signin
- [ ] Task CRUD (Create, Read, Update, Delete)
- [ ] Mark task as complete
- [ ] Filter tasks by status (pending/completed)
- [ ] Task ownership enforced by JWT authentication

## Acceptance Criteria
- Users can only see their own tasks
- APIs reject unauthorized requests with 401
- JWT tokens expire after 7 days
- All task operations are tied to authenticated user

