import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url), 'utf8');
const readBin = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url));

const homeHeroSource = read('../../src/components/HomeHero.tsx');
const entryNavRailSource = read('../../src/components/EntryNavRail.tsx');
const entryShellSource = read('../../src/components/EntryShell.tsx');
const primitivesCss = read('../../src/styles/primitives.css');

// The Kinected Design brand glyph is the real Kinected Solutions mark (a head
// profile fused with a neural mesh + orbital ring, in a blue→violet gradient),
// shipped as a raster PNG and rendered through the shared `.od-brand-glyph`
// primitive. The earlier *invented* monoline node mark (path "M7 23L15 17L25 8")
// was a placeholder and must not survive anywhere in the active brand chrome.
const RETIRED_INVENTED_GLYPH = 'M7 23L15 17L25 8';
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

describe('Home logo assets', () => {
  it('ships the real Kinected brand mark and app icon as PNGs', () => {
    const mark = readBin('../../public/brand-mark.png');
    const icon = readBin('../../public/app-icon.png');

    expect(mark.subarray(0, 4).equals(PNG_MAGIC)).toBe(true);
    expect(icon.subarray(0, 4).equals(PNG_MAGIC)).toBe(true);
    expect(mark.byteLength).toBeGreaterThan(2000);
    expect(icon.byteLength).toBeGreaterThan(2000);
  });

  it('wires the shared brand glyph to the real mark asset', () => {
    expect(primitivesCss).toContain('.od-brand-glyph');
    expect(primitivesCss).toContain('url(/brand-mark.png)');
    expect(primitivesCss).not.toContain(RETIRED_INVENTED_GLYPH);
  });

  it('renders the brand glyph on the Home and onboarding entry surfaces', () => {
    for (const source of [homeHeroSource, entryNavRailSource, entryShellSource]) {
      expect(source).toContain('od-brand-glyph');
      expect(source).not.toContain(RETIRED_INVENTED_GLYPH);
    }
  });
});
