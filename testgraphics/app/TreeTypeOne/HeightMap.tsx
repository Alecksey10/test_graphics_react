// AI
// pages/HeightMapPage.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { type SceneParams, useGetSceneParams } from './GlobalParams';
import React, { useMemo } from 'react';

interface HeightMapProps {
    /** Ширина плоскости в мировых единицах */
    resWidth?: number;
    /** Высота плоскости в мировых единицах */
    resHeight?: number;
    /** Ширина плоскости в мировых единицах */
    width?: number;
    /** Высота плоскости в мировых единицах */
    height?: number;
  /** Разрешение текстуры (ширина и высота) */
  resolution?: number;
  /** Функция, принимающая (x, y) в диапазоне [-1..1] и возвращающая число [0..1] */
  func?: (x: number, y: number) => number;
  /** Позиция в сцене */
  position?: [number, number, number];
  /** Поворот (в радианах) */
  rotation?: [number, number, number];
}

// Функция по умолчанию – для примера
const defaultFunc = (x: number, y: number) =>
  Math.sin(x * 30) * Math.cos(y * 30) * 0.5 + 0.5;

export const HeightMap: React.FC<HeightMapProps> = ({
    resWidth = 10,
    resHeight = 10,
    width = 4,
    height = 4,
    resolution = 1024,
    func = defaultFunc,
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0], // по умолчанию лежит на полу (горизонтально)
}) => {
  // Генерируем текстуру один раз при изменении функции или разрешения
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(resolution, resolution);
    const data = imageData.data;

    for (let py = 0; py < resolution; py++) {
      for (let px = 0; px < resolution; px++) {
        const u = px / resolution;        // 0..1
        const v = py / resolution;        // 0..1
        // Преобразуем в диапазон [-1, 1] для аргументов функции
        const x = (u-0.5) * width;
        const y = (v-0.5) * height;
        const value = func(x, y); // ожидается [0,1]
        const idx = (py * resolution + px) * 4;
        const byte = Math.min(255, Math.max(0, Math.round(value * 255)));
        data[idx] = byte;
        data[idx + 1] = byte;
        data[idx + 2] = byte;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, [func, resolution]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};