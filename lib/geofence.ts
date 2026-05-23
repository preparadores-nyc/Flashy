const SANTIAGO_BOUNDS = {
  minLat: -33.75,
  maxLat: -33.2,
  minLng: -70.9,
  maxLng: -70.4
};

export type Point = {
  lat: number;
  lng: number;
};

export function isWithinSantiago(point: Point): boolean {
  return (
    point.lat >= SANTIAGO_BOUNDS.minLat &&
    point.lat <= SANTIAGO_BOUNDS.maxLat &&
    point.lng >= SANTIAGO_BOUNDS.minLng &&
    point.lng <= SANTIAGO_BOUNDS.maxLng
  );
}

export function haversineKm(a: Point, b: Point): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export function estimateFareClpKm(distanceKm: number): number {
  const base = 1800;
  const perKm = 700;
  const fare = base + distanceKm * perKm;
  return Math.max(2500, Math.round(fare));
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}
