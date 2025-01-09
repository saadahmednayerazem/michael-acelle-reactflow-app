import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../store/flowStore';
import {
  EmailNode,
  WaitNode,
  ConditionNode,
  OperationNode,
  StartNode,
} from './nodes/CustomNodes';

const nodeTypes: NodeTypes = {
  email: EmailNode,
  wait: WaitNode,
  condition: ConditionNode,
  operation: OperationNode,
  start: StartNode,
};

const FlowCanvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setSelectedNode } = useStore();
  const { project, getViewport } = useReactFlow();

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      // Get the current viewport
      const viewport = getViewport();

      // Get the drop position relative to the viewport
      const { left, top } = event.currentTarget.getBoundingClientRect();
      const position = project({
        x: (event.clientX - left) / viewport.zoom,
        y: (event.clientY - top) / viewport.zoom,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `New ${type}`, type },
      };

      setNodes([...nodes, newNode]);
    },
    [nodes, setNodes, project, getViewport]
  );

  return (
    <div className="flex-1 h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[15, 15]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        fitView
      >
        <Background color="#ccc" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export const Flow: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};