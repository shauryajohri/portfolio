/* ============================================================
   THE VIEW FROM THE BALCONY
   Where each project sits in the scene, as seen in the "view"
   stage. All numbers are % of the viewport (x from the left,
   y from the top). The camera dives toward (x, y) when entering
   a universe; (w, h) is the clickable area around it.
   The right edge (x > 76) is kept clear for the dragon.
   ============================================================ */

export type BuildingShape = 'gate' | 'dome' | 'temple' | 'vault' | 'spire';

export interface Place {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Placeholder building silhouette in the district, until the art stage. */
  shape?: BuildingShape;
}

export const PLACES: Record<string, Place> = {
  aura: { x: 50, y: 20, w: 20, h: 30 },
  smartconnect: { x: 50, y: 54, w: 9, h: 22 },
  wasabikiri2: { x: 6, y: 56, w: 6, h: 16, shape: 'temple' },
  yatra: { x: 16, y: 55, w: 6, h: 18, shape: 'gate' },
  prediction: { x: 27, y: 53, w: 5, h: 22, shape: 'dome' },
  digitaltwin: { x: 37, y: 52, w: 4, h: 24, shape: 'spire' },
  wasabikiri: { x: 63, y: 55, w: 7, h: 18, shape: 'temple' },
  finguard: { x: 73, y: 57, w: 5, h: 14, shape: 'vault' },
};
