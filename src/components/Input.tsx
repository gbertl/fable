import React from 'react';

type Props<C extends React.ElementType> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

const Input = <C extends React.ElementType = 'input'>({
  className = '',
  as,
  ...props
}: Props<C>) => {
  const Component = as || 'input';

  return (
    <Component
      className={`form-input ${className} ${
        as === 'textarea' ? 'form-textarea' : ''
      }`}
      {...props}
    />
  );
};

export default Input;
