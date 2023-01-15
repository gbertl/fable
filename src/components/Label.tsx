import React from 'react';

const Label = <C extends React.ElementType = 'label'>({
  className = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<C>) => {
  return (
    <label className={`form-label ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
