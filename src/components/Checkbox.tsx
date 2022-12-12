import React, { useState } from 'react';
import Label from './Label';

type Props<C extends React.ElementType> = {
  label: string;
  controlId: string;
} & React.ComponentPropsWithoutRef<C>;

const Checkbox = <C extends React.ElementType = 'input'>({
  label,
  controlId,
  onChange,
  className,
  ...props
}: Props<C>) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        id={controlId}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          onChange(e);
        }}
        className="hidden"
        {...props}
      />
      <Label htmlFor={controlId} className={`form-checkbox-label ${className}`}>
        <span
          className={`form-checkbox-icon ${isChecked ? 'before:block' : ''}`}
        ></span>
        {label}
      </Label>
    </>
  );
};

export default Checkbox;
