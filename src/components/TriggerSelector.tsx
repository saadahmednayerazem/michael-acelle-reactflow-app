import React from 'react';
import { ArrowLeft, UserPlus, Cake, Calendar, Clock, XCircle, Code, Repeat, Tag, Tags, RefreshCw } from 'lucide-react';
import { useStore } from '../store/flowStore';
import { Node } from 'reactflow';

const triggers = [
  {
    id: 'welcome',
    icon: UserPlus,
    title: 'Welcome new subscribers',
    description: 'Introduce yourself | your organization to people when they sign up for your audience.',
  },
  {
    id: 'birthday',
    icon: Cake,
    title: 'Say "Happy birthday"',
    description: 'Celebrate with an exclusive offer or cheerful message that sends based on the birthday field in your audience.',
  },
  {
    id: 'subscriber_date',
    icon: Calendar,
    title: 'Subscriber added date',
    description: 'Send an email based on when a subscriber joined your audience.',
  },
  {
    id: 'specific_date',
    icon: Clock,
    title: 'Specific date',
    description: 'Send a one-time message based on an individual date field, like an appointment.',
  },
  {
    id: 'goodbye',
    icon: XCircle,
    title: 'Say goodbye to subscriber',
    description: 'Send an email to say sorry when a subscriber unsubscribe from your audience.',
  },
  {
    id: 'api',
    icon: Code,
    title: 'API 3.0',
    description: "Trigger an email series with an API call from your application, if you've got a developer on hand.",
  },
  {
    id: 'weekly',
    icon: Repeat,
    title: 'Weekly recurring',
    description: 'Schedule your campaign to automatically send on a weekly basis, on a particular week day you choose',
  },
  {
    id: 'monthly',
    icon: RefreshCw,
    title: 'Monthly recurring',
    description: 'Schedule your campaign to automatically send on a monthly basis, on a particular day of the month',
  },
  {
    id: 'tag_based',
    icon: Tag,
    title: 'Tag based',
    description: 'Trigger the automation for your contacts if a specified tag is assigned to them',
  },
  {
    id: 'remove_tag',
    icon: Tags,
    title: 'Remove Tag',
    description: 'Trigger the automation for your contacts when a specified tag is removed',
  },
  {
    id: 'attribute_update',
    icon: RefreshCw,
    title: 'Contact Attribute Update',
    description: 'Trigger the automation if a contact attribute matches the specified value. Also support wildcards like: *, ?',
  },
];

interface TriggerSelectorProps {
  onClose: () => void;
  node: Node;
}

export const TriggerSelector: React.FC<TriggerSelectorProps> = ({ onClose, node }) => {
  const { nodes, setNodes } = useStore();

  const handleTriggerSelect = (triggerId: string) => {
    const selectedTrigger = triggers.find(t => t.id === triggerId);
    if (!selectedTrigger) return;

    const updatedNodes = nodes.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            triggerType: selectedTrigger.title,
            triggerDescription: selectedTrigger.description,
          },
        };
      }
      return n;
    });

    setNodes(updatedNodes);
    onClose();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onClose}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to automation
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Automation Trigger</h2>
      <p className="text-gray-600 mb-8">
        A trigger is the action that starts an automation. For example, the system can trigger an automated email when
        someone subscribes to your audience or purchases a certain product. The system provides a wide selection of
        preset automation types with built-in triggers, ranging from abandoned cart emails to a simple welcome
        message.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {triggers.map((trigger) => {
          const Icon = trigger.icon;
          return (
            <button
              key={trigger.id}
              onClick={() => handleTriggerSelect(trigger.id)}
              className="p-6 border rounded-lg text-left hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <Icon className="w-6 h-6 mb-3 text-gray-700" />
              <h3 className="font-semibold mb-2">{trigger.title}</h3>
              <p className="text-sm text-gray-600">{trigger.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};