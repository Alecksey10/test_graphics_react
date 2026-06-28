// AI
import React from 'react';
// import { useNavigate } from 'react-router-dom'; // если нужен роутинг

// --- Исходный интерфейс настроек ---
export interface GenerationSettingsTree {
  pointsCount: number;
  lineLength: number;
  lineLengthVariation: number;
  maxAttempts: number;
  minDistance: number;
  decayFactor: number;
  useHeightFunc: boolean;
}

// --- Типы для конфигурации поля ---
export type GuiType = 'range' | 'checkbox' | 'input' | 'select';

export interface FieldConfig<T> {
  key: keyof T;                // имя поля в объекте настроек
  label: string;               // отображаемое имя
  type: 'number' | 'boolean' | 'string'; // тип значения (для валидации)
  min?: number;                // для числовых полей
  max?: number;
  step?: number;
  guiType: GuiType;            // тип элемента управления
  format?: (value: any) => string; // опциональное форматирование отображаемого значения
  options?: string[];          // для select
}

// --- Конфигурация для GenerationSettings ---
export const generationSettingsConfig: FieldConfig<GenerationSettingsTree>[] = [
  {
    key: 'pointsCount',
    label: 'Точек',
    type: 'number',
    min: 1,
    max: 100,
    step: 1,
    guiType: 'range',
    format: (v) => String(v),
  },
  {
    key: 'lineLength',
    label: 'Длина',
    type: 'number',
    min: 0.2,
    max: 3.0,
    step: 0.05,
    guiType: 'range',
    format: (v) => (v as number).toFixed(2),
  },
  {
    key: 'lineLengthVariation',
    label: 'Разброс длины',
    type: 'number',
    min: 0,
    max: 0.8,
    step: 0.05,
    guiType: 'range',
    format: (v) => `${((v as number) * 100).toFixed(0)}%`,
  },
  {
    key: 'maxAttempts',
    label: 'Попыток',
    type: 'number',
    min: 1,
    max: 80,
    step: 1,
    guiType: 'range',
    format: (v) => String(v),
  },
  {
    key: 'minDistance',
    label: 'Мин. расстояние',
    type: 'number',
    min: 0.05,
    max: 2.0,
    step: 0.01,
    guiType: 'range',
    format: (v) => (v as number).toFixed(2),
  },
  {
    key: 'decayFactor',
    label: 'Затухание длины',
    type: 'number',
    min: 0.5,
    max: 1.0,
    step: 0.01,
    guiType: 'range',
    format: (v) => `${((v as number) * 100).toFixed(0)}%`,
  },
  {
    key: 'useHeightFunc',
    label: 'Использовать функцию высоты',
    type: 'boolean',
    guiType: 'checkbox',
    // format: (v) => `${((v as number) * 100).toFixed(0)}%`,
  },
];

// --- Свойства абстрактного виджета ---
interface SettingsWidgetProps<T> {
  config: FieldConfig<T>[];
  settings: T;
  onSettingsChange: (newSettings: Partial<T>) => void;
}

// --- Абстрактный виджет (дженерик-компонент) ---
function SettingsWidget<T extends Record<string, any>>({
  config,
  settings,
  onSettingsChange,
}: SettingsWidgetProps<T>) {
  const handleChange = (key: keyof T, value: any) => {
    onSettingsChange({ [key]: value } as Partial<T>);
  };

  // Рендеринг элемента управления в зависимости от guiType
  const renderControl = (field: FieldConfig<T>) => {
    const value = settings[field.key];
    const commonStyle = { width: '100%', background: '#333' };

    switch (field.guiType) {
      case 'range':
        return (
          <input
            type="range"
            min={field.min}
            max={field.max}
            step={field.step}
            value={value as number}
            onChange={(e) => handleChange(field.key, Number(e.target.value))}
            style={commonStyle}
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => handleChange(field.key, e.target.checked)}
          />
        );
      case 'input':
        return (
          <input
            type={field.type === 'number' ? 'number' : 'text'}
            value={value as string | number}
            onChange={(e) => {
              const val = field.type === 'number' ? Number(e.target.value) : e.target.value;
              handleChange(field.key, val);
            }}
            style={{ width: '100%' }}
          />
        );
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handleChange(field.key, e.target.value)}
            style={{ width: '100%' }}
          >
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(20, 20, 30, 0.85)',
        color: '#eee',
        padding: '16px 18px',
        borderRadius: '12px',
        border: '1px solid #444',
        backdropFilter: 'blur(4px)',
        zIndex: 20,
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontSize: '13px',
        fontFamily: 'monospace',
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#8af' }}>⚙️ Настройки</div>

      {config.map((field) => {
        const value = settings[field.key];
        const displayValue = field.format ? field.format(value) : String(value);

        return (
          <div key={String(field.key)}>
            <label>
              {field.label}: {displayValue}
            </label>
            {renderControl(field)}
          </div>
        );
      })}
    </div>
  );
}
export default SettingsWidget;