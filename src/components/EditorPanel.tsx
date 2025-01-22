import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, X, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useTemplateStore } from '../store/templateStore';
import type { ViewMode } from '../types';

// interface EditorPanelProps{
//   queryPara:string;
// }
const FONT_SIZES = {
  'Xxs': '0.625rem',
  'Xs': '0.75rem',
  'Sm': '0.875rem',
  'Md': '1rem',
  'Lg': '1.125rem',
  'Xl': '1.25rem',
  'Xxl': '1.5rem'
};

const TEXT_COLORS = [
  { label: 'Black', value: '#000000' },
  { label: 'Gray', value: '#666666' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Dark Blue', value: '#2563EB' },
];

export function EditorPanel() {
  const { currentTemplate, selectedBlockId, updateBlock, setSelectedBlockId, viewMode, setViewMode } = useTemplateStore();
  const selectedBlock = currentTemplate?.blocks.find(block => block.id === selectedBlockId);

  const handleStyleChange = (updates: Record<string, string>) => {
    if (selectedBlock) {
      updateBlock(selectedBlock.id, {
        styles: { ...selectedBlock.styles, ...updates }
      });
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <p className="text-gray-500 text-center">Select a block to edit</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Text</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-gray-100 p-1 rounded">
              <button
                className={`p-1 rounded ${viewMode === 'desktop' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleViewModeChange('desktop')}
              >
                <Monitor size={16} />
              </button>
              <button
                className={`p-1 rounded ${viewMode === 'tablet' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleViewModeChange('tablet')}
              >
                <Tablet size={16} />
              </button>
              <button
                className={`p-1 rounded ${viewMode === 'mobile' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleViewModeChange('mobile')}
              >
                <Smartphone size={16} />
              </button>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSelectedBlockId(null)}>
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <textarea
            className="w-full p-2 border rounded text-sm"
            value={selectedBlock?selectedBlock.content:""}
            onChange={(e) => updateBlock(selectedBlock.id, { content: e.target.value })}
            rows={3}
          />

          <div className="space-y-2">
            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded">
              <button
                className={`p-1.5 rounded ${selectedBlock.styles?.fontWeight === 'bold' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleStyleChange({ fontWeight: selectedBlock.styles?.fontWeight === 'bold' ? 'normal' : 'bold' })}
              >
                <Bold size={16} />
              </button>
              <button
                className={`p-1.5 rounded ${selectedBlock.styles?.fontStyle === 'italic' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleStyleChange({ fontStyle: selectedBlock.styles?.fontStyle === 'italic' ? 'normal' : 'italic' })}
              >
                <Italic size={16} />
              </button>
              <button
                className={`p-1.5 rounded ${selectedBlock.styles?.textDecoration === 'underline' ? 'bg-white shadow' : 'hover:bg-white'}`}
                onClick={() => handleStyleChange({ textDecoration: selectedBlock.styles?.textDecoration === 'underline' ? 'none' : 'underline' })}
              >
                <Underline size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Alignment</label>
            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded">
              {[
                { icon: AlignLeft, value: 'left' },
                { icon: AlignCenter, value: 'center' },
                { icon: AlignRight, value: 'right' },
                { icon: AlignJustify, value: 'justify' }
              ].map(({ icon: Icon, value }) => (
                <button
                  key={value}
                  className={`p-1.5 rounded ${selectedBlock.styles?.textAlign === value ? 'bg-white shadow' : 'hover:bg-white'}`}
                  onClick={() => handleStyleChange({ textAlign: value })}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Font</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                className="px-2 py-1.5 border rounded text-sm"
                value={selectedBlock.styles?.fontFamily || ''}
                onChange={(e) => handleStyleChange({ fontFamily: e.target.value })}
              >
                <option value="system-ui">Body font</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Text color</label>
            <div className="flex items-center gap-2">
              {TEXT_COLORS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`w-6 h-6 rounded-full ${selectedBlock.styles?.color === value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: value }}
                  onClick={() => handleStyleChange({ color: value })}
                  title={label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Font size</label>
            <div className="flex items-center gap-1">
              {Object.entries(FONT_SIZES).map(([label, value]) => (
                <button
                  key={label}
                  className={`px-2 py-1 text-xs border rounded ${
                    selectedBlock.styles?.fontSize === value ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleStyleChange({ fontSize: value })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {selectedBlock.type === 'button' && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Button style</label>
              <div className="space-y-2">
                <input
                  type="color"
                  className="w-full"
                  value={selectedBlock.styles?.backgroundColor as string || '#000000'}
                  onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full px-2 py-1.5 border rounded text-sm"
                  value={parseInt((selectedBlock.styles?.borderRadius as string) || '4')}
                  onChange={(e) => handleStyleChange({ borderRadius: `${e.target.value}px` })}
                  placeholder="Border radius (px)"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}