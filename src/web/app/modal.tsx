'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

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
  /** Animation duration in milliseconds (default: 300) */
  animationDuration?: number;
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
 * Features:
 * - Smooth fade-in/fade-out animations for backdrop
 * - Smooth slide-in/slide-out animations for modal content
 * - Customizable animation duration
 *
 * Accessibility features:
 * - Proper ARIA attributes for screen readers
 * - Focus management
 * - Keyboard support (ESC key)
 * - Semantic HTML structure
 *
 * @example\n * ```tsx\n * const [isOpen, setIsOpen] = useState(false);\n *\n * return (\n *   <>\n *     <button onClick={() => setIsOpen(true)}>Open</button>\n *     <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>\n *       <h2>Title</h2>\n *       <p>Content</p>\n *     </Modal>\n *   </>\n * );\n * ```\n *\n * @param props - The component props\n * @returns The modal component or null if not open\n */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  animationDuration = 300,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      // Opening: render immediately and start animation
      setShouldRender(true);
      // Small delay to ensure DOM is updated before animation starts
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      // Closing: start exit animation
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  // Don't render anything if modal is not open and animation is complete
  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      {/* Backdrop - semi-transparent overlay that closes modal on click */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isAnimating ? 'modal-backdrop-enter' : 'modal-backdrop-exit'
        }`}
        onClick={onClose}
        aria-hidden="true"
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
      />

      {/* Modal Content - centered box with children and close button */}
      <div
        ref={modalRef}
        className={`relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 max-w-sm mx-4 ${
          isAnimating ? 'modal-content-enter' : 'modal-content-exit'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
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
