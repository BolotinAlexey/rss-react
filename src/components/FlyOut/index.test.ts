import { describe, it, expect } from 'vitest';
import * as Module from './FlyOut';
import ReExportedComponent from './index';

describe('index.ts re-export', () => {
  it('should re-export FlyOut as default', () => {
    expect(ReExportedComponent).toBe(Module.default);
  });
});
