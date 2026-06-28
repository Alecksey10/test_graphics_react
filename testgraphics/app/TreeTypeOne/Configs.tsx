import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import LinesScene from '~/components/LinesScene';
import { generateRandomLines, generateRandomPoints } from '~/geometry/generators';
import { TreeTypeOne } from '~/TreeTypeOne/TreeTypeOne';
import { useGetSceneParams } from '~/TreeTypeOne/GlobalParams';
import { HeightMap } from '~/TreeTypeOne/HeightMap';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import {type GenerationSettingsTree} from './ComponentGUI'

// Тип для функции высоты
export type HeightFunc = (x: number, y: number) => number;

// Структура пресета
export interface Preset {
  id: string;
  name: string;
  description?: string;
  settings: GenerationSettingsTree;
  heightFunc?: HeightFunc; // опционально, если не задана – будет использоваться стандартная
}

// ----- БАЗОВЫЙ ПРЕСЕТ (ваш) -----
const baseSettings: GenerationSettingsTree = {
  pointsCount: 4,
  lineLength: 1.0,
  lineLengthVariation: 0.3,
  maxAttempts: 20,
  minDistance: 0.95,
  decayFactor: 1,
  useHeightFunc: true,
};

const func1: HeightFunc = (x, y) => {
  return Math.min(1, Math.max(0.1, Math.sin(x) * Math.cos(y) + 0.5));
};


const foreverAwaySettings: GenerationSettingsTree = {
  pointsCount: 10,
  lineLength: 1.0,
  lineLengthVariation: 0,
  maxAttempts: 20,
  minDistance: 0.8,
  decayFactor: 0.5,
  useHeightFunc: false,
};


// ----- ДРУГИЕ ПРЕСЕТЫ (примеры) -----

// Пресет "Густой лес" – много точек, короткие линии
const denseForestSettings: GenerationSettingsTree = {
  pointsCount: 12,
  lineLength: 0.6,
  lineLengthVariation: 0.1,
  maxAttempts: 50,
  minDistance: 0.2,
  decayFactor: 0.9,
  useHeightFunc: true,
};
const denseForestFunc: HeightFunc = (x, y) => {
  // высота зависит от расстояния до центра
  const r = Math.sqrt(x * x + y * y);
  return Math.min(1, Math.max(0.2, 1 - r * 0.3));
};

// Пресет "Высокие пальмы" – длинные стволы, малый разброс
const palmSettings: GenerationSettingsTree = {
  pointsCount: 3,
  lineLength: 2.5,
  lineLengthVariation: 0.05,
  maxAttempts: 15,
  minDistance: 1.2,
  decayFactor: 0.95,
  useHeightFunc: true,
};
const palmFunc: HeightFunc = (x, y) => {
  return 0.8 + 0.2 * Math.sin(x * 2) * Math.cos(y * 2);
};

// Пресет "Хаотичный" – много попыток, большой разброс
const chaoticSettings: GenerationSettingsTree = {
  pointsCount: 7,
  lineLength: 1.8,
  lineLengthVariation: 0.7,
  maxAttempts: 80,
  minDistance: 0.1,
  decayFactor: 0.5,
  useHeightFunc: false, // отключаем функцию высоты
};

// Пресет "Равномерный" – без функции высоты, равномерное распределение
const uniformSettings: GenerationSettingsTree = {
  pointsCount: 6,
  lineLength: 1.2,
  lineLengthVariation: 0.2,
  maxAttempts: 30,
  minDistance: 0.4,
  decayFactor: 1,
  useHeightFunc: false,
};

// Экспортируем массив пресетов
export const presets: Preset[] = [
  {
    id: 'base',
    name: 'Базовый (синус-косинус)',
    description: 'Использует функцию sin(x)*cos(y)+0.5',
    settings: baseSettings,
    heightFunc: func1,
  },
  {
    id: 'foreverAway',
    name: 'Уходящий навсегда',
    description: '"Никогда" не дотянется обратно, затухает быстро.',
    settings: foreverAwaySettings,
    heightFunc: undefined,
  },
  {
    id: 'dense-forest',
    name: 'Густой лес',
    description: 'Много коротких веток, высота убывает от центра',
    settings: denseForestSettings,
    heightFunc: denseForestFunc,
  },
  {
    id: 'palms',
    name: 'Высокие пальмы',
    description: 'Длинные стволы, плавная высота',
    settings: palmSettings,
    heightFunc: palmFunc,
  },
  {
    id: 'chaotic',
    name: 'Хаотичный',
    description: 'Большой разброс, много попыток',
    settings: chaoticSettings,
    heightFunc: undefined, // без функции
  },
  {
    id: 'uniform',
    name: 'Равномерный',
    description: 'Без функции высоты, равномерно',
    settings: uniformSettings,
    heightFunc: undefined,
  },
];

// Вспомогательная функция для поиска пресета по ID
export function getPresetById(id: string): Preset | undefined {
  return presets.find((p) => p.id === id);
}

// Получить пресет по умолчанию (базовый)
export const defaultPreset = presets[0];