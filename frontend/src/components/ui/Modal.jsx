import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (closeOnOverlay) onClose?.();
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`w-full rounded-3xl bg-white shadow-2xl ${sizes[size]}`}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer */}

            {footer && (
              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;