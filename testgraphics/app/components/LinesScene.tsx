// components/LinesScene.tsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { type Line, intersectLines2D } from '~/geometry/utils';

interface LinesSceneProps {
  segments: Line[];
  points: THREE.Vector3[];
  sourcePoints: THREE.Vector3[];
}

const LinesScene = React.memo(({ segments, points, sourcePoints }: LinesSceneProps) => {
  // Геометрия для всех линий (одним буфером)
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    segments.forEach((seg) => {
      positions.push(seg.start.x, seg.start.y, seg.start.z);
      positions.push(seg.end.x, seg.end.y, seg.end.z);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [segments]);
  console.log("render LinesScene", sourcePoints.length)

  // Точки пересечений линий (вычисляем только когда меняются segments)
//   const intersectionPoints = useMemo(() => {
//     const pts: THREE.Vector3[] = [];
//     for (let i = 0; i < segments.length; i++) {
//       for (let j = i + 1; j < segments.length; j++) {
//         const result = intersectLines2D(segments[i], segments[j]);
//         if (result.intersects && result.point) {
//           pts.push(result.point);
//         }
//       }
//     }
//     return pts;
//   }, [segments]);

  return (
    <>
      {/* Линии */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="red" />
      </lineSegments>

      {/* Точки пересечений линий (красные) */}
      {/* {intersectionPoints.map((p, idx) => (
        <mesh key={`inter-${idx}`} position={p}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))} */}

      {/* Дополнительные точки (синие) */}
      {/* {points.map((p, idx) => (
        <mesh key={`point-${idx}`} position={p}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
      ))} */}
      {sourcePoints.map((p, idx) => (
        <mesh key={`point-${idx}`} position={p}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
      

    </>
  );
});

LinesScene.displayName = 'LinesScene';
export default LinesScene;