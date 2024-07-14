import { describe, it, expect } from 'vitest';
import * as CardModule from './Loader';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Loader as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
