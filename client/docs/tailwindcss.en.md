# Tailwind CSS

A utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup without writing custom CSS.

## Core Concepts

### 1. Utility-First Approach
**What it means:** Style elements using pre-defined utility classes instead of writing custom CSS.

```tsx
// Traditional CSS approach
<div className="card">
  <h2 className="card-title">Title</h2>
</div>

// Tailwind utility-first approach
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
</div>
```

**Benefits:**
- No context switching between HTML and CSS files
- No inventing class names
- CSS bundle size doesn't grow with features
- Safe to delete components (styles are colocated)

**Deep dive:** Instead of semantic class names that abstract styles, you compose designs using atomic utility classes. This keeps styling decisions visible in markup and eliminates "zombie CSS" (unused styles in your codebase).

### 2. Responsive Design
**What it means:** Apply different styles at different breakpoints using responsive prefixes.

**Breakpoint system:**
- `sm:` - ≥640px (mobile landscape)
- `md:` - ≥768px (tablet)
- `lg:` - ≥1024px (desktop)
- `xl:` - ≥1280px (large desktop)
- `2xl:` - ≥1536px (extra large)

```tsx
<div className="
  w-full           // Mobile: 100% width
  md:w-1/2         // Tablet: 50% width
  lg:w-1/3         // Desktop: 33% width
  p-4              // All: padding 1rem
  md:p-6           // Tablet+: padding 1.5rem
">
  Responsive content
</div>
```

**Benefits:**
- Mobile-first by default
- Clear breakpoint visibility in markup
- No media query management
- Easy to modify per-breakpoint styles

**Deep dive:** Tailwind uses a mobile-first approach - unprefixed utilities apply to all screen sizes, while prefixed ones override at larger breakpoints. This encourages progressive enhancement and keeps responsive logic visible.

### 3. State Variants
**What it means:** Apply styles conditionally based on element state using pseudo-class prefixes.

**Common variants:**
```tsx
// Hover state
<button className="bg-blue-500 hover:bg-blue-700">
  Hover me
</button>

// Focus state
<input className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

// Active state
<button className="scale-100 active:scale-95">
  Click me
</button>

// Disabled state
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
  Submit
</button>

// Group hover (parent hover affects child)
<div className="group">
  <div className="opacity-0 group-hover:opacity-100">
    Appears on parent hover
  </div>
</div>

// Peer state (sibling state affects element)
<input className="peer" type="checkbox" />
<label className="peer-checked:text-blue-500">
  Label changes when checkbox checked
</label>
```

**Benefits:**
- No JavaScript needed for simple interactions
- Clear state behavior in markup
- Consistent interaction patterns
- Type-safe with TypeScript

**Deep dive:** State variants use CSS pseudo-classes under the hood but provide a cleaner syntax. The `group` and `peer` utilities enable parent-child and sibling interactions without JavaScript, covering most UI interaction needs.

### 4. Design System Through Configuration
**What it means:** Customize your design tokens (colors, spacing, fonts) in `tailwind.config.js`.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#FF6B6B',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

**Usage:**
```tsx
<div className="bg-primary-500 text-brand p-72 rounded-4xl font-sans">
  Custom themed content
</div>
```

**Benefits:**
- Centralized design system
- Consistent design tokens across app
- Easy theme changes
- Type-safe with Tailwind IntelliSense

**Deep dive:** The configuration creates a single source of truth for your design system. Using `extend` preserves Tailwind defaults while adding custom values. This ensures design consistency and makes rebranding trivial.

### 5. Component Extraction
**What it means:** Extract repeated utility combinations into reusable components when needed.

**When to extract:**
- Pattern repeats 3+ times
- Complex utility combinations
- Semantic meaning needed

```tsx
// Before: Repeated utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
  Button 1
</button>
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
  Button 2
</button>

// After: Extracted component
const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    {children}
  </button>
);

<Button>Button 1</Button>
<Button>Button 2</Button>

// Alternative: Using @apply in CSS (use sparingly)
// styles.css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition;
}
```

**Benefits:**
- DRY principle when appropriate
- Maintains component-based architecture
- Easy to modify all instances
- Can add props for variants

**Deep dive:** Resist premature extraction - duplicate utilities are often fine. Extract when you have genuine reuse or need props/logic. React/Vue components are preferred over `@apply` as they're more flexible and keep styles in JavaScript.

## Advanced Features

### 6. Dark Mode
**What it means:** Apply different styles in dark mode using the `dark:` prefix.

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  // ...
};
```

**Usage:**
```tsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
">
  Adapts to dark mode
</div>

// Toggle dark mode (with class strategy)
<html className={isDark ? 'dark' : ''}>
```

**Benefits:**
- Built-in dark mode support
- No duplicate stylesheets
- Class or system preference strategies
- Consistent across components

### 7. Arbitrary Values
**What it means:** Use custom values when design tokens don't fit using bracket notation.

```tsx
<div className="
  w-[347px]              // Exact width
  bg-[#1da1f2]           // Custom color
  top-[117px]            // Exact position
  grid-cols-[1fr_500px_2fr]  // Custom grid
  before:content-['★']   // Custom content
">
  Custom values
</div>
```

**Benefits:**
- Escape hatch for one-off values
- No config changes needed
- Maintains utility syntax
- Still gets PurgeCSS benefits

**Deep dive:** Arbitrary values are useful for one-off cases, but frequent use suggests missing design tokens. Add commonly used values to config instead for consistency.

### 8. Animation & Transitions
**What it means:** Built-in utilities for animations and smooth transitions.

```tsx
// Transitions
<button className="
  transition                    // All properties
  transition-colors             // Only colors
  duration-300                  // 300ms duration
  ease-in-out                   // Easing function
  hover:scale-110               // Transform on hover
">
  Animated button
</button>

// Built-in animations
<div className="animate-spin">Loading...</div>
<div className="animate-pulse">Skeleton</div>
<div className="animate-bounce">Notification</div>

// Custom animations in config
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
  },
}

// Usage
<div className="animate-wiggle">Wiggling</div>
```

### 9. Grid & Flexbox
**What it means:** Comprehensive utilities for modern CSS layouts.

```tsx
// Flexbox
<div className="
  flex                    // display: flex
  flex-col               // flex-direction: column
  items-center           // align-items: center
  justify-between        // justify-content: space-between
  gap-4                  // gap: 1rem
">
  {/* Flex items */}
</div>

// Grid
<div className="
  grid                   // display: grid
  grid-cols-1            // 1 column mobile
  md:grid-cols-2         // 2 columns tablet
  lg:grid-cols-3         // 3 columns desktop
  gap-6                  // gap between items
  auto-rows-fr           // equal row heights
">
  {/* Grid items */}
</div>

// Subgrid (modern browsers)
<div className="grid grid-cols-3">
  <div className="col-span-3 grid grid-cols-subgrid">
    {/* Inherits parent grid */}
  </div>
</div>
```

### 10. Container Queries
**What it means:** Style elements based on container size, not viewport.

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require('@tailwindcss/container-queries')],
};
```

```tsx
<div className="@container">
  <div className="
    @sm:text-lg        // When container ≥ 24rem
    @md:grid-cols-2    // When container ≥ 28rem
    @lg:grid-cols-3    // When container ≥ 32rem
  ">
    Responds to container, not viewport
  </div>
</div>
```

## Best Practices

### 1. Use Consistent Spacing Scale
Stick to Tailwind's spacing scale (0, 1, 2, 4, 6, 8...) for visual consistency:
```tsx
// Good
<div className="p-4 mb-6 gap-8">

// Avoid arbitrary unless necessary
<div className="p-[17px] mb-[25px]">
```

### 2. Organize Classes Logically
```tsx
// Recommended order:
<div className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 mb-6
  // Sizing
  w-full h-32
  // Typography
  text-lg font-bold
  // Visual
  bg-blue-500 rounded-lg shadow
  // Interactive
  hover:bg-blue-700 transition
">
```

### 3. Use JIT Mode (Just-In-Time)
Enabled by default in Tailwind v3+:
- Generates styles on-demand
- All variants available without configuration
- Smaller development builds
- Instant build times

### 4. Leverage IntelliSense
Install Tailwind CSS IntelliSense extension for:
- Autocomplete suggestions
- CSS preview on hover
- Linting for class names
- Syntax highlighting

### 5. Configure PurgeCSS Properly
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  // This ensures unused styles are removed in production
};
```

### 6. Use Tailwind Merge for Conditional Classes
```tsx
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Utility function
const cn = (...inputs: any[]) => twMerge(clsx(inputs));

// Usage - handles conflicting classes properly
<div className={cn(
  'p-4 bg-blue-500',
  isError && 'bg-red-500',  // bg-red-500 overrides bg-blue-500
  className
)} />
```

## Common Patterns

### Gradient Backgrounds
```tsx
<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Gradient background
</div>
```

### Glass Morphism
```tsx
<div className="
  bg-white/10
  backdrop-blur-lg
  border border-white/20
  rounded-xl
  shadow-xl
">
  Glass effect
</div>
```

### Card Component
```tsx
<div className="
  bg-white dark:bg-gray-800
  rounded-lg
  shadow-md hover:shadow-xl
  transition-shadow
  p-6
  border border-gray-200 dark:border-gray-700
">
  Card content
</div>
```

### Loading Skeleton
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded"></div>
  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
</div>
```

### Aspect Ratio
```tsx
<div className="aspect-video bg-gray-200">
  16:9 aspect ratio
</div>

<div className="aspect-square bg-gray-200">
  1:1 aspect ratio
</div>
```

### Truncate Text
```tsx
// Single line
<p className="truncate">
  Very long text that will be truncated with ellipsis...
</p>

// Multiple lines
<p className="line-clamp-3">
  Long text that will be clamped to 3 lines with ellipsis at the end...
</p>
```

## Performance Tips

1. **Keep production builds small:** Use proper PurgeCSS configuration
2. **Avoid dynamic class names:** Don't construct classes with string concatenation
   ```tsx
   // Bad - classes won't be detected
   <div className={`text-${color}-500`}>

   // Good - use full class names
   <div className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}>
   ```
3. **Use safelist for dynamic classes:**
   ```javascript
   // tailwind.config.js
   module.exports = {
     safelist: ['text-blue-500', 'text-red-500'],
   };
   ```
4. **Enable JIT mode:** Faster builds and all variants available
5. **Use CDN only for prototyping:** Always build for production
