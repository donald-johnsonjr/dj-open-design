import { describe, expect, it } from 'vitest';
import { readExpandedIndexCss } from '../helpers/read-expanded-css';

const indexCss = readExpandedIndexCss();

function cssBlock(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(indexCss);
  if (!match) throw new Error(`Missing CSS block for ${selector}`);
  return match[1] ?? '';
}

describe('default app background colors', () => {
  it('defines the Kinected light-theme background in :root', () => {
    const root = cssBlock(':root');

    expect(root).toContain('--bg: #fafafc;');
    expect(root).toContain('--bg-app: #fafafc;');
  });

  it('uses the Kinected dark navy background for the dark theme (the default)', () => {
    const dark = cssBlock('[data-theme="dark"]');

    expect(dark).toContain('--bg: #0a0a12;');
    expect(dark).toContain('--bg-app: #0a0a12;');
  });

  it('prefers platform UI fonts over optional local app fonts for body/UI', () => {
    const root = cssBlock(':root');
    const sans = /--sans:\s*([^;]+);/.exec(root)?.[1];

    expect(sans).toBeDefined();
    expect(sans).toContain("'Segoe UI'");
    expect(sans).not.toContain("'Inter'");
    expect(sans).toMatch(/'Segoe UI', 'Microsoft YaHei UI', 'Noto Sans'/);
  });
});
