export interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'spacer' | 'divider';
  content: string;
  styles?: Record<string, string | number>;
  selected?: boolean;
}

export interface Template {
  id: string;
  name: string;
  blocks: EmailBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export type ViewMode = 'desktop' | 'mobile' | 'tablet';