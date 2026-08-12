'use client';

import { ReactNode, useEffect, useRef } from 'react';

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
  /** Optional title for accessibility (aria-labelledby) */
  title?: string;
  /** Optional description for accessibility (aria-describedby) */
  description?: string;
}

/**
 * Modal Component
 *
 * A reusable overlay/dialog component that displays content in a centered modal
 * with a semi-transparent backdrop. The modal can be closed by:
 * - Clicking the backdrop
 * - Clicking the close button
 * - Pressing the ESC key
 *
 * Accessibility features:
 * - Proper ARIA attributes for screen readers
 * - Focus management
 * - Keyboard support (ESC key)
 * - Semantic HTML structure
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * return (
 *   <>\n *     <button onClick={() => setIsOpen(true)}>Open</button>\n *     <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>\n *       <h2>Title</h2>\n *       <p>Content</p>\n *     </Modal>\n *   </>\n * );\n * ```
 *
 * @param props - The component props
 * @returns The modal component or null if not open
 */
export function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard events (ESC key to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close modal on ESC key press
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Focus the close button when modal opens for better accessibility
    closeButtonRef.current?.focus();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      {/* Backdrop - semi-transparent overlay that closes modal on click */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content - centered box with children and close button */}
      <div
        ref={modalRef}
        className="relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 max-w-sm mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {children}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2 font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 dark:focus:ring-offset-zinc-800"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}
