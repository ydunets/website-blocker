# FSD Rules (Feature-Sliced Design)

## Core Principles

### 1. Layer Hierarchy
- **Cannot import from lower layers to upper layers**
- Layer order (top to bottom): `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- Higher layers can only import from lower layers

### 2. Slice Isolation
- **Slices cannot import from each other**
- Slices at the same layer level must remain independent
- Cross-slice communication should go through lower layers

### 3. Public API
- **Each slice has an entry point** (`index.ts`)
- All imports from a slice must go through its public API
- Internal implementation details are hidden

### 4. Segment Standardization
- Standard segments: `ui`, `model`, `api`, `lib`, `config`, `consts`
- Consistent structure across all slices

## Additional Rules

### 5. Low Coupling, High Cohesion
- Keep modules loosely coupled
- Group related functionality together

### 6. Business Logic Isolation
- Business logic belongs in `entities`, `features`, or `processes`
- UI components should be as dumb as possible

### 7. Shared Layer Philosophy
- `shared` contains reusable code with no business logic
- Should be project-agnostic when possible
