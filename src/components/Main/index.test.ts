import { describe, it, expect } from 'vitest';
import * as CardModule from './Main';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Main as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
