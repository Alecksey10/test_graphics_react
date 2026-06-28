// app/routes/home.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import LinesScene from '~/components/LinesScene';
import { generateRandomLines, generateRandomPoints } from '~/geometry/generators';
import { TreeTypeOne } from '~/TreeTypeOne/TreeTypeOne';
import SettingsWidget, { generationSettingsConfig, type GenerationSettingsTree } from '~/TreeTypeOne/ComponentGUI';
import { useGetSceneParams } from '~/TreeTypeOne/GlobalParams';
import { HeightMap } from '~/TreeTypeOne/HeightMap';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { PresetSelector } from '~/TreeTypeOne/PresetSelector';
import { type Preset, defaultPreset } from '~/TreeTypeOne/Configs';

// export interface GenerationSettings {
//   pointsCount: number;
//   lineLength: number;
//   lineLengthVariation: number;
//   maxAttempts: number;
//   minDistance: number;
//   decayFactor: number;
// }

// interface SettingsWidgetProps {
//   settings: GenerationSettings;
//   onSettingsChange: (newSettings: Partial<GenerationSettings>) => void;
// }

// const SettingsWidget: React.FC<SettingsWidgetProps> = ({ settings, onSettingsChange }) => {
//   const handleChange = (key: keyof GenerationSettings, value: number) => {
//     onSettingsChange({ [key]: value });
//   };

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         bottom: '20px',
//         right: '20px',
//         background: 'rgba(20, 20, 30, 0.85)',
//         color: '#eee',
//         padding: '16px 18px',
//         borderRadius: '12px',
//         border: '1px solid #444',
//         backdropFilter: 'blur(4px)',
//         zIndex: 20,
//         minWidth: '220px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '6px',
//         fontSize: '13px',
//         fontFamily: 'monospace',
//         pointerEvents: 'auto',
//         userSelect: 'none',
//       }}
//     >
//       <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#8af' }}>⚙️ Настройки</div>

//       <div>
//         <label>Точек: {settings.pointsCount}</label>
//         <input
//           type="range"
//           min="1"
//           max="100"
//           value={settings.pointsCount}
//           onChange={(e) => handleChange('pointsCount', Number(e.target.value))}
//           style={{ width: '100%', background: '#333' }}
//         />
//       </div>

//       <div>
//         <label>Длина: {settings.lineLength.toFixed(2)}</label>
//         <input
//           type="range"
//           min="0.2"
//           max="3.0"
//           step="0.05"
//           value={settings.lineLength}
//           onChange={(e) => handleChange('lineLength', Number(e.target.value))}
//           style={{ width: '100%' }}
//         />
//       </div>

//       <div>
//         <label>Разброс длины: {(settings.lineLengthVariation * 100).toFixed(0)}%</label>
//         <input
//           type="range"
//           min="0"
//           max="0.8"
//           step="0.05"
//           value={settings.lineLengthVariation}
//           onChange={(e) => handleChange('lineLengthVariation', Number(e.target.value))}
//           style={{ width: '100%' }}
//         />
//       </div>

//       <div>
//         <label>Попыток: {settings.maxAttempts}</label>
//         <input
//           type="range"
//           min="1"
//           max="80"
//           value={settings.maxAttempts}
//           onChange={(e) => handleChange('maxAttempts', Number(e.target.value))}
//           style={{ width: '100%' }}
//         />
//       </div>

//       <div>
//         <label>Мин. расстояние: {settings.minDistance.toFixed(2)}</label>
//         <input
//           type="range"
//           min="0.05"
//           max="2.0"
//           step="0.05"
//           value={settings.minDistance}
//           onChange={(e) => handleChange('minDistance', Number(e.target.value))}
//           style={{ width: '100%' }}
//         />
//       </div>

//       <div>
//         <label>Затухание длины: {(settings.decayFactor * 100).toFixed(0)}%</label>
//         <input
//           type="range"
//           min="0.5"
//           max="1.0"
//           step="0.01"
//           value={settings.decayFactor}
//           onChange={(e) => handleChange('decayFactor', Number(e.target.value))}
//           style={{ width: '100%' }}
//         />
//       </div>
//     </div>
//   );
// };
// let func1 = (x: number, y: number) => { return Math.min(1, Math.max(0.1, Math.sin(x) * Math.cos(y) + 0.5)) };

export default function Home() {
    // Состояние данных
    let sceneContext = useGetSceneParams();
    sceneContext.height = 100;
    sceneContext.width = 100;

    const handleSelectPreset = (preset: Preset) => {
        setCurrentPreset(preset);
        // Здесь вы можете применить настройки и функцию к вашему генератору
        console.log('Выбран пресет:', preset.name);
        // setSettings(currentPreset.settings);
        handleRegenerate()
        setSettings(preset.settings)
        // Например:
        // applySettings(preset.settings, preset.heightFunc);
    };


    const [segments, setSegments] = useState(() => generateRandomLines(0, -1, 1, -1, 1, 0, 0));
    const [points, setPoints] = useState(() => generateRandomPoints(1, -1, 1, -1, 1, 0, 0));
    const [sourcePoints, setSourcePoints] = useState(points);

    // Настройки генерации (начальные значения)
    // const [settings, setSettings] = React.useState<GenerationSettingsTree>({
    //     pointsCount: 4,
    //     lineLength: 1.0,
    //     lineLengthVariation: 0.3,
    //     maxAttempts: 20,
    //     minDistance: 0.5,
    //     decayFactor: 1,
    //     useHeightFunc: true
    // });

    // Обработчик изменения настроек
    const [currentPreset, setCurrentPreset] = useState<Preset>(defaultPreset);
    let [settings, setSettings] = useState(currentPreset.settings);
    
    const handleSettingsChange = (newSettings: Partial<GenerationSettingsTree>) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
    };

    // Регенерация сцены (линии + точки)
    const handleRegenerate = () => {
        const newSegments = generateRandomLines(0, -1, 1, -1, 1, 0, 0);
        const newPoints = generateRandomPoints(settings.pointsCount, -1, 1, -1, 1, 0, 0);
        setSegments(newSegments);
        setPoints(newPoints);
        setSourcePoints(newPoints);

        console.log('Выбран пресет:', currentPreset.name);
        setSettings(currentPreset.settings)
        
    };

    // Очистка точек (не линий)
    const handleClear = () => {
        setPoints([]);
        setSegments([]);
        setSourcePoints([]);
    };

    
    const handleClearPoints = () => {
        setPoints([]);
        setSourcePoints([]);
    };

    // Добавление новых точек (с заменой sourcePoints)
    const handleAddPoints = () => {
        const newPoints = generateRandomPoints(settings.pointsCount, -1, 1, -1, 1, 0, 0);
        setPoints((prev) => [...prev, ...newPoints]);
        setSourcePoints(newPoints); // заменяем источники для следующего роста
    };

    // Итерация роста (генерируем новые линии из текущих sourcePoints)
    const handleGrow = () => {
        const tree = new TreeTypeOne(segments, sourcePoints, {
            linesPerPoint: settings.pointsCount,
            minDistanceToExisting: settings.minDistance,
            lineLength: settings.lineLength,
            branching: false,
            maxAttemptsPerPoint: settings.maxAttempts,
            cellSize: 0.1,
            growHeightFunction: currentPreset.heightFunc
        });
        const newLines = tree.grow();
        const newPoints = newLines.map((line) => line.end);

        setSegments((prev) => [...prev, ...newLines]);
        setPoints((prev) => [...prev, ...newPoints]);
        setSourcePoints(newPoints); // теперь растем только из новых точек

        // Применяем затухание длины для следующей итерации
        setSettings((prev) => ({
            ...prev,
            lineLength: prev.lineLength * prev.decayFactor,
            minDistance: prev.minDistance * prev.decayFactor,
        }));
    };

    

   
    return (
        // <div>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Панель кнопок управления */}
            {/* <div
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 10,
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    pointerEvents: 'auto',
                }}
            >
                <button onClick={handleRegenerate}>Сгенерировать новые</button>
                <button onClick={handleAddPoints}>Добавить точки</button>
                <button onClick={handleClearPoints}>Очистить точки</button>
                <button onClick={handleGrow}>Проитерировать</button>
            </div> */}

            <Menu menuButton={<MenuButton>Меню</MenuButton>} transition>
                <MenuItem onClick={handleGrow}>Проитерировать</MenuItem>
                <MenuItem onClick={handleClear}>Очистить</MenuItem>
                <MenuItem onClick={handleClearPoints}>Убрать точки</MenuItem>
                <MenuItem onClick={handleRegenerate}>Пересоздать</MenuItem> </Menu>


            <button onClick={handleGrow} style={{ padding: '6px 14px', cursor: 'pointer' }}>
                Итерировать
            </button>

            <PresetSelector
                currentPresetId={currentPreset.id}
                onSelect={handleSelectPreset}
            />

            {/* Виджет настроек */}

            <SettingsWidget
                config={generationSettingsConfig}
                settings={settings}
                onSettingsChange={(partial) => setSettings((prev) => ({ ...prev, ...partial }))}
            />

            {/* 3D-сцена */}
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Grid args={[10, 10]} />
                <OrbitControls />
                <LinesScene segments={segments} points={points} sourcePoints={sourcePoints} />
                {settings.useHeightFunc ? <HeightMap
                    resWidth={1}//{100}
                    resHeight={1}//{100}
                    width={sceneContext.width}
                    height={sceneContext.height}
                    position={[0, 0, 0]}   // чуть ниже, чтобы не перекрывать линии
                    rotation={[0, 0, 0]} // лежит горизонтально
                    func={currentPreset.heightFunc}
                    resolution={1024}
                /> : null}
            </Canvas>
        </div>
    );
}