import React from 'react';
import { HandIcon as DragHandleDots2Icon, ImageIcon, Type, Square, Minus } from 'lucide-react';
import type { EmailBlock } from '../types';

const blockTypes: { type: EmailBlock['type']; icon: React.ReactNode; label: string }[] = [
  { type: 'text', icon: <Type size={20} />, label: 'Text Block' },
  { type: 'image', icon: <ImageIcon size={20} />, label: 'Image' },
  { type: 'button', icon: <Square size={20} />, label: 'Button' },
  { type: 'spacer', icon: <DragHandleDots2Icon size={20} />, label: 'Spacer' },
  { type: 'divider', icon: <Minus size={20} />, label: 'Divider' },
];

export function Sidebar() {
  const handleDragStart = (e: React.DragEvent, type: EmailBlock['type']) => {
    e.dataTransfer.setData('blockType', type);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        {blockTypes.map(({ type, icon, label }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}