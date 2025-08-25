import React from 'react';

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
  onSubmit: () => void;
}

const WebhookModal: React.FC<WebhookModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onWebhookUrlChange,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Отправить заявку</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Webhook (CRM/Bitrix24)
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => onWebhookUrlChange(e.target.value)}
              placeholder="https://your-domain.com/webhook"
              className="w-full h-12 rounded-lg outline-none border border-black px-3"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSubmit}
              className="flex-1 h-12 px-6 rounded-lg bg-custom-gradient cursor-pointer text-white"
            >
              Отправить
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-12 px-6 rounded-lg border border-black hover:bg-gray-50"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookModal;
