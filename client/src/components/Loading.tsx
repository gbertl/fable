import { AnimatePresence, motion } from 'framer-motion';

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] bg-opacity-90"
        >
          <h1 className="text-center text-2xl font-normal mt-[20%]">
            Wait a moment while we're fetching data.
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
