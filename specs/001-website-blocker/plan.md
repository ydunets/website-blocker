# Implementation Plan: Website Blocker Extension

**Branch**: `001-website-blocker` | **Date**: 2026-01-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-website-blocker/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Browser extension for productivity enhancement through website blocking with three-tier architecture: NestJS backend for data persistence and cross-device sync, Next.js admin dashboard for organizational management, and Vite + React Chrome Extension for real-time blocking. Features include personal blocklists, time-based scheduling, temporary overrides, usage analytics, and enterprise policy management.

## Technical Context

**Language/Version**: TypeScript 5.3+, Node.js 20+ LTS  
**Primary Dependencies**: NestJS, Prisma, React 18+, Next.js 15+, Vite 5+, @crxjs/vite-plugin  
**Storage**: PostgreSQL 15+ with Prisma ORM, Chrome Extension storage APIs  
**Testing**: Jest (backend), React Testing Library (frontend), Supertest (API e2e)  
**Target Platform**: Chrome Browser Extension (Manifest V3), Web Dashboard, Node.js Server
**Project Type**: Three-tier - determines source structure  
**Performance Goals**: <100ms extension popup load, <2s dashboard load, 95% blocking success rate  
**Constraints**: <50MB extension memory, 30-day analytics retention, offline-capable blocking  
**Scale/Scope**: 1000+ org users, real-time sync, enterprise-grade security

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **I. Three-Tier FSD Architecture**: Plan follows server/ (NestJS modules), client/ (Next.js + FSD), extension/ (Vite + React + FSD) structure  
✅ **II. API-First Development**: OpenAPI contracts defined first, Orval generates clients, Swagger documentation  
✅ **III. Type Safety & Code Generation**: TypeScript everywhere, Prisma for data models, Orval for API clients  
✅ **IV. Modern Tech Stack (2025)**: NestJS + Prisma + PostgreSQL, Next.js + TanStack Query + Tailwind, Vite + React + Manifest V3  
✅ **V. Browser Extension Best Practices**: Manifest V3, declarative Net Request API, proper Chrome APIs abstraction

**Gate Status**: ✅ PASS - All constitution principles satisfied

**Post-Design Re-evaluation** (Phase 1 Complete):  
✅ **Data Model**: Prisma schema follows constitutional type safety requirements  
✅ **API Contracts**: OpenAPI spec satisfies API-first development principle  
✅ **Extension Design**: Chrome Manifest V3 and FSD architecture properly implemented  
✅ **Cross-Tier Integration**: Orval codegen ensures type consistency across all tiers  
✅ **Three-Tier Compliance**: Clear separation of concerns maintained throughout design

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
server/
├── src/
│   ├── auth/            # Authentication module (JWT, guards)
│   ├── users/           # User management
│   ├── organizations/   # Organization management
│   ├── blocklists/      # Personal and org blocklists
│   ├── schedules/       # Time-based blocking rules
│   ├── analytics/       # Usage tracking and insights
│   ├── sync/            # Cross-device synchronization
│   ├── db/              # Prisma database service
│   ├── shared/          # Guards, decorators, utilities
│   └── main.ts          # Application bootstrap
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
└── tests/
    ├── e2e/            # End-to-end API tests
    └── unit/           # Unit tests

client/
├── src/
│   ├── app/             # Next.js app, providers, layout
│   ├── pages/           # Route pages (sign-in, dashboard, analytics)
│   ├── widgets/         # Page-level compositions
│   ├── features/        # Organization management, user settings
│   ├── entities/        # Users, blocklists, analytics queries
│   └── shared/          # UI kit, API clients, utilities
├── public/              # Static assets
└── tests/
    └── components/      # Component tests

extension/
├── src/
│   ├── app/             # Extension entry, providers, routing
│   ├── pages/           # Popup pages (home, settings, analytics)
│   ├── features/        # Blocking management, schedule config
│   ├── entities/        # Local blocklist, sync queries
│   └── shared/          # Browser APIs, UI kit, API clients
├── manifest.json        # Chrome Extension manifest V3
├── public/              # Extension assets (icons, blocking page)
└── tests/
    └── extension/       # Extension-specific tests

docs/
├── api/                 # API documentation
├── architecture/        # System design docs
└── deployment/          # Setup and deployment guides
```

**Structure Decision**: Three-tier application selected for Website Blocker Extension. Server provides API and data persistence, client serves as admin dashboard for organizations, extension delivers blocking functionality. FSD architecture applied to frontend tiers (client/, extension/) while server uses NestJS module organization.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations detected** - All constitution principles are satisfied by the three-tier FSD architecture design.
