import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  size = 'medium',
  className = '',
}) => {
  if (!isOpen) return null;

  const sizeStyles = {
    small: 'w-96',
    medium: 'w-full max-w-2xl',
    large: 'w-full max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white rounded-lg shadow-lg ${sizeStyles[size]} max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">
          <h2 className="text-xl font-semibold">{title || 'Modal'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t p-6 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
