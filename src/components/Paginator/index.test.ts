import { describe, it, expect } from 'vitest';
import * as CardModule from './Paginator';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Paginator as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
