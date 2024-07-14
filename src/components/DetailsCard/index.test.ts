import { describe, it, expect } from 'vitest';
import * as CardModule from './DetailsCard';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Card as default', () => {
    expect(ReExportedCard).toBe(CardModule.default);
  });
});
