import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export const Message = ({
  message,
  isShow,
  className,
  Icon
}: {
  message: string;
  isShow: boolean;
  className?: string;
  Icon: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className={clsx(
            "fixed flex items-center gap-1 bottom-4 text-[13px] left-4 bg-[#FBE0DC] text-red-500 p-[1rem_.75rem] rounded-md",
            className
          )}
          style={{ zIndex: 1000 }}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{
            x: -300
          }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          key={message}
        >
          {Icon}

          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
