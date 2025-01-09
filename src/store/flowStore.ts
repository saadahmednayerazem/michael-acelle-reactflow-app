import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { RFState } from '../types/flow';
import { saveWorkflow, loadWorkflow } from '../utils/storage';

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 250, y: 0 },
    data: { label: 'Automation Flow Start', type: 'start' },
    deletable: false,
  },
];

// Load saved state or use initial state
const savedState = loadWorkflow();
const initialState = savedState || { nodes: initialNodes, edges: [] };

// Ensure start node is not deletable even if loaded from storage
const processedNodes = initialState.nodes.map(node => 
  node.id === 'start' ? { ...node, deletable: false } : node
);

export const useStore = create<RFState>((set, get) => ({
  nodes: processedNodes,
  edges: initialState.edges,
  selectedNode: null,
  showTriggerSelector: false,
  showEmailSetup: false,
  setSelectedNode: (node) => set({ selectedNode: node }),
  setShowTriggerSelector: (show) => set({ showTriggerSelector: show }),
  setShowEmailSetup: (show) => set({ showEmailSetup: show }),
  setNodes: (nodes) => {
    // Ensure start node is always present
    const hasStartNode = nodes.some(node => node.id === 'start');
    if (!hasStartNode) {
      nodes = [...nodes, initialNodes[0]];
    }
    set({ nodes });
    saveWorkflow({ nodes, edges: get().edges });
  },
  setEdges: (edges) => {
    set({ edges });
    saveWorkflow({ nodes: get().nodes, edges });
  },
  onNodesChange: (changes: NodeChange[]) => {
    // Filter out any attempts to delete the start node
    const filteredChanges = changes.filter(change => 
      !(change.type === 'remove' && change.id === 'start')
    );
    const nodes = applyNodeChanges(filteredChanges, get().nodes);
    set({ nodes });
    saveWorkflow({ nodes, edges: get().edges });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    const edges = applyEdgeChanges(changes, get().edges);
    set({ edges });
    saveWorkflow({ nodes: get().nodes, edges });
  },
  onConnect: (connection: Connection) => {
    const edges = addEdge(connection, get().edges);
    set({ edges });
    saveWorkflow({ nodes: get().nodes, edges });
  },
}));