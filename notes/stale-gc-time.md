### React Query: Stale Data, Stale Time, and Garbage Collection (GC) Time

#### **1\. Stale Data**

- **Definition**: Data that is considered "expired" and potentially outdated. It remains in the cache but is marked for revalidation (refetching).

- **Analogy**: Like stale bread in your pantry. It's still edible (usable), but you'd prefer fresh bread (updated data).

- **Behavior**:

  - Stale data is **not deleted** from the cache.

  - Triggers automatic background refetches under certain conditions (e.g., window refocus, component remount).

  - Example:

```jsx
// Data becomes stale immediately (default staleTime: 0)
useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
```

#### **2\. Stale Time**

- **Definition**: How long data stays "fresh" before becoming stale. After this time, React Query marks data for revalidation.

- **Default**: `0 milliseconds` (data is stale immediately after fetching).

- **Why Default to 0?**: Prioritizes up-to-date data by always refetching unless configured otherwise.

- **Example**:

```jsx
// Data stays fresh for 2 seconds, then becomes stale
useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  staleTime: 2000, // 2 seconds
});
```

- **Triggers for Refetching**:

  - Component remounting.

  - Window refocus.

  - Network reconnection.

  - Manual refetch (e.g., `queryClient.refetchQueries()`).

---

#### **3\. Garbage Collection (GC) Time**

- **Definition**: How long **unused** data stays in the cache before being permanently removed.

- **Default**: `5 minutes`.

- **Key Points**:

  - GC timer starts when no components are actively using the data.

  - Data in use (e.g., displayed in a mounted component) is **not garbage-collected**.

  - Example:

```jsx
// Data stays in cache for 10 minutes after last use
const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 600_000 } }, // 10 minutes
});
```

### **Stale Time vs. GC Time**

| **Aspect**        | **Stale Time**                     | **GC Time**                            |
| ----------------- | ---------------------------------- | -------------------------------------- |
| **Purpose**       | Determines when to refetch data.   | Determines when to delete unused data. |
| **Default Value** | `0 ms` (immediate revalidation).   | `5 minutes`.                           |
| **Data State**    | Data is "fresh" → becomes "stale". | Data is "cached" → becomes "deleted".  |
| **Triggers**      | Refetch on triggers if stale.      | Delete data after inactivity.          |

---

### **Real-World Scenarios**

1.  **Social Media Feed**:

    - Set `staleTime: 30_000` (30 seconds).

    - Feed data stays fresh for 30s; refetches when user returns to the app.

    - GC time: `300_000` (5 minutes). If the user closes the feed, data remains cached for quick access if reopened within 5 minutes.

2.  **Dashboard with Real-Time Metrics**:

    - `staleTime: 0` (always refetch).

    - `gcTime: 1_800_000` (30 minutes). Data persists for quick reloads but refreshes often.

---

### **Key Takeaways**

- **Stale Time** controls **when to check for updates**.

- **GC Time** controls **how long to keep unused data**.

- **Why This Matters**:

  - Use `staleTime > 0` to reduce network calls (e.g., for static data).

  - Use `gcTime` to balance memory usage and user experience (e.g., keep data cached for quick navigation).

- **React Query's Defaults**: Optimized for freshness (staleTime: 0) but cache data for 5 minutes (gcTime) to avoid unnecessary loading states.

```jsx
// Example Configuration for a Weather App:
useQuery({
  queryKey: ["weather", "london"],
  queryFn: fetchWeather,
  staleTime: 60_000, // 1 minute (data updates every minute)
  gcTime: 300_000, // 5 minutes (keep cached for 5 mins after last use)
});
```
