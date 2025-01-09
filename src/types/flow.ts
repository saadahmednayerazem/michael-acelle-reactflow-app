import { Node, Edge } from 'reactflow';

export type NodeData = {
  label: string;
  type: 'start' | 'email' | 'wait' | 'condition' | 'operation';
  triggerType?: string;
  triggerDescription?: string;
};

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  showTriggerSelector: boolean;
  showEmailSetup: boolean;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: Node | null) => void;
  setShowTriggerSelector: (show: boolean) => void;
  setShowEmailSetup: (show: boolean) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
};