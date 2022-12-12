interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: Props) => {
  return (
    <div className={`w-[85%] max-w-[1320px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
