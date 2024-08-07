import { describe, it, expect } from 'vitest';
import * as Module from './IndexPage';
import ReExportedModule from './index';

describe('index.ts re-export', () => {
  it('should re-export IndexPage as default', () => {
    expect(ReExportedModule).toBe(Module.default);
  });
});
