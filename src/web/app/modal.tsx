'use client';

import { ReactNode } from 'react';

/**
 * Props for the Modal component
 */
interface ModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean;
  /** Callback function triggered when the modal should close */
  onClose: () => void;
  /** Content to display inside the modal */
  children: ReactNode;
}

/**
 * Modal Component
 *
 * A reusable overlay/dialog component that displays content in a centered modal
 * with a semi-transparent backdrop. The modal can be closed by clicking the
 * backdrop or the close button.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * return (
 *   <>
 *     <button onClick={() => setIsOpen(true)}>Open</button>
 *     <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>\n *       <h2>Title</h2>\n *       <p>Content</p>\n *     </Modal>\n *   </>\n * );\n * ```
 *
 * @param props - The component props
 * @returns The modal component or null if not open
 */
export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - semi-transparent overlay that closes modal on click */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content - centered box with children and close button */}
      <div className="relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 max-w-sm mx-4">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2 font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
