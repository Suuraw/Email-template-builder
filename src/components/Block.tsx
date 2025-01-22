import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { EmailBlock } from '../types';
import { useTemplateStore } from '../store/templateStore';

interface BlockProps {
  block: EmailBlock;
}

export function Block({ block }: BlockProps) {
  const { updateBlock, selectedBlockId, setSelectedBlockId } = useTemplateStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...block.styles,
  };

  const handleContentChange = (content: string) => {
    updateBlock(block.id, { content });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBlockId(block.id);
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentChange(e.currentTarget.textContent || '')}
            style={style}
          >
            {block.content}
          </div>
        );
      case 'image':
        return (
          <div className="relative">
            {block.content ? (
              <img src={block.content} alt="" style={style} />
            ) : (
              <div className="bg-gray-100 p-4 text-center">
                Click to add image URL
              </div>
            )}
          </div>
        );
      case 'button':
        return (
          <button
            style={style}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentChange(e.currentTarget.textContent || '')}
          >
            {block.content}
          </button>
        );
      case 'spacer':
        return <div className="h-8" />;
      case 'divider':
        return <hr className="my-4" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`group relative my-2 ${selectedBlockId === block.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      onClick={handleClick}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 cursor-move" {...attributes} {...listeners}>
        <GripVertical size={20} className="text-gray-400" />
      </div>
      {renderContent()}
    </div>
  );
}