# Website Blocker Extension

A comprehensive productivity extension that helps users stay focused by blocking distracting websites during work sessions. Built with a three-tier architecture following Feature-Sliced Design (FSD) principles.

## 🏗️ Architecture

This project follows a **three-tier FSD architecture**:

- **Server** (`server/`): NestJS backend with Prisma ORM and PostgreSQL
- **Client** (`client/`): Next.js admin dashboard for organization management  
- **Extension** (`extension/`): Chrome browser extension built with Vite + React

## 🎯 Core Features

### Individual Users
- ✅ **Personal Blocklists**: Add/remove distracting websites with simple interface
- ⏰ **Time-Based Scheduling**: Set work hours (9-5) or custom blocking periods  
- 🔓 **Temporary Override**: Disable blocking for 5min/15min/1hr when needed
- 📊 **Usage Analytics**: Track time saved and most-attempted sites (30-day retention)
- 🔄 **Cross-Device Sync**: Settings sync across all devices via backend API

### Organizations
- 👨‍💼 **Admin Dashboard**: Web interface for policy management
- 🏢 **Company Policies**: Set organization-wide blocked sites (overrides personal settings)
- 📈 **Team Insights**: Aggregate productivity analytics without individual data
- 🔐 **Policy Enforcement**: Control employee override permissions

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ LTS
- Docker (for PostgreSQL)
- Chrome/Chromium browser

### Setup All Tiers

```bash
# Clone and install dependencies
git clone <repository-url>
cd website-blocker

# Install dependencies for all tiers
npm run install:all

# Start development environment
npm run dev:all
```

### Individual Tier Setup

#### Server (NestJS)
```bash
cd server/
npm install
docker-compose up -d  # Start PostgreSQL
npm run db:migrate   # Apply database migrations
npm run dev          # Start at http://localhost:3000
```

#### Client Dashboard (Next.js)  
```bash
cd client/
npm install
npm run dev          # Start at http://localhost:3001
```

#### Browser Extension (Vite + React)
```bash
cd extension/
npm install
npm run build        # Build extension
npm run dev          # Development with hot reload
```

## 📁 Project Structure

```
├── server/                 # 🟢 NestJS Backend API
│   ├── prisma/            # Database schema & migrations
│   ├── src/               # FSD architecture
│   │   ├── app/           # Application configuration
│   │   ├── features/      # Business logic (auth, blocking, analytics)
│   │   ├── entities/      # Data models & services
│   │   └── shared/        # Common utilities
│   └── docs/              # API documentation (Swagger)
│
├── client/                # 🔵 Next.js Admin Dashboard  
│   ├── src/               # FSD architecture
│   │   ├── app/           # Next.js app router
│   │   ├── pages/         # Page components
│   │   ├── features/      # UI business logic
│   │   ├── entities/      # Data management (React Query)
│   │   └── shared/        # UI components (Tailwind)
│   └── public/            # Static assets
│
├── extension/             # 🟡 Chrome Extension
│   ├── src/               # FSD architecture  
│   │   ├── app/           # Background scripts & service worker
│   │   ├── pages/         # Popup & options pages
│   │   ├── features/      # Blocking logic & scheduling
│   │   ├── entities/      # Local storage & Chrome APIs
│   │   └── shared/        # Extension utilities
│   ├── manifest.json      # Chrome Extension manifest (V3)
│   └── public/            # Extension assets
│
└── specs/                 # 📋 Project Documentation
    └── 001-website-blocker/
        ├── spec.md        # Feature specification  
        ├── plan.md        # Implementation roadmap
        ├── quickstart.md  # Development guide
        └── data-model.md  # Database schema
```

## 🏛️ Constitution (Technical Principles)

This project adheres to five core architectural principles:

### I. Three-Tier FSD Architecture
- **Server**: NestJS modules organized by features
- **Client**: Next.js with FSD layers (app/pages/features/entities/shared)
- **Extension**: Vite + React following same FSD structure

### II. API-First Development  
- OpenAPI contracts defined first in `specs/contracts/api-spec.yaml`
- Orval generates TypeScript clients for frontend consumption
- Swagger documentation auto-generated from NestJS decorators

### III. Type Safety & Code Generation
- **TypeScript everywhere** (5.3+ strict mode)
- **Prisma** for database models and migrations
- **Orval** for API client generation with full type safety

### IV. Modern Tech Stack (2025)
- **Backend**: NestJS + Prisma + PostgreSQL + Jest
- **Frontend**: Next.js 15 + TanStack Query + Tailwind CSS
- **Extension**: Vite + React + Chrome Manifest V3

### V. Browser Extension Best Practices
- **Manifest V3** for modern Chrome extensions  
- **Declarative Net Request API** for blocking
- **Proper Chrome APIs abstraction** in shared layer

## 🚦 Development Workflow

1. **API Contracts First**: Define endpoints in OpenAPI spec
2. **Generate Clients**: Run Orval to generate TypeScript clients  
3. **Backend Implementation**: Implement NestJS controllers/services
4. **Frontend Integration**: Use generated clients in React components
5. **Extension Features**: Leverage Chrome APIs for blocking logic

## 📊 Performance Goals

- ⚡ **Extension popup load**: <100ms
- 🖥️ **Dashboard load**: <2s  
- 🛡️ **Blocking success rate**: 95%+
- 💾 **Extension memory**: <50MB
- 📅 **Analytics retention**: 30 days (user configurable)

## 🔧 Available Scripts

```bash
# Root level commands
npm run install:all      # Install deps for all tiers
npm run dev:all         # Start all development servers
npm run build:all       # Build all projects for production
npm run test:all        # Run all test suites

# Individual tier commands  
npm run dev:server      # Start NestJS backend
npm run dev:client      # Start Next.js dashboard
npm run dev:extension   # Start extension development
```

## 🧪 Testing

- **Backend**: Jest + Supertest for API endpoints
- **Frontend**: React Testing Library + MSW for API mocking  
- **Extension**: Jest + Chrome API mocks
- **E2E**: Playwright for critical user workflows

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Read the [specification](specs/001-website-blocker/spec.md) for feature requirements
2. Follow the [implementation plan](specs/001-website-blocker/plan.md) for development phases
3. Use the [quickstart guide](specs/001-website-blocker/quickstart.md) for local setup
4. Maintain FSD architecture and constitutional principles

## 📚 Documentation

- [📋 Feature Specification](specs/001-website-blocker/spec.md)
- [🗺️ Implementation Plan](specs/001-website-blocker/plan.md)  
- [⚡ Quick Start Guide](specs/001-website-blocker/quickstart.md)
- [🗄️ Data Model](specs/001-website-blocker/data-model.md)
- [🔌 API Documentation](server/docs/) (Generated from OpenAPI)

---

**Status**: Development Phase | **Version**: 0.1.0 | **Last Updated**: January 12, 2026