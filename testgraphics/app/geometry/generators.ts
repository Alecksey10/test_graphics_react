// utils/generators.ts
import * as THREE from 'three';

export type Segment = {
  start: THREE.Vector3;
  end: THREE.Vector3;
};

export type Point = THREE.Vector3;

export function generateRandomLines(count: number,minx:number, maxx:number, miny:number, maxy:number, minz:number, maxz:number): Segment[] {
  const lines: Segment[] = [];
  for (let i = 0; i < count; i++) {
    const start = new THREE.Vector3(
      (Math.random()) * (maxx-minx)+minx,
      (Math.random())* (maxy-miny)+miny,
      (Math.random())* (maxx-minz)+minz
    );
    const end = new THREE.Vector3(
      (Math.random()) * (maxx-minx)+minx,
      (Math.random())* (maxy-miny)+miny,
      (Math.random())* (maxx-minz)+minz
    );
    lines.push({ start, end });
  }
  return lines;
}

export function generateRandomPoints(count: number, minx:number, maxx:number, miny:number, maxy:number, minz:number, maxz:number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < count; i++) {
    pts.push(new THREE.Vector3(
      (Math.random()) * (maxx-minx)+minx,
      (Math.random())* (maxy-miny)+miny,
      (Math.random())* (maxz-minz)+minz
    ));
  }
  return pts;
}