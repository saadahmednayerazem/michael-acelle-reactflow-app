import React from 'react';
import { createPortal } from 'react-dom';
import { TriggerSelectorModal } from './TriggerSelectorModal';
import { EmailSetupModal } from './EmailSetupModal';
import { useStore } from '../store/flowStore';

export const ModalContainer: React.FC = () => {
  const { 
    selectedNode, 
    showTriggerSelector, 
    setShowTriggerSelector,
    showEmailSetup,
    setShowEmailSetup
  } = useStore();

  return createPortal(
    selectedNode && (<>
      <TriggerSelectorModal
        show={showTriggerSelector}
        onClose={() => setShowTriggerSelector(false)}
        node={selectedNode}
      />
      <EmailSetupModal
        show={showEmailSetup}
        onClose={() => setShowEmailSetup(false)}
        node={selectedNode}
      />
    </>),
    document.body
  );
};