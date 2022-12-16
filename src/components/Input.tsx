import React from 'react';

type Props<C extends React.ElementType> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

const Input = React.forwardRef(
  <C extends React.ElementType = 'input'>(
    { className = '', as, ...props }: Props<C>,

    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'input';

    return (
      <Component
        className={`form-input ${className} ${
          as === 'textarea' ? 'form-textarea' : ''
        }`}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Input;
