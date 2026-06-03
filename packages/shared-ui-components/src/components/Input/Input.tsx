import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'border rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2';
    const errorStyles = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-blue-500';
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={widthStyle}>
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
