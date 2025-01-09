import React from 'react';
import { Mail, Clock, Diamond, Settings, X } from 'lucide-react';
import { useStore } from '../store/flowStore';
import { EmailSetupModal } from './EmailSetupModal';
import { WaitNodeSettings } from './WaitNodeSettings';
import { ConditionNodeSettings } from './ConditionNodeSettings';
import { OperationNodeSettings } from './OperationNodeSettings';
import { sendMessageToParent } from '../utils/iframeMessaging';

const nodeTypes = [
  { type: 'email', label: 'Send Email', icon: Mail, color: 'bg-green-500' },
  { type: 'wait', label: 'Wait', icon: Clock, color: 'bg-blue-500' },
  { type: 'condition', label: 'Condition', icon: Diamond, color: 'bg-yellow-500' },
  { type: 'operation', label: 'Operation', icon: Settings, color: 'bg-purple-500' },
];

export const Sidebar: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const { selectedNode, setSelectedNode, setShowTriggerSelector, showEmailSetup, setShowEmailSetup } = useStore();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      // Send message when sidebar is closed
      sendMessageToParent('node_settings_closed', {
        nodeId: selectedNode?.id,
        type: selectedNode?.type,
        data: selectedNode?.data
      });
      setSelectedNode(null);
    }
  };

  // Effect to send message when node is selected
  React.useEffect(() => {
    if (selectedNode) {
      sendMessageToParent('node_settings_opened', {
        nodeId: selectedNode.id,
        type: selectedNode.type,
        data: selectedNode.data
      });
    }
  }, [selectedNode]);

  if (side === 'right') {
    return (
      <>
        {selectedNode && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClickOutside}
          >
            <div 
              className="fixed right-0 top-0 h-full w-[550px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                  Node Settings: {selectedNode.data.label}
                </h2>
                <button
                  onClick={() => {
                    // Send message when sidebar is closed via X button
                    sendMessageToParent('node_settings_closed', {
                      nodeId: selectedNode.id,
                      type: selectedNode.type,
                      data: selectedNode.data
                    });
                    setSelectedNode(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedNode.type === 'start' ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        {selectedNode.data.triggerType || 'Welcome new subscribers'}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {selectedNode.data.triggerDescription ||
                          'Trigger when user subscribes to your list. Normally, it is recommended that you send a welcome email to warmly greet your new subscriber as well as offer him/her your products or service'}
                      </p>
                      <button
                        onClick={() => setShowTriggerSelector(true)}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      >
                        Change Trigger
                      </button>
                    </div>
                  ) : selectedNode.type === 'email' ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Send an email</h2>
                      <p className="text-gray-600 mb-4">
                        Send an email to your contacts who reach this point of the automation workflow. 
                        Set up a personalized email and have it ready to shoot
                      </p>
                      {!selectedNode.data.emailSetup && (
                        <div className="alert alert-warning">
                          <small>Email is not set up. Click on the button below to set up your email</small>
                        </div>
                      )}
                      <button
                        onClick={() => setShowEmailSetup(true)}
                        className="btn btn-secondary mt-3"
                      >
                        Setup
                      </button>
                      <hr className="my-4" />
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-3">Dangerous Zone</h3>
                        <p className="text-gray-600 mb-3">
                          Click the button below to remove this action. Notice that deleting an element will also delete all its children as well as associated data. This action cannot be undone.
                        </p>
                        <button className="btn btn-danger">
                          Remove this Action
                        </button>
                      </div>
                    </div>
                  ) : selectedNode.type === 'wait' ? (
                    <WaitNodeSettings node={selectedNode} />
                  ) : selectedNode.type === 'condition' ? (
                    <ConditionNodeSettings node={selectedNode} />
                  ) : (
                    <OperationNodeSettings node={selectedNode} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-[250px] bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Automation Nodes Types</h2>
      <div className="space-y-3">
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <div
            key={type}
            className="flex items-center p-3 bg-white border rounded-lg cursor-move hover:shadow-md transition-shadow w-[200px]"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
          >
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-sm font-medium flex-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};