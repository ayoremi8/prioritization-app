export interface Task {
  id: string;
  text: string;
  x: number;
  y: number;
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  isDragging?: boolean;
  isEditing?: boolean;
}

export interface Quadrant {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}