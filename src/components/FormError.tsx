interface Props {
  message: string;
  className?: string;
}

const FormError = ({ message, className }: Props) => {
  return <span className={`form-error ${className}`}>{message}</span>;
};

export default FormError;
