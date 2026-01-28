import { vi } from 'vitest';

// Mock Supabase Client
vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => ({
      from: () => ({ select: vi.fn() }),
      auth: { signIn: vi.fn(), signOut: vi.fn() },
      storage: { from: () => ({ upload: vi.fn() }) },
    }),
  };
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Assign mock globally
globalThis.IntersectionObserver = IntersectionObserverMock;

