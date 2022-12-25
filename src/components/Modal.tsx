import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Modal = ({ children, onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed z-[9999] top-0 left-0 w-full h-screen grid place-items-center bg-black bg-opacity-50 overflow-y-auto py-7"
      onClick={onClose}
    >
      <motion.div
        className="max-w-[768px] h-max bg-white p-8"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ y: -100 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
