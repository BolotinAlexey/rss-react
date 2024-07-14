import { describe, it, expect } from 'vitest';
import * as DataView from './DataView';
import ReExportedCard from './index';

describe('index.ts re-export', () => {
  it('should re-export Card as default', () => {
    expect(ReExportedCard).toBe(DataView.default);
  });
});
