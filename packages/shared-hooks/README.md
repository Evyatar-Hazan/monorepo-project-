# @monorepo/shared-hooks

Shared React hooks for common patterns across the monorepo. Provides a collection of custom hooks for data fetching, authentication, pagination, and more.

## Features

- 🪝 **React Hooks** - Collection of reusable custom hooks
- 🔒 **Type-Safe** - Full TypeScript support
- 📡 **Data Fetching** - useApi hook for HTTP requests
- 🔐 **Authentication** - useAuth hook for auth state management
- 📄 **Pagination** - usePagination hook for list pagination
- 💾 **Storage** - useLocalStorage hook for client-side persistence
- ⏱️ **Debouncing** - useDebounce hook for debounced values

## Installation

```bash
pnpm add @monorepo/shared-hooks
```

## Usage

### useApi - Fetch Data from API

```typescript
import { useApi } from '@monorepo/shared-hooks';
import { createHttpClient } from '@monorepo/shared-api-client';

const apiClient = createHttpClient({ baseUrl: 'http://api.example.com' });

function UserList() {
  const { data: users, loading, error, refetch } = useApi<User[]>(
    apiClient,
    '/users',
    {
      autoFetch: true,
      onSuccess: (data) => console.log('Users loaded:', data),
      onError: (error) => console.error('Error:', error),
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### useAuth - Manage Authentication State

```typescript
import { useAuth } from '@monorepo/shared-hooks';
import { User, AuthToken } from '@monorepo/shared-types';

function LoginForm() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    // Call login API
    const response = await apiClient.post<{ user: User; token: AuthToken }>('/login', {
      email,
      password,
    });

    if (response.success && response.data) {
      login(response.data.user, response.data.token);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>Login</button>
      )}
    </div>
  );
}
```

### usePagination - Manage Pagination State

```typescript
import { usePagination } from '@monorepo/shared-hooks';

function PaginatedList() {
  const pagination = usePagination(10); // 10 items per page
  const { data: items } = useApi<Item[]>(apiClient, `/items?page=${pagination.page}&limit=${pagination.pageSize}`);

  // Set total items when data loads
  React.useEffect(() => {
    if (items) {
      pagination.setTotal(items.length);
    }
  }, [items]);

  return (
    <div>
      {items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      <div className="pagination">
        <button disabled={!pagination.hasPrevPage} onClick={pagination.prevPage}>
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button disabled={!pagination.hasNextPage} onClick={pagination.nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### useLocalStorage - Persist Data in Browser

```typescript
import { useLocalStorage } from '@monorepo/shared-hooks';

function ThemeSelector() {
  const { value: theme, setValue: setTheme } = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### useDebounce - Debounce Values

```typescript
import { useDebounce } from '@monorepo/shared-hooks';

function SearchUsers() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Only fetch when debounced value changes
  const { data: results } = useApi<User[]>(apiClient, `/search?q=${debouncedSearchTerm}`);

  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..." />
      <ul>
        {results?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Hook Reference

### useApi

Hook for fetching data from an API endpoint.

```typescript
const { data, loading, error, refetch } = useApi<T>(
  apiClient: HttpClient,
  path: string,
  options?: {
    autoFetch?: boolean;      // Auto-fetch on mount (default: true)
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  }
);
```

**Return:**
- `data`: The fetched data (null if not loaded)
- `loading`: Loading state
- `error`: Error message (null if no error)
- `refetch`: Function to manually refetch data

### useAuth

Hook for managing authentication state with localStorage persistence.

```typescript
const { user, isAuthenticated, token, login, logout, updateUser } = useAuth();
```

**Return:**
- `user`: Authenticated user object (null if not logged in)
- `isAuthenticated`: Boolean indicating if user is authenticated
- `token`: Auth token object (null if not logged in)
- `login(user, token)`: Set auth state
- `logout()`: Clear auth state
- `updateUser(updates)`: Partially update user object

### usePagination

Hook for managing pagination state.

```typescript
const pagination = usePagination(pageSize?: number);
```

**Return:**
- `page`: Current page number
- `pageSize`: Items per page
- `total`: Total items
- `totalPages`: Total number of pages
- `hasNextPage`: Boolean
- `hasPrevPage`: Boolean
- `setPage(page)`: Set current page
- `setPageSize(size)`: Set page size
- `setTotal(total)`: Set total items
- `nextPage()`: Go to next page
- `prevPage()`: Go to previous page
- `reset()`: Reset to initial state

### useLocalStorage

Hook for persisting data in localStorage with cross-tab synchronization.

```typescript
const { value, setValue, removeValue } = useLocalStorage<T>(key: string, defaultValue?: T);
```

**Return:**
- `value`: Stored value or default
- `setValue(value)`: Store or update value
- `removeValue()`: Remove stored value

### useDebounce

Hook for debouncing values with a delay.

```typescript
const debouncedValue = useDebounce<T>(value: T, delay?: number);
```

**Return:**
- Debounced value

## Building

```bash
pnpm build
```

## Type Checking

```bash
pnpm type-check
```

## Integration with Frontend Apps

All frontend applications should use these hooks for common patterns:

```typescript
import { useApi, useAuth, usePagination } from '@monorepo/shared-hooks';
import { createHttpClient } from '@monorepo/shared-api-client';

// Initialize API client
const apiClient = createHttpClient({
  baseUrl: process.env.REACT_APP_API_URL,
});

// Use hooks in components
function App() {
  const { user, isAuthenticated } = useAuth();
  const { data: items } = useApi(apiClient, '/items');
  const pagination = usePagination(10);
  // ...
}
```
