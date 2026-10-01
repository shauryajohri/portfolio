/* ============================================================
   THE VIEW FROM THE BALCONY
   Where each project sits in the scene, in % of the viewport
   (x from the left, y from the top) as seen in the "view" stage.
   The camera dives toward this point when entering a universe;
   Phase B turns these into hover/click hotspots.
   ============================================================ */

export interface Place {
  x: number;
  y: number;
  /** Which scene layer the place belongs to. */
  layer: 'sky' | 'far' | 'near';
}

export const PLACES: Record<string, Place> = {
  aura: { x: 50, y: 20, layer: 'sky' },
  smartconnect: { x: 50, y: 52, layer: 'near' },
  yatra: { x: 22, y: 56, layer: 'far' },
  prediction: { x: 33, y: 50, layer: 'far' },
  wasabikiri: { x: 70, y: 55, layer: 'far' },
  finguard: { x: 81, y: 58, layer: 'far' },
  // planned — unlit on the horizon, not enterable yet
  digitaltwin: { x: 90, y: 48, layer: 'far' },
  wasabikiri2: { x: 10, y: 50, layer: 'far' },
};

