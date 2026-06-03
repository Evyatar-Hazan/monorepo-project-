import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', title, closable = false, onClose, className = '', children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);

    const typeStyles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={`border-l-4 border-l-current p-4 rounded ${typeStyles[type]} ${className}`}
        {...props}
      >
        <div className="flex justify-between items-start">
          <div>
            {title && <h4 className="font-semibold mb-1">{title}</h4>}
            {children}
          </div>
          {closable && (
            <button
              onClick={handleClose}
              className="ml-4 text-current opacity-70 hover:opacity-100 text-lg leading-none"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
