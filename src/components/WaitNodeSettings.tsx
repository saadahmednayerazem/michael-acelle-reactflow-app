import React, { useState } from 'react';
import { useStore } from '../store/flowStore';
import { Node } from 'reactflow';

interface WaitNodeSettingsProps {
  node: Node;
}

const DURATION_OPTIONS = [
  { value: '1min', label: '1 Minute' },
  { value: '30min', label: '30 Minutes' },
  { value: '1hour', label: '1 Hour' },
  { value: '1day', label: '1 Day' },
  { value: '1week', label: '1 Week' },
  { value: '1month', label: '1 Month' },
  { value: 'custom', label: 'Custom Duration' },
];

const CUSTOM_DURATION_TYPES = [
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
];

export const WaitNodeSettings: React.FC<WaitNodeSettingsProps> = ({ node }) => {
  const { nodes, setNodes } = useStore();
  const [selectedDuration, setSelectedDuration] = useState(node.data.duration || '1min');
  const [customDuration, setCustomDuration] = useState(node.data.customDuration || '');
  const [customDurationType, setCustomDurationType] = useState(node.data.customDurationType || 'minutes');

  const handleSave = () => {
    const updatedNodes = nodes.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            duration: selectedDuration,
            customDuration: selectedDuration === 'custom' ? customDuration : '',
            customDurationType: selectedDuration === 'custom' ? customDurationType : '',
          },
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Wait</h2>
      <p className="text-gray-600 mb-6">
        Set up your automation workflow to wait for a while when contacts reach this point of the automation workflow.
        You can set up how long to have it wait before proceeding with next actions
      </p>

      <div className="mb-4">
        <select
          className="form-select"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          {DURATION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {selectedDuration === 'custom' && (
        <div className="mb-4">
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Enter duration"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                min="1"
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={customDurationType}
                onChange={(e) => setCustomDurationType(e.target.value)}
              >
                {CUSTOM_DURATION_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-secondary" onClick={handleSave}>
        Save Change
      </button>

      <hr className="my-6" />

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
  );
};