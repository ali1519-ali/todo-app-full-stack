<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: None renamed, added specific tech stack principles
Added sections: Backend, Frontend, Authentication, API Enforcement
Removed sections: None
Templates requiring updates: ✅ Updated all templates
Follow-up TODOs: None
-->
# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Spec-Driven Development (NON-NEGOTIABLE)
Every feature must be defined in specifications before implementation begins. No manual coding is allowed without a corresponding spec. All development work must trace back to documented requirements in the feature specification files located at `/specs/[feature-name]/spec.md`.

### II. Full-Stack Architecture
The application follows a clear separation of concerns with a backend API service and a separate frontend client. The backend provides RESTful APIs consumed by the frontend, with clear contract definitions between layers.

### III. Technology Stack Adherence
Backend services must utilize FastAPI framework with SQLModel for database operations and Neon PostgreSQL for data persistence. Frontend development must use Next.js with the App Router pattern for routing and component organization.

### IV. Authentication & Authorization
All user-facing features must implement Better Auth for authentication, issuing JWT tokens for session management. Proper authorization patterns must be followed to ensure secure access control.

### V. API Isolation & Security (NON-NEGOTIABLE)
All API endpoints must enforce user isolation via JWT token validation. Each request must be authenticated and authorized to access only resources belonging to the authenticated user. No endpoint should allow unauthorized access to user-specific data.

### VI. Test-First Approach
All features must have comprehensive test coverage before implementation. Unit tests, integration tests, and end-to-end tests must be written to validate functionality, security, and performance requirements.

## Backend Requirements

Backend services must be built using FastAPI framework to leverage its async capabilities and automatic API documentation generation. SQLModel must be used for database modeling to maintain consistency between SQLAlchemy ORM and Pydantic models. Neon PostgreSQL must be used as the primary data store with proper connection pooling and transaction management.

## Frontend Requirements

Frontend development must follow Next.js best practices with the App Router for file-based routing. Components should be reusable and follow modern React patterns with TypeScript for type safety. The UI must be responsive and accessible across different device sizes.

## Authentication & Security

Better Auth must be implemented for all user authentication needs. JWT tokens issued by Better Auth must be validated on all protected endpoints. Session management, password reset, and account recovery flows must be properly implemented and secured.

## API Design Standards

All APIs must follow RESTful principles with consistent naming conventions. Proper HTTP status codes must be returned for all responses. API rate limiting and input validation must be implemented to prevent abuse and injection attacks.

## Development Workflow

All features must follow the spec-driven development workflow: specification → plan → tasks → implementation. Code reviews are mandatory for all pull requests. Automated testing must pass before merging. Continuous integration pipelines must validate all requirements before deployment.

## Governance

This constitution governs all development activities for the Todo Full-Stack Web Application. All team members must comply with these principles. Amendments require documentation and approval from project leadership. Version control follows semantic versioning principles.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Date of original adoption | **Last Amended**: 2026-01-09