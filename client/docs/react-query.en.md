# React Query (TanStack Query)

A powerful data synchronization library for React applications that manages server state with automatic caching, deduplication, and background updates.

## Core Concepts

### 1. Declarative Data Fetching
**What it means:** Define what data you need, not how to fetch it.

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId)
});
```

**Benefits:**
- No manual state management (loading, error, data)
- Automatic retry logic
- Built-in loading and error states
- Component automatically re-renders when data changes

**Deep dive:** Instead of imperative patterns (useEffect + useState), you declare your data dependencies. React Query handles the entire lifecycle: fetching, caching, error handling, and re-fetching.

### 2. Request Deduplication
**What it means:** Multiple components requesting the same data result in only ONE network request.

```typescript
// Component A
useQuery({ queryKey: ['user', 1], queryFn: fetchUser });

// Component B (rendered simultaneously)
useQuery({ queryKey: ['user', 1], queryFn: fetchUser });
// ✅ Only ONE request is made
```

**Benefits:**
- Eliminates redundant network requests
- Reduces server load
- Improves application performance
- Prevents race conditions

**Deep dive:** React Query uses queryKey as a unique identifier. When multiple components use the same queryKey simultaneously, only the first request is executed. Other components subscribe to the same query result.

### 3. Automatic Caching
**What it means:** Query results are cached and reused across your application.

**Cache lifecycle:**
- **Fresh**: Data is fresh (within `staleTime`)
- **Stale**: Data is stale but still displayed (after `staleTime`)
- **Inactive**: No components are using this query
- **Garbage Collection**: Inactive data is removed (after `gcTime`)

**Configuration:**
```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
  gcTime: 10 * 60 * 1000,   // 10 minutes - cache retention
});
```

**Benefits:**
- Instant UI updates (data from cache)
- Reduced network requests
- Better user experience
- Works offline with cached data

**Deep dive:** When you navigate back to a page, React Query serves cached data instantly (even if stale), then refetches in the background to update it. This provides immediate feedback while ensuring data freshness.

### 4. Manual Cache Management
**What it means:** Programmatically control cache updates and invalidation.

**Invalidation (refetch data):**
```typescript
// Mark queries as stale and refetch
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate multiple related queries
queryClient.invalidateQueries({ queryKey: ['users', userId] });
```

**Direct cache updates:**
```typescript
// Optimistic update
queryClient.setQueryData(['user', userId], (old) => ({
  ...old,
  name: 'New Name'
}));

// After mutation
useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    queryClient.setQueryData(['user', data.id], data);
  }
});
```

**Benefits:**
- Optimistic updates for instant UI feedback
- Granular control over data freshness
- Efficient cache invalidation strategies
- Prevents unnecessary refetches

**Deep dive:** After mutations (POST, PUT, DELETE), you can either invalidate queries to refetch or directly update the cache. Optimistic updates show changes immediately before server confirmation, with automatic rollback on error.

## Additional Features

### 5. Background Refetching
Automatically refetch data when:
- Window regains focus (`refetchOnWindowFocus`)
- Network reconnects (`refetchOnReconnect`)
- Component remounts (`refetchOnMount`)
- Custom intervals (`refetchInterval`)

### 6. Pagination & Infinite Queries
```typescript
// Pagination
useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers(page)
});

// Infinite scroll
useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage
});
```

### 7. Mutations
Handle data modifications with automatic cache updates:
```typescript
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});
```

### 8. Query Dependencies
```typescript
// Dependent query - only runs when userId exists
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId
});

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user?.id
});
```

## Best Practices

1. **Structured Query Keys:** Use arrays with hierarchical structure
   ```typescript
   ['users'] // all users
   ['users', userId] // specific user
   ['users', userId, 'posts'] // user's posts
   ```

2. **Proper staleTime:** Set based on data volatility
   - Real-time data: 0ms
   - Frequent updates: 30s - 1min
   - Static content: 5-10min
   - Rarely changing: Infinity

3. **Use mutations for updates:** Always use `useMutation` for POST/PUT/DELETE operations

4. **Global defaults:** Configure common settings in QueryClient
   ```typescript
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 60 * 1000,
         retry: 1,
       },
     },
   });
   ```

## Common Patterns

### Optimistic Updates
```typescript
useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries(['user', newUser.id]);
    const previous = queryClient.getQueryData(['user', newUser.id]);
    queryClient.setQueryData(['user', newUser.id], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['user', newUser.id], context.previous);
  },
  onSettled: (newUser) => {
    queryClient.invalidateQueries(['user', newUser.id]);
  }
});
```

### Prefetching
```typescript
// Prefetch data before navigation
const prefetchUser = async (userId: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
};
```
