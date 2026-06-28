// AI
// TreeTypeOne/TreeTypeOne.ts
import * as THREE from 'three';
import { intersectLines2D, closestPointsBetweenLines } from '~/geometry/utils';
import { SpatialHash } from '~/geometry/SpatialHash';
import { type Line } from '~/geometry/utils';

interface TreeOptions {
  linesPerPoint?: number;
  minDistanceToExisting?: number;
  lineLength?: number;
  angleSpread?: number;
  branching?: boolean;
  maxAttemptsPerPoint?: number;
  cellSize?: number;
  growHeightFunction?: (x:number, y:number)=>number;
}

export class TreeTypeOne {
  private lines: Line[];
  private sourcePoints: THREE.Vector3[];
  private options: Required<TreeOptions>;

  constructor(lines: Line[], sourcePoints: THREE.Vector3[], options: TreeOptions = {}) {
    this.lines = lines;
    this.sourcePoints = sourcePoints;
    this.options = {
      linesPerPoint: 2,
      minDistanceToExisting: 0.5,
      lineLength: 1.5,
      angleSpread: Math.PI * 2,
      branching: false,
      maxAttemptsPerPoint: 30,
      growHeightFunction:null,
      cellSize: 1.0,
      ...options,
    };
  }

  grow(): Line[] {
    const newLines: Line[] = [];
    const pointsQueue: THREE.Vector3[] = this.sourcePoints.map(p => p.clone());
    const EPSILON = 1e-6;

    // Создаём хеш и добавляем все существующие линии и все точки
    const hash = new SpatialHash(this.options.cellSize);
    this.lines.forEach(line => hash.insertSegment(line));
    // Добавляем все старты и концы существующих линий как точки
    this.lines.forEach(line => {
      hash.insertPoint(line.start);
      hash.insertPoint(line.end);
    });
    // Добавляем исходные точки (на случай, если они не являются частями линий)
    this.sourcePoints.forEach(p => hash.insertPoint(p));

    while (pointsQueue.length > 0) {
      const point = pointsQueue.shift()!;
      let linesGenerated = 0;
      let attempts = 0;

      while (linesGenerated < this.options.linesPerPoint && attempts < this.options.maxAttemptsPerPoint) {
        attempts++;

        const angle = Math.random() * this.options.angleSpread;
        const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
        let end:THREE.Vector3;
        let step = dir.multiplyScalar(this.options.lineLength)
        //Растём в зависимости от текущего поля
          if (this.options.growHeightFunction != null) {
              let func_val = this.options.growHeightFunction(point.x, point.y);
              
              step.x *= func_val;
              step.y *= func_val;
            //   console.log(func_val, step)
          }
        end = point.clone().add(step);
        const candidate: Line = { start: point.clone(), end };


        // 1. Получаем потенциальных соседей-отрезков через хеш
        const neighborSegments = hash.querySegments(candidate);

        // 2. Проверка пересечений (игнорируем пересечения в стартовой точке)
        let intersects = false;
        for (const existing of neighborSegments) {
          const result = intersectLines2D(existing, candidate);
          if (result.intersects && result.point) {
            const isStartPoint = point.distanceTo(result.point) < EPSILON;
            if (!isStartPoint) {
              intersects = true;
              break;
            }
          }
        }
        if (intersects) continue;

        // 3. Проверка минимального расстояния до существующих отрезков (строгая)
        let tooClose = false;
        for (const existing of neighborSegments) {
          const closest = closestPointsBetweenLines(existing, candidate);
          const dist = closest.point1.distanceTo(closest.point2);
          if (dist < this.options.minDistanceToExisting) {
            // Разрешаем близость ТОЛЬКО если это общий старт
            const isCommonStart =
              candidate.start.distanceTo(existing.start) < EPSILON &&
              (closest.point1.distanceTo(candidate.start) < EPSILON ||
               closest.point2.distanceTo(existing.start) < EPSILON);
            if (!isCommonStart) {
              tooClose = true;
              break;
            }
          }
        }
        if (tooClose) continue;

        // 4. Проверка расстояния от конечной точки до всех существующих точек (через хеш)
        const neighborPoints = hash.queryPoints(candidate);
        let tooCloseToPoint = false;
        for (const p of neighborPoints) {
          // Игнорируем стартовую точку кандидата (она уже есть в хеше, но мы разрешаем близость к ней)
          if (candidate.start.distanceTo(p) < EPSILON) continue;
          if (candidate.end.distanceTo(p) < this.options.minDistanceToExisting) {
            tooCloseToPoint = true;
            break;
          }
        }
        if (tooCloseToPoint) continue;

        // Линия подходит – добавляем
        newLines.push(candidate);
        // Добавляем в хеш новый отрезок и его конечную точку (старт уже есть)
        hash.insertSegment(candidate);
        hash.insertPoint(candidate.end);
        // Стартовая точка уже есть в хеше, но если её не было (маловероятно), можно добавить:
        hash.insertPoint(candidate.start);
        linesGenerated++;

        if (this.options.branching) {
          pointsQueue.push(candidate.end.clone());
        }
      }
    }

    return newLines;
  }
}

/**
 * Вычисляет минимальное расстояние между двумя отрезками в 3D.
 * Использует функцию closestPointsBetweenLines из предыдущего ответа.
 */
function distanceBetweenLines(seg1: Line, seg2: Line): number {
    const result = closestPointsBetweenLines(seg1, seg2);
    return result.distance;
}