import React from 'react';

type ButtonVariants = 'primary' | 'success' | 'light' | 'outline';

type Props<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
  variant?: ButtonVariants;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<C>;

const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: Props<C>) => {
  const Component = as || 'button';

  switch (variant) {
    case 'primary':
      className += ' btn-primary';
      break;
    case 'success':
      className += ' btn-success';
      break;
    case 'light':
      className += ' btn-light';
      break;
    case 'outline':
      className += ' btn-outline';
      break;
  }

  if (disabled) {
    className += ' cursor-auto';

    switch (variant) {
      case 'primary':
        className += ' bg-gray text-white';
        break;
    }
  }

  return (
    <Component className={`btn ${className}`} disabled={disabled} {...props}>
      {children}
    </Component>
  );
};

export default Button;
