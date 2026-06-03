import React from 'react';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'gray' | 'green' | 'red';
  text?: string;
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ size = 'medium', color = 'blue', text, className = '', ...props }, ref) => {
    const sizeStyles = {
      small: 'w-6 h-6 border-2',
      medium: 'w-10 h-10 border-4',
      large: 'w-16 h-16 border-4',
    };

    const colorStyles = {
      blue: 'border-blue-200 border-t-blue-600',
      gray: 'border-gray-200 border-t-gray-600',
      green: 'border-green-200 border-t-green-600',
      red: 'border-red-200 border-t-red-600',
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center ${className}`}
        {...props}
      >
        <div className={`rounded-full animate-spin ${sizeStyles[size]} ${colorStyles[color]}`} />
        {text && <p className="mt-2 text-gray-600">{text}</p>}
      </div>
    );
  }
);

Loader.displayName = 'Loader';
