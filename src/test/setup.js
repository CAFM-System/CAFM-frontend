
// Mock IntersectionObserver for Vitest + JSDOM
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Assign the mock to the global environment
globalThis.IntersectionObserver = IntersectionObserverMock;
