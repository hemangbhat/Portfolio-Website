/** Deterministic pseudo-random generator (mulberry32) for stable SSR output. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Build a stable contribution-style grid.
 * Returns `weeks` columns each with `days` intensity levels (0..4).
 */
export function buildHeatmap(weeks: number, days = 7, seed = 7): number[][] {
  const rand = mulberry32(seed);
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = rand();
      // Bias toward lower intensities for a realistic look
      let level = 0;
      if (r > 0.97) level = 4;
      else if (r > 0.88) level = 3;
      else if (r > 0.7) level = 2;
      else if (r > 0.45) level = 1;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}
