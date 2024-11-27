/**
 * This file contains all the types that are used in the application.
 */
export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  reminder: boolean;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface ToolbarProps {
  view: 'list' | 'kanban';
  setView: (view: 'list' | 'kanban') => void;
}