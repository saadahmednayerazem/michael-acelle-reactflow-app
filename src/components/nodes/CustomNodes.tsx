import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, Clock, Diamond, Settings } from 'lucide-react';

const nodeStyles = {
  email: 'bg-green-500',
  wait: 'bg-blue-500',
  condition: 'bg-yellow-500',
  operation: 'bg-purple-500',
  start: 'bg-gray-500',
};

const NodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'email':
      return <Mail className="w-5 h-5 text-white" />;
    case 'wait':
      return <Clock className="w-5 h-5 text-white" />;
    case 'condition':
      return <Diamond className="w-5 h-5 text-white" />;
    case 'operation':
      return <Settings className="w-5 h-5 text-white" />;
    default:
      return null;
  }
};

const BaseNode = ({ data, type }: any) => {
  const isStart = type === 'start';
  const isCondition = type === 'condition';

  return (
    <div className="relative">
      {!isStart && (
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
      )}
      <div className={`px-4 py-2 rounded-lg ${nodeStyles[type]} shadow-lg min-w-[150px]`}>
        <div className="flex items-center gap-2">
          <NodeIcon type={type} />
          <span className="text-white font-medium">{data.label}</span>
        </div>
      </div>
      {isCondition ? (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="yes"
            className="w-3 h-3"
            style={{ left: '25%' }}
          >
            <div className="absolute whitespace-nowrap text-xs -bottom-5">Yes</div>
          </Handle>
          <Handle
            type="source"
            position={Position.Bottom}
            id="no"
            className="w-3 h-3"
            style={{ left: '75%' }}
          >
            <div className="absolute whitespace-nowrap text-xs -bottom-5">No</div>
          </Handle>
        </>
      ) : (
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      )}
    </div>
  );
};

export const EmailNode = memo((props: any) => <BaseNode {...props} type="email" />);
export const WaitNode = memo((props: any) => <BaseNode {...props} type="wait" />);
export const ConditionNode = memo((props: any) => <BaseNode {...props} type="condition" />);
export const OperationNode = memo((props: any) => <BaseNode {...props} type="operation" />);
export const StartNode = memo((props: any) => <BaseNode {...props} type="start" />);