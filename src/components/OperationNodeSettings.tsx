import React, { useState } from 'react';
import { useStore } from '../store/flowStore';
import { Node } from 'reactflow';

interface OperationNodeSettingsProps {
  node: Node;
}

const OPERATION_TYPES = [
  { value: 'update_attributes', label: 'Update contact\'s attributes' },
  { value: 'tag_contact', label: 'Tag contact' },
  { value: 'copy_move', label: 'Copy/Move contact' },
];

const CONTACT_FIELDS = [
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
];

const COPY_MOVE_OPERATIONS = [
  { value: 'copy', label: 'Copy' },
  { value: 'move', label: 'Move' },
  { value: 'delete', label: 'Delete' },
];

const TARGET_LISTS = [
  { value: 'list1', label: 'List 1' },
  { value: 'list2', label: 'List 2' },
  { value: 'list3', label: 'List 3' },
];

export const OperationNodeSettings: React.FC<OperationNodeSettingsProps> = ({ node }) => {
  const { nodes, setNodes } = useStore();
  const [operationType, setOperationType] = useState(node.data.operationType || 'update_attributes');
  const [selectedField, setSelectedField] = useState(node.data.selectedField || '');
  const [fieldValue, setFieldValue] = useState(node.data.fieldValue || '');
  const [tags, setTags] = useState(node.data.tags || '');
  const [copyMoveOperation, setCopyMoveOperation] = useState(node.data.copyMoveOperation || 'copy');
  const [targetList, setTargetList] = useState(node.data.targetList || '');

  const handleSave = () => {
    const updatedNodes = nodes.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            operationType,
            selectedField: operationType === 'update_attributes' ? selectedField : '',
            fieldValue: operationType === 'update_attributes' ? fieldValue : '',
            tags: operationType === 'tag_contact' ? tags : '',
            copyMoveOperation: operationType === 'copy_move' ? copyMoveOperation : '',
            targetList: operationType === 'copy_move' ? targetList : '',
          },
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Update contact</h2>
      <p className="text-gray-600 mb-6">
        Update attributes or tags of contacts who reach this point of the automation workflow. 
        For example, you may want to tag a contact as "VIP" when he or she opens a previous email. 
        Below are attributes that shall be updated.
      </p>

      <div className="mb-4">
        <select
          className="form-select"
          value={operationType}
          onChange={(e) => setOperationType(e.target.value)}
        >
          {OPERATION_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {operationType === 'update_attributes' && (
        <div className="mb-4">
          <p className="text-gray-600 mb-3">
            Update contact's attributes like: first name, last name,... or any custom field your contact has
          </p>
          <div className="row g-3">
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
              >
                <option value="">Choose field to update</option>
                {CONTACT_FIELDS.map(field => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter value"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {operationType === 'tag_contact' && (
        <div className="mb-4">
          <p className="text-gray-600 mb-3">
            Assign one or more tags to your contact. Later you can filter your contacts by tag
          </p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      )}

      {operationType === 'copy_move' && (
        <div className="mb-4">
          <p className="text-gray-600 mb-3">
            Copy or move contact to another list. You can also delete contact from your list
          </p>
          <div className="row g-3">
            <div className="col-md-6">
              <select
                className="form-select"
                value={copyMoveOperation}
                onChange={(e) => setCopyMoveOperation(e.target.value)}
              >
                {COPY_MOVE_OPERATIONS.map(op => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
            {copyMoveOperation !== 'delete' && (
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={targetList}
                  onChange={(e) => setTargetList(e.target.value)}
                >
                  <option value="">Choose target list</option>
                  {TARGET_LISTS.map(list => (
                    <option key={list.value} value={list.value}>
                      {list.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
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