# Quickstart: Website Blocker Extension

**Feature**: Website Blocker Extension  
**Created**: 2026-01-12  
**Phase**: 1 - Design & Contracts

This guide walks you through setting up the complete Website Blocker Extension development environment using the three-tier FSD architecture.

## Prerequisites

- **Node.js**: 20.0+ LTS
- **TypeScript**: 5.3+
- **Docker**: Latest version
- **Chrome/Chromium**: For extension testing
- **Git**: Version control

## Project Structure

```
├── server/                 # NestJS Backend API
│   ├── prisma/            # Database schema & migrations
│   ├── src/               # FSD architecture
│   │   ├── app/           # Application configuration
│   │   ├── features/      # Business logic modules
│   │   ├── entities/      # Data models & services
│   │   └── shared/        # Common utilities
│   └── swagger.json       # Generated API documentation
├── client/                # Next.js Admin Dashboard
│   ├── src/               # FSD architecture
│   │   ├── app/           # Next.js app router
│   │   ├── pages/         # Page components
│   │   ├── features/      # UI business logic
│   │   ├── entities/      # Data management
│   │   └── shared/        # UI components & utilities
│   └── orval.config.js    # API client generation
├── extension/             # Chrome Extension (Vite + React)
│   ├── src/               # FSD architecture
│   │   ├── app/           # Extension app & service worker
│   │   ├── pages/         # Popup & options pages
│   │   ├── features/      # Extension features
│   │   ├── entities/      # Local data management
│   │   └── shared/        # Extension utilities & browser APIs
│   ├── manifest.json      # Chrome Extension manifest
│   └── orval.config.js    # API client generation
└── docs/                  # Documentation
```

## Quick Setup (All Tiers)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd website-blocker

# Install all dependencies
npm install                     # Root workspace
npm install --prefix server    # Backend dependencies
npm install --prefix client    # Dashboard dependencies
npm install --prefix extension # Extension dependencies
```

### 2. Environment Configuration

```bash
# Server environment
cp server/.env.example server/.env

# Edit server/.env
DATABASE_URL="postgresql://username:password@localhost:5432/website_blocker_dev"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
CORS_ORIGINS="http://localhost:3001,chrome-extension://*"

# Client environment
cp client/.env.example client/.env

# Edit client/.env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_APP_ENV="development"

# Extension environment
cp extension/.env.example extension/.env

# Edit extension/.env
VITE_API_URL="http://localhost:3000"
VITE_APP_ENV="development"
```

### 3. Database Setup

```bash
# Start PostgreSQL with Docker
cd server
docker-compose up -d

# Run database migrations
npx prisma migrate dev --name init
npx prisma generate

# Optional: Seed test data
npx prisma db seed
```

## Development Workflow

### Terminal 1: Backend Server
```bash
cd server
npm run start:dev          # NestJS with hot reload
# Server available at http://localhost:3000
# Swagger UI at http://localhost:3000/api
```

### Terminal 2: Admin Dashboard
```bash
cd client
npm run dev                # Next.js development server
# Dashboard available at http://localhost:3001
```

### Terminal 3: Extension Development
```bash
cd extension
npm run dev                # Vite development build
# Watch mode for extension code changes
```

### Terminal 4: Extension Loading
```bash
# Build extension for Chrome
cd extension
npm run build:dev

# Load extension in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select extension/dist directory
```

## API Client Generation

The project uses Orval to generate type-safe API clients from the OpenAPI specification.

### Generate Clients
```bash
# From project root
npm run api:generate       # Generate from server's Swagger
npm run clients:generate   # Generate clients for all tiers

# Individual tier generation
cd client && npm run api:generate
cd extension && npm run api:generate
```

### Auto-regeneration in Development
```bash
# Watch for API changes and regenerate clients
npm run dev:api            # Watches swagger.json for changes
```

## Feature Development Workflow

### 1. Backend Feature (Server)
```bash
cd server

# Generate feature module
nest g module features/user-management
nest g controller features/user-management
nest g service features/user-management

# Update database schema
# Edit prisma/schema.prisma
npx prisma migrate dev --name add_user_management
npx prisma generate
```

### 2. Dashboard Feature (Client)
```bash
cd client

# Create feature structure
mkdir -p src/features/user-management/{api,components,hooks,types}

# Generate API client
npm run api:generate

# Create feature components
# Edit src/features/user-management/components/UserList.tsx
# Edit src/features/user-management/hooks/useUsers.ts
```

### 3. Extension Feature
```bash
cd extension

# Create feature structure
mkdir -p src/features/blocking-rules/{components,hooks,types,storage}

# Generate API client
npm run api:generate

# Create extension components
# Edit src/features/blocking-rules/components/RulesList.tsx
# Edit src/features/blocking-rules/storage/rulesStorage.ts
```

## Testing

### Backend Tests
```bash
cd server
npm run test               # Unit tests
npm run test:e2e           # End-to-end tests
npm run test:cov           # Coverage report
```

### Frontend Tests
```bash
cd client
npm run test               # React Testing Library + Jest
npm run test:coverage      # Coverage report

cd extension
npm run test               # Extension-specific tests
```

### Extension E2E Testing
```bash
cd extension
npm run test:e2e           # Puppeteer extension tests
```

## Building for Production

### 1. Build All Tiers
```bash
# From project root
npm run build:all
# Or individually:
npm run build:server
npm run build:client
npm run build:extension
```

### 2. Production Deployment
```bash
# Server deployment
cd server
docker build -t website-blocker-api .
docker run -p 3000:3000 website-blocker-api

# Client deployment
cd client
npm run build
npm run start              # Production Next.js server

# Extension packaging
cd extension
npm run build:prod         # Production build
npm run package            # Creates .zip for Chrome Web Store
```

## Chrome Extension Development

### Manifest V3 Specifics
```javascript
// Extension uses declarative Net Request API
// Background script: src/app/background/service-worker.ts
// Popup: src/pages/popup/popup.tsx
// Options: src/pages/options/options.tsx
```

### Testing Extension Features
```bash
# Load development extension
1. npm run build:dev
2. Open chrome://extensions/
3. Load extension/dist directory

# Test blocking functionality
1. Add websites to blocklist via popup
2. Navigate to blocked sites
3. Verify blocking behavior
4. Check analytics in dashboard
```

### Extension Debugging
```bash
# View extension logs
1. Open chrome://extensions/
2. Click "service worker" under extension
3. View console logs and errors

# Debug popup/options
1. Right-click extension icon → "Inspect popup"
2. Or visit extension://[id]/options.html
```

## Development Tools

### Database Management
```bash
# Prisma Studio (Database GUI)
cd server
npx prisma studio          # Opens at http://localhost:5555

# Manual database queries
npx prisma db push         # Apply schema changes
npx prisma db reset        # Reset database
```

### API Documentation
- **Swagger UI**: http://localhost:3000/api (auto-generated)
- **Redoc**: http://localhost:3000/redoc (alternative view)
- **JSON Schema**: http://localhost:3000/api-json (raw OpenAPI)

### Chrome Extension Tools
- **Extension DevTools**: chrome://extensions/
- **Service Worker DevTools**: Click "service worker" link
- **Storage Inspector**: Developer Tools → Application → Storage

## Common Development Commands

```bash
# Full development environment
npm run dev:all            # Start all tiers in parallel

# Database operations
npm run db:reset            # Reset database
npm run db:seed             # Seed test data
npm run db:studio           # Open Prisma Studio

# Code quality
npm run lint                # ESLint all projects
npm run format              # Prettier formatting
npm run type-check          # TypeScript compilation

# API operations
npm run api:generate        # Generate OpenAPI spec
npm run clients:generate    # Generate API clients
npm run api:docs            # Open Swagger UI
```

## Troubleshooting

### Common Issues

**Port conflicts**:
```bash
# Check port usage
lsof -i :3000              # Backend
lsof -i :3001              # Frontend
lsof -i :5432              # PostgreSQL

# Kill processes if needed
pkill -f "node.*3000"
```

**Database connection**:
```bash
# Verify PostgreSQL
docker-compose ps          # Check container status
docker-compose logs db     # View database logs

# Reset database
npm run db:reset
```

**Extension loading**:
```bash
# Verify build output
ls -la extension/dist/     # Check build artifacts
npm run build:dev          # Rebuild if necessary

# Check manifest
cat extension/dist/manifest.json
```

## Next Steps

1. **Feature Development**: Start with user authentication (P1)
2. **API Integration**: Test client/extension API communication
3. **Chrome Store**: Prepare extension for publication
4. **Deployment**: Set up production infrastructure
5. **Monitoring**: Add error tracking and analytics

For detailed implementation guides, see the individual feature documentation in `/docs/features/`.