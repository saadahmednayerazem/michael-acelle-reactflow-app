import React, { useState } from 'react';
import { useStore } from '../store/flowStore';
import { Node } from 'reactflow';

interface ConditionNodeSettingsProps {
  node: Node;
}

const CRITERION_OPTIONS = [
  { value: 'read_email', label: 'Subscriber read an Email' },
  { value: 'click_link', label: 'Subscriber clicks on a Link' },
];

const WAIT_TIME_OPTIONS = [
  { value: '1hour', label: '1 Hour' },
  { value: '1day', label: '1 Day' },
  { value: 'custom', label: 'Custom' },
];

const CUSTOM_DURATION_TYPES = [
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
];

// Mock email list - replace with actual data
const EMAIL_LIST = [
  { value: 'email1', label: 'Welcome Email' },
  { value: 'email2', label: 'Follow-up Email' },
];

// Mock link list - replace with actual data
const LINK_LIST = [
  { value: 'link1', label: 'Product Link' },
  { value: 'link2', label: 'Documentation Link' },
];

export const ConditionNodeSettings: React.FC<ConditionNodeSettingsProps> = ({ node }) => {
  const { nodes, setNodes } = useStore();
  const [criterion, setCriterion] = useState(node.data.criterion || 'read_email');
  const [selectedEmail, setSelectedEmail] = useState(node.data.selectedEmail || '');
  const [selectedLink, setSelectedLink] = useState(node.data.selectedLink || '');
  const [waitTime, setWaitTime] = useState(node.data.waitTime || '1day');
  const [customDuration, setCustomDuration] = useState(node.data.customDuration || '');
  const [customDurationType, setCustomDurationType] = useState(node.data.customDurationType || 'hours');

  const handleSave = () => {
    const updatedNodes = nodes.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            criterion,
            selectedEmail: criterion === 'read_email' ? selectedEmail : '',
            selectedLink: criterion === 'click_link' ? selectedLink : '',
            waitTime,
            customDuration: waitTime === 'custom' ? customDuration : '',
            customDurationType: waitTime === 'custom' ? customDurationType : '',
          },
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  const getWaitTimeDisplay = () => {
    if (waitTime === 'custom' && customDuration) {
      return `${customDuration} ${customDurationType}`;
    }
    return waitTime === '1hour' ? '1 hour' : '1 day';
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Set up your condition</h2>
      <p className="text-gray-600 mb-6">
        Set a waiting time until a previous email is opened or clicked. We will evaluate the condition and branch off your workflow accordingly.
      </p>

      <div className="mb-4">
        <label className="form-label">Select criterion</label>
        <select
          className="form-select"
          value={criterion}
          onChange={(e) => setCriterion(e.target.value)}
        >
          {CRITERION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {criterion === 'read_email' && (
        <div className="mb-4">
          <label className="form-label">Which email subscriber reads</label>
          <select
            className="form-select"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
          >
            <option value="">Choose email</option>
            {EMAIL_LIST.map(email => (
              <option key={email.value} value={email.value}>
                {email.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {criterion === 'click_link' && (
        <div className="mb-4">
          <label className="form-label">Which Link subscriber clicks</label>
          <select
            className="form-select"
            value={selectedLink}
            onChange={(e) => setSelectedLink(e.target.value)}
          >
            <option value="">Choose link</option>
            {LINK_LIST.map(link => (
              <option key={link.value} value={link.value}>
                {link.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="form-label">Specify the time to wait for the condition to be met.</label>
        <select
          className="form-select"
          value={waitTime}
          onChange={(e) => setWaitTime(e.target.value)}
        >
          {WAIT_TIME_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {waitTime === 'custom' && (
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

      <div className="mb-4">
        <p className="text-gray-600 italic">
          <strong>For example:</strong> if the specified email is not opened or clicked at the first check, 
          and with a waiting time of {getWaitTimeDisplay()}, the application will try to check again and again during 
          the next {getWaitTimeDisplay()} before proceed with NO branch.
        </p>
        <p className="text-gray-600 italic mt-2">
          <strong>In other words:</strong> wait for a maximum of {getWaitTimeDisplay()} until the recipients open or click. 
          Only proceed with the NO branch if the specified email is not opened or clicked after {getWaitTimeDisplay()}.
        </p>
      </div>

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