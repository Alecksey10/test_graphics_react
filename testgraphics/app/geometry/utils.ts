// geometry.ts
import * as THREE from 'three';

// Тип для отрезка
export type Line = {
  start: THREE.Vector3;
  end: THREE.Vector3;
};

// 1. Длина отрезка
export function segmentLength(seg: Line): number {
  return seg.start.distanceTo(seg.end);
}

// 2. Точка на отрезке по параметру t (0..1)
export function pointOnLine(seg: Line, t: number): THREE.Vector3 {
  const v = new THREE.Vector3().copy(seg.end).sub(seg.start);
  return new THREE.Vector3().copy(seg.start).add(v.multiplyScalar(t));
}

// 3. Ближайшая точка на отрезке к произвольной точке
// Возвращает { point: Vector3, t: number } – t показывает близость к началу (0) или концу (1)
export function closestPointOnLine(
  point: THREE.Vector3,
  seg: Line
): { point: THREE.Vector3; t: number } {
  const start = seg.start;
  const end = seg.end;
  const v = new THREE.Vector3().copy(end).sub(start);
  const w = new THREE.Vector3().copy(point).sub(start);
  const proj = w.dot(v) / v.lengthSq();
  const t = Math.max(0, Math.min(1, proj));
  const pointOnSeg = new THREE.Vector3().copy(start).add(v.multiplyScalar(t));
  return { point: pointOnSeg, t };
}

// 4. Расстояние от точки до отрезка
export function distancePointToLine(point: THREE.Vector3, seg: Line): number {
  const { point: closest } = closestPointOnLine(point, seg);
  return point.distanceTo(closest);
}

// 5. Проверка пересечения двух отрезков в 2D (игнорируем Z)
// Возвращает объект с флагом intersects, точкой пересечения и параметрами t1, t2
export function intersectLines2D(
  seg1: Line,
  seg2: Line
): { intersects: boolean; point?: THREE.Vector3; t1?: number; t2?: number } {
  const p1 = seg1.start;
  const p2 = seg1.end;
  const p3 = seg2.start;
  const p4 = seg2.end;

  const d1 = new THREE.Vector3().copy(p2).sub(p1);
  const d2 = new THREE.Vector3().copy(p4).sub(p3);

  const denom = d1.x * d2.y - d1.y * d2.x;
  if (Math.abs(denom) < 1e-10) {
    return { intersects: false }; // параллельны или совпадают (обрабатываем как false)
  }

  const diff = new THREE.Vector3().copy(p3).sub(p1);
  const t1 = (diff.x * d2.y - diff.y * d2.x) / denom;
  const t2 = (diff.x * d1.y - diff.y * d1.x) / denom;

  if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
    const point = new THREE.Vector3().copy(p1).add(d1.clone().multiplyScalar(t1));
    return { intersects: true, point, t1, t2 };
  }
  return { intersects: false };
}

// 6. Ближайшие точки между двумя отрезками в 3D (для определения "пересечения" в пространстве)
// Возвращает точки на каждом отрезке, параметры t1, t2 и минимальное расстояние
export function closestPointsBetweenLines(
  seg1: Line,
  seg2: Line
): {
  point1: THREE.Vector3;
  point2: THREE.Vector3;
  t1: number;
  t2: number;
  distance: number;
} {
  const p1 = seg1.start;
  const p2 = seg1.end;
  const p3 = seg2.start;
  const p4 = seg2.end;

  const d1 = new THREE.Vector3().copy(p2).sub(p1);
  const d2 = new THREE.Vector3().copy(p4).sub(p3);
  const r = new THREE.Vector3().copy(p3).sub(p1);

  const a = d1.dot(d1);
  const b = d1.dot(d2);
  const c = d2.dot(d2);
  const d = d1.dot(r);
  const e = d2.dot(r);
  const det = a * c - b * b;

  let t1 = 0;
  let t2 = 0;

  if (det < 1e-10) {
    // отрезки параллельны
    t1 = 0;
    t2 = e / c;
  } else {
    t1 = (b * e - c * d) / det;
    t2 = (a * e - b * d) / det;
  }

  // Ограничиваем параметры в пределах [0,1]
  t1 = Math.max(0, Math.min(1, t1));
  t2 = Math.max(0, Math.min(1, t2));

  const point1 = new THREE.Vector3().copy(p1).add(d1.clone().multiplyScalar(t1));
  const point2 = new THREE.Vector3().copy(p3).add(d2.clone().multiplyScalar(t2));
  const distance = point1.distanceTo(point2);

  return { point1, point2, t1, t2, distance };
}