import React from 'react';
import { useStore } from '../store/flowStore';
import { Node } from 'reactflow';

interface EmailSetupModalProps {
  show: boolean;
  onClose: () => void;
  node: Node;
}

export const EmailSetupModal: React.FC<EmailSetupModalProps> = ({ show, onClose, node }) => {
  const { nodes, setNodes } = useStore();
  const [activeTab, setActiveTab] = React.useState('setup');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const emailData = {
      subject: formData.get('subject'),
      fromName: formData.get('fromName'),
      fromEmail: formData.get('fromEmail'),
      replyTo: formData.get('replyTo'),
      trackOpens: formData.get('trackOpens') === 'on',
      trackClicks: formData.get('trackClicks') === 'on',
      addDKIM: formData.get('addDKIM') === 'on',
      skipFailed: formData.get('skipFailed') === 'on',
    };

    const updatedNodes = nodes.map(n => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            emailSetup: emailData,
          },
        };
      }
      return n;
    });

    setNodes(updatedNodes);
    onClose();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Automation Email</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-muted mb-4">
              Discover who opens your campaigns by tracking the number of times an
              invisible web beacon embedded in the campaign is downloaded.
            </p>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'setup' ? 'active' : ''}`}
                  onClick={() => setActiveTab('setup')}
                >
                  Setup
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
                  onClick={() => setActiveTab('content')}
                >
                  Email Content
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'confirm' ? 'active' : ''}`}
                  onClick={() => setActiveTab('confirm')}
                >
                  Confirm
                </button>
              </li>
            </ul>

            {activeTab === 'setup' && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h6 className="mb-3">Email Setup</h6>
                  <p className="text-muted mb-4">
                    Please fill-up email information below. They will be used to apply to all emails that send to customers.
                  </p>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Email subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="E.g. Welcome to our mail list"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fromName" className="form-label">
                      From name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fromName"
                      name="fromName"
                      placeholder="E.g. David Encoteg"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fromEmail" className="form-label">
                      From email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="fromEmail"
                      name="fromEmail"
                      placeholder="E.g. noreply@domain.com"
                      required
                    />
                    <div className="alert alert-warning mt-2">
                      <small>
                        The email address you entered is not verified yet. Click{' '}
                        <a href="#" className="alert-link">here</a> to verify. You can proceed with
                        an unverified sender anyway if you are sure about it
                      </small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="replyTo" className="form-label">
                      Reply to <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="replyTo"
                      name="replyTo"
                      placeholder="E.g. noreply@domain.com"
                      required
                    />
                    <div className="alert alert-warning mt-2">
                      <small>The email address you entered is not verified yet.</small>
                    </div>
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="trackOpens" name="trackOpens" defaultChecked />
                    <label className="form-check-label" htmlFor="trackOpens">
                      Track opens
                    </label>
                    <small className="d-block text-muted">
                      Discover who opens your campaigns by tracking the number of times an invisible web beacon embedded in the campaign is downloaded.
                    </small>
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="trackClicks" name="trackClicks" defaultChecked />
                    <label className="form-check-label" htmlFor="trackClicks">
                      Track clicks
                    </label>
                    <small className="d-block text-muted">
                      Discover which campaign links were clicked, how many times they were clicked, and who did the clicking.
                    </small>
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="addDKIM" name="addDKIM" defaultChecked />
                    <label className="form-check-label" htmlFor="addDKIM">
                      Add DKIM signature
                    </label>
                    <small className="d-block text-muted">
                      Sign your email with your sending domain (if any), telling receiving email servers that your email is actually coming from you. This is to help establish the authenticity of your email, improving delivery rate.
                    </small>
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="skipFailed" name="skipFailed" />
                    <label className="form-check-label" htmlFor="skipFailed">
                      Skip failed messages
                    </label>
                    <small className="d-block text-muted">
                      Enable this option to skip failed message and continue with the remaining instead of stopping the whole campaign.
                    </small>
                  </div>

                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};