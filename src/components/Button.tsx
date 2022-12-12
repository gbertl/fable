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

  let buttonCls = 'inline-block py-3 px-16 text-xl text-center';
  let variantCls = '';

  if (disabled) {
    variantCls = 'cursor-auto';

    switch (variant) {
      case 'primary':
        variantCls += ' bg-gray text-white';
        break;
    }
  } else {
    switch (variant) {
      case 'primary':
        variantCls = 'bg-dark hover:bg-gray text-white';
        break;
      case 'success':
        variantCls = 'bg-green hover:opacity-80 text-white';
        break;
      case 'light':
        variantCls =
          'bg-white hover:bg-dark text-dark hover:text-white border border-transparent hover:border-white';
        break;
      case 'outline':
        variantCls = 'border border-dark hover:bg-dark hover:text-white';
        break;
    }
  }

  buttonCls += ` ${variantCls} ${className}`;

  return (
    <Component className={buttonCls} disabled={disabled} {...props}>
      {children}
    </Component>
  );
};

export default Button;
