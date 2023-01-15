import { motion } from 'framer-motion';
import { useHideScrollbar } from '../hooks';

interface Props {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setIsOpen }: Props) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    if (!target.closest('.modal-body')) {
      setIsOpen(false);
    }
  };

  useHideScrollbar();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed z-[9999] top-0 left-0 w-full h-screen grid place-items-center bg-black bg-opacity-50 overflow-y-auto py-7"
      onClick={handleClose}
    >
      <motion.div
        className="max-w-[768px] h-max bg-white p-8 modal-body"
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
