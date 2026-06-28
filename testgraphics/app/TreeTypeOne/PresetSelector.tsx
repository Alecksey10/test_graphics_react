// PresetSelector.tsx
import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { type Preset, presets } from './Configs';

interface PresetSelectorProps {
  currentPresetId?: string; // ID текущего выбранного пресета
  onSelect: (preset: Preset) => void;
}

export function PresetSelector({ currentPresetId, onSelect }: PresetSelectorProps) {
  // Находим текущий пресет для отображения названия на кнопке
  const currentPreset = presets.find((p) => p.id === currentPresetId) || presets[0];

  return (
    <Menu
      menuButton={
        <MenuButton style={{ padding: '6px 14px', cursor: 'pointer' }}>
          📋 {currentPreset.name}
        </MenuButton>
      }
      transition
    >
      {presets.map((preset) => (
        <MenuItem
          key={preset.id}
          onClick={() => onSelect(preset)}
          // можно подсветить активный пресет
          style={
            preset.id === currentPresetId
              ? { backgroundColor: '#2a2a3a', fontWeight: 'bold' }
              : undefined
          }
        >
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{preset.name}</span>
            {preset.description && (
              <span style={{ fontSize: '0.75em', opacity: 0.7 }}>
                {preset.description}
              </span>
            )}
          </span>
        </MenuItem>
      ))}
    </Menu>
  );
}