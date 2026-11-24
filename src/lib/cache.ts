/**
 * High-performance Cache Manager for SanadTube
 * Features: In-memory L1 cache + LocalStorage L2 cache with TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

// In-Memory L1 Cache (ultra-fast 0ms access)
const memoryCache = new Map<string, CacheEntry<any>>();

export const cache = {
  get<T>(key: string): T | null {
    const now = Date.now();

    // 1. Check L1 memory cache first
    if (memoryCache.has(key)) {
      const entry = memoryCache.get(key)!;
      if (entry.expiry > now) {
        return entry.data as T;
      }
      memoryCache.delete(key);
    }

    // 2. Check L2 LocalStorage cache
    if (typeof window === 'undefined') return null;

    try {
      const raw = localStorage.getItem(`st_cache_${key}`);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      if (entry.expiry > now) {
        // Promote to L1 memory cache
        memoryCache.set(key, entry);
        return entry.data;
      }

      // Expired: delete
      localStorage.removeItem(`st_cache_${key}`);
    } catch (e) {
      console.warn(`Cache read error for ${key}:`, e);
    }

    return null;
  },

  set<T>(key: string, data: T, ttlMinutes = 60): void {
    const expiry = Date.now() + ttlMinutes * 60 * 1000;
    const entry: CacheEntry<T> = { data, expiry };

    // Set L1 Memory
    memoryCache.set(key, entry);

    // Set L2 LocalStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`st_cache_${key}`, JSON.stringify(entry));
      } catch (e) {
        console.warn(`Cache write error for ${key}:`, e);
      }
    }
  },

  remove(key: string): void {
    memoryCache.delete(key);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`st_cache_${key}`);
      } catch (e) {
        // ignore
      }
    }
  },

  clear(): void {
    memoryCache.clear();
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('st_cache_')) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        // ignore
      }
    }
  },
};
