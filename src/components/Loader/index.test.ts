import { describe, it, expect } from 'vitest';
import * as Module from './Loader';
import ReExportedModule from './index';

describe('index.ts re-export', () => {
  it('should re-export Loader as default', () => {
    expect(ReExportedModule).toBe(Module.default);
  });
});
