import { vi } from 'vitest';

const mockOn = vi.fn();
const mockOff = vi.fn();

vi.mock('next/router', () => ({
  Router: {
    events: {
      on: mockOn,
      off: mockOff,
    },
  },
}));

export { mockOn, mockOff };
