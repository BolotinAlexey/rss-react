import { describe, it, expect } from 'vitest';
import * as CardModule from './ErrorPage';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export ErrorPage as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
