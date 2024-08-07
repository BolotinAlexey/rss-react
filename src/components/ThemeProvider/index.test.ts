import { describe, it, expect } from 'vitest';
import * as OriginalModule from './ThemeProvider';
import * as ReExportedModule from './index';

describe('index.ts re-exports', () => {
  it('should re-export ThemeContext correctly', () => {
    expect(ReExportedModule.ThemeContext).toBe(OriginalModule.ThemeContext);
  });

  it('should re-export ThemeUpdateContext correctly', () => {
    expect(ReExportedModule.ThemeUpdateContext).toBe(
      OriginalModule.ThemeUpdateContext
    );
  });

  it('should re-export ThemeProvider correctly', () => {
    expect(ReExportedModule.ThemeProvider).toBe(OriginalModule.ThemeProvider);
  });
});
