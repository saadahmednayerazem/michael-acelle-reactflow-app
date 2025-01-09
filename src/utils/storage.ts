import { Node, Edge } from 'reactflow';

const STORAGE_KEY = 'workflow-state';

export interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
}

export const saveWorkflow = (state: WorkflowState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving workflow:', error);
  }
};

export const loadWorkflow = (): WorkflowState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading workflow:', error);
    return null;
  }
};