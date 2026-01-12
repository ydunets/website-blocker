# Research: Website Blocker Extension

**Feature**: Website Blocker Extension  
**Created**: 2026-01-12  
**Phase**: 0 - Outline & Research

## Research Summary

All technical decisions resolved through constitutional guidelines and reference architecture analysis. No critical unknowns requiring external research identified.

## Chrome Extension Manifest V3 Implementation

**Decision**: Use declarative Net Request API for website blocking  
**Rationale**: Manifest V3 deprecates webRequest API. declarativeNetRequest provides better performance and privacy by processing rules in browser engine rather than extension code.  
**Alternatives considered**: 
- webRequest API (deprecated in Manifest V3)
- Content script injection (performance impact)

**Implementation Pattern**:
```javascript
// Background script
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: oldRuleIds,
  addRules: newBlockingRules
});
```

## Cross-Device Synchronization Strategy

**Decision**: JWT-based authentication with real-time API sync  
**Rationale**: Provides secure cross-device consistency while maintaining offline capability for blocking rules.  
**Alternatives considered**:
- Chrome Extension sync storage (limited capacity)
- Firebase real-time sync (vendor lock-in)

**Sync Pattern**:
- Local extension storage for blocking rules (offline capability)
- Background sync on extension startup and periodic intervals
- Conflict resolution: server wins for organization policies

## FSD Architecture for Extension Development

**Decision**: Apply FSD principles to extension with browser API abstractions  
**Rationale**: Maintains consistency with client architecture while respecting Chrome Extension constraints.  
**Alternatives considered**:
- Flat structure (maintainability issues)
- Feature folders without FSD layers (cross-cutting concerns)

**Extension-Specific FSD Adaptation**:
```
src/
├── app/           # Extension manifest, service worker
├── pages/         # Popup pages, options page
├── features/      # Blocking management, settings
├── entities/      # User, blocklist, schedule
└── shared/        # Browser APIs, storage, UI kit
```

## Analytics Data Modeling

**Decision**: Time-series data with configurable retention and user controls  
**Rationale**: Balances insight value with privacy concerns per specification clarification.  
**Alternatives considered**:
- Indefinite storage (privacy concerns)
- Real-time only (limited insights)

**Data Schema**:
- Analytics events: timestamp, site, action (blocked/attempted)
- Aggregated insights: daily summaries, trends
- User controls: extend retention, delete data, export

## Technology Integration Patterns

**Decision**: Orval for API client generation across all frontend tiers  
**Rationale**: Ensures type safety and contract consistency between extension and dashboard.  
**Alternatives considered**:
- Manual API clients (maintenance overhead)
- Separate codegen per tier (duplication)

**Integration Flow**:
1. NestJS + Swagger generates OpenAPI spec
2. Orval generates TypeScript clients for client/ and extension/
3. Shared types ensure consistency across all tiers

## Security and Permission Model

**Decision**: Minimal permissions with explicit user consent  
**Rationale**: Chrome Web Store compliance and user trust requirements.  
**Alternatives considered**:
- Broad permissions (user privacy concerns)
- Dynamic permissions (UX complexity)

**Permission Strategy**:
```json
{
  "permissions": ["storage", "alarms", "declarativeNetRequest"],
  "host_permissions": ["<all_urls>"],
  "optional_permissions": []
}
```

## Development Workflow Integration

**Decision**: Shared schema.yaml with tier-specific Orval configurations  
**Rationale**: Single source of truth for API contracts while supporting tier-specific client needs.  
**Alternatives considered**:
- Separate API schemas (consistency issues)
- Runtime schema sharing (build complexity)

**Schema Sharing**:
```bash
# Development workflow
npm run api:generate  # Server generates OpenAPI schema
npm run clients:generate  # Orval generates client/extension API clients
```