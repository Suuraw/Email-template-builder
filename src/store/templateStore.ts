import { create } from 'zustand';
import type { EmailBlock, Template, ViewMode } from '../types';
const queryPara=localStorage.getItem("queryPara");
interface TemplateState {
  templates: Template[];
  currentTemplate: Template | null;
  selectedBlockId: string | null;
  viewMode: ViewMode;
  originalTemplate: Template | null; // Added to track original state
  addTemplate: (template: Template) => void;
  updateTemplate: (template: Template) => void;
  setCurrentTemplate: (template: Template) => void;
  addBlock: (block: EmailBlock) => void;
  updateBlock: (blockId: string, updates: Partial<EmailBlock>) => void;
  removeBlock: (blockId: string) => void;
  reorderBlocks: (blocks: EmailBlock[]) => void;
  setSelectedBlockId: (blockId: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  discardChanges: () => void;
  saveTemplate: () => Promise<void>;
}
const API=`https://email-template-builder-backend-gc5d.onrender.com/api/save/${queryPara}`;
export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  currentTemplate: null,
  selectedBlockId: null,
  viewMode: 'desktop',
  originalTemplate: null,
  addTemplate: (template) =>
    set((state) => ({ 
      templates: [...state.templates, template],
      originalTemplate: template, // Store original state
    })),
  updateTemplate: (template) =>
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === template.id ? template : t
      ),
      currentTemplate:
        state.currentTemplate?.id === template.id
          ? template
          : state.currentTemplate,
    })),
  setCurrentTemplate: (template) => set({ 
    currentTemplate: template,
    originalTemplate: JSON.parse(JSON.stringify(template)), // Deep copy for original state
  }),
  addBlock: (block) =>
    set((state) => {
      if (!state.currentTemplate) return state;
      const updatedTemplate = {
        ...state.currentTemplate,
        blocks: [...state.currentTemplate.blocks, block],
        updatedAt: new Date(),
      };
      return {
        currentTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    }),
  updateBlock: (blockId, updates) =>
    set((state) => {
      if (!state.currentTemplate) return state;
      const updatedTemplate = {
        ...state.currentTemplate,
        blocks: state.currentTemplate.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block
        ),
        updatedAt: new Date(),
      };
      return {
        currentTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    }),
  removeBlock: (blockId) =>
    set((state) => {
      if (!state.currentTemplate) return state;
      const updatedTemplate = {
        ...state.currentTemplate,
        blocks: state.currentTemplate.blocks.filter(
          (block) => block.id !== blockId
        ),
        updatedAt: new Date(),
      };
      return {
        currentTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
        selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
      };
    }),
  reorderBlocks: (blocks) =>
    set((state) => {
      if (!state.currentTemplate) return state;
      const updatedTemplate = {
        ...state.currentTemplate,
        blocks,
        updatedAt: new Date(),
      };
      return {
        currentTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    }),
  setSelectedBlockId: (blockId) => set({ selectedBlockId: blockId }),
  setViewMode: (mode) => set({ viewMode: mode }),
  discardChanges: () => {
    const { originalTemplate } = get();
    if (originalTemplate) {
      set({ 
        currentTemplate: JSON.parse(JSON.stringify(originalTemplate)),
        selectedBlockId: null
      });
    }
  },
  saveTemplate: async () => {
    const { currentTemplate } = get();
    if (!currentTemplate) return;

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({currentTemplate}),
      });
       console.log("hello try block")
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to save template');
      }

      const savedTemplate = await response.json();
      console.log(savedTemplate);
      
      set({ 
        originalTemplate: savedTemplate.data,
        currentTemplate: savedTemplate.data
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    } catch (error) {
      console.error('Error saving template:', error);
      throw error;
    }
  },
}));