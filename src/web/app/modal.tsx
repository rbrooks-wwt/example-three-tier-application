'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Size variants for the Modal component
 */
type ModalSize = 'small' | 'medium' | 'large';

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
  /** Size variant of the modal (default: 'medium') */
  size?: ModalSize;
}

/**
 * Get Tailwind classes for modal size
 * @param size - The size variant
 * @returns Tailwind CSS classes for the size
 */
function getSizeClasses(size: ModalSize): string {
  const sizeMap: Record<ModalSize, string> = {
    small: 'max-w-xs',      // 320px
    medium: 'max-w-sm',     // 384px (default)
    large: 'max-w-2xl',     // 672px
  };
  return sizeMap[size];
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
 * - Size variants (small, medium, large)
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
 *   <>\n *     <button onClick={() => setIsOpen(true)}>Open</button>\n *     <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size=\"large\">\n *       <h2>Title</h2>\n *       <p>Content</p>\n *     </Modal>\n *   </>\n * );\n * ```\n *\n * @param props - The component props\n * @returns The modal component or null if not open\n */
export function Modal({\n  isOpen,\n  onClose,\n  children,\n  title,\n  description,\n  animationDuration = 300,\n  size = 'medium',\n}: ModalProps) {\n  const modalRef = useRef<HTMLDivElement>(null);\n  const closeButtonRef = useRef<HTMLButtonElement>(null);\n  const [isAnimating, setIsAnimating] = useState(false);\n  const [shouldRender, setShouldRender] = useState(false);\n\n  // Handle keyboard events (ESC key to close)\n  useEffect(() => {\n    if (!isOpen) return;\n\n    const handleKeyDown = (event: KeyboardEvent) => {\n      // Close modal on ESC key press\n      if (event.key === 'Escape') {\n        event.preventDefault();\n        onClose();\n      }\n    };\n\n    // Add event listener\n    document.addEventListener('keydown', handleKeyDown);\n\n    // Focus the close button when modal opens for better accessibility\n    closeButtonRef.current?.focus();\n\n    // Cleanup\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, [isOpen, onClose]);\n\n  // Handle animation states\n  useEffect(() => {\n    if (isOpen) {\n      // Opening: render immediately and start animation\n      setShouldRender(true);\n      // Small delay to ensure DOM is updated before animation starts\n      const timer = setTimeout(() => setIsAnimating(true), 10);\n      return () => clearTimeout(timer);\n    } else {\n      // Closing: start exit animation\n      setIsAnimating(false);\n      // Wait for animation to complete before unmounting\n      const timer = setTimeout(() => setShouldRender(false), animationDuration);\n      return () => clearTimeout(timer);\n    }\n  }, [isOpen, animationDuration]);\n\n  // Don't render anything if modal is not open and animation is complete\n  if (!shouldRender) return null;\n\n  const sizeClasses = getSizeClasses(size);\n\n  return (\n    <div\n      className=\"fixed inset-0 z-50 flex items-center justify-center\"\n      role=\"presentation\"\n    >\n      {/* Backdrop - semi-transparent overlay that closes modal on click */}\n      <div\n        className={`absolute inset-0 bg-black/50 transition-opacity ${\n          isAnimating ? 'modal-backdrop-enter' : 'modal-backdrop-exit'\n        }`}\n        onClick={onClose}\n        aria-hidden=\"true\"\n        style={{\n          animationDuration: `${animationDuration}ms`,\n        }}\n      />\n\n      {/* Modal Content - centered box with children and close button */}\n      <div\n        ref={modalRef}\n        className={`relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 ${sizeClasses} mx-4 ${\n          isAnimating ? 'modal-content-enter' : 'modal-content-exit'\n        }`}\n        role=\"dialog\"\n        aria-modal=\"true\"\n        aria-labelledby={title ? 'modal-title' : undefined}\n        aria-describedby={description ? 'modal-description' : undefined}\n        style={{\n          animationDuration: `${animationDuration}ms`,\n        }}\n      >\n        {children}\n        <button\n          ref={closeButtonRef}\n          onClick={onClose}\n          className=\"mt-4 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2 font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 dark:focus:ring-offset-zinc-800\"\n          aria-label=\"Close modal\"\n        >\n          Close\n        </button>\n      </div>\n    </div>\n  );\n}\n"