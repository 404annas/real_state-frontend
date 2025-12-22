"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white rounded-lg shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden`}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
                <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">{children}</div>
              {footer && (
                <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
