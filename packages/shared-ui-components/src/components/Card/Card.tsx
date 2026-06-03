import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  shadow?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, subtitle, children, shadow = 'md', padding = 'md', className = '', ...props }, ref) => {
    const shadowStyles = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    const paddingStyles = {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={`bg-white rounded-lg ${shadowStyles[shadow]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
