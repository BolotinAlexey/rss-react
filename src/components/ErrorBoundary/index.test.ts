import { describe, it, expect } from 'vitest';
import * as CardModule from './ErrorBoundary';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Card as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
