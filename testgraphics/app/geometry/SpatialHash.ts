// geometry/SpatialHash.ts
import * as THREE from 'three';
import { type Line } from '~/geometry/utils';

export class SpatialHash {
  private cellSize: number;
  private pointMap: Map<string, THREE.Vector3[]> = new Map();
  private segmentMap: Map<string, Line[]> = new Map();

  constructor(cellSize: number = 1.0) {
    this.cellSize = cellSize;
  }

  private getCellKey(x: number, y: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    return `${cx},${cy}`;
  }

  // --- Для точек ---
  insertPoint(point: THREE.Vector3): void {
    const key = this.getCellKey(point.x, point.y);
    if (!this.pointMap.has(key)) this.pointMap.set(key, []);
    this.pointMap.get(key)!.push(point);
  }

  queryPoints(line: Line): THREE.Vector3[] {
    const minX = Math.min(line.start.x, line.end.x);
    const maxX = Math.max(line.start.x, line.end.x);
    const minY = Math.min(line.start.y, line.end.y);
    const maxY = Math.max(line.start.y, line.end.y);

    const startCX = Math.floor(minX / this.cellSize);
    const endCX = Math.floor(maxX / this.cellSize);
    const startCY = Math.floor(minY / this.cellSize);
    const endCY = Math.floor(maxY / this.cellSize);

    const result: THREE.Vector3[] = [];
    const visited = new Set<THREE.Vector3>();
    for (let cx = startCX; cx <= endCX; cx++) {
      for (let cy = startCY; cy <= endCY; cy++) {
        const key = `${cx},${cy}`;
        const points = this.pointMap.get(key);
        if (points) {
          for (const p of points) {
            if (!visited.has(p)) {
              visited.add(p);
              result.push(p);
            }
          }
        }
      }
    }
    return result;
  }

  // --- Для отрезков ---
  insertSegment(line: Line): void {
    const minX = Math.min(line.start.x, line.end.x);
    const maxX = Math.max(line.start.x, line.end.x);
    const minY = Math.min(line.start.y, line.end.y);
    const maxY = Math.max(line.start.y, line.end.y);

    const startCX = Math.floor(minX / this.cellSize);
    const endCX = Math.floor(maxX / this.cellSize);
    const startCY = Math.floor(minY / this.cellSize);
    const endCY = Math.floor(maxY / this.cellSize);

    for (let cx = startCX; cx <= endCX; cx++) {
      for (let cy = startCY; cy <= endCY; cy++) {
        const key = `${cx},${cy}`;
        if (!this.segmentMap.has(key)) this.segmentMap.set(key, []);
        this.segmentMap.get(key)!.push(line);
      }
    }
  }

  querySegments(line: Line): Line[] {
    const minX = Math.min(line.start.x, line.end.x);
    const maxX = Math.max(line.start.x, line.end.x);
    const minY = Math.min(line.start.y, line.end.y);
    const maxY = Math.max(line.start.y, line.end.y);

    const startCX = Math.floor(minX / this.cellSize);
    const endCX = Math.floor(maxX / this.cellSize);
    const startCY = Math.floor(minY / this.cellSize);
    const endCY = Math.floor(maxY / this.cellSize);

    const result: Line[] = [];
    const visited = new Set<Line>();
    for (let cx = startCX; cx <= endCX; cx++) {
      for (let cy = startCY; cy <= endCY; cy++) {
        const key = `${cx},${cy}`;
        const segments = this.segmentMap.get(key);
        if (segments) {
          for (const seg of segments) {
            if (!visited.has(seg)) {
              visited.add(seg);
              result.push(seg);
            }
          }
        }
      }
    }
    return result;
  }

  clear(): void {
    this.pointMap.clear();
    this.segmentMap.clear();
  }
}