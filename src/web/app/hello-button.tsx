'use client';

import { useState } from 'react';
import { Modal } from './modal';

/**
 * HelloButton Component
 *
 * An interactive button component that displays a friendly greeting message
 * in a modal overlay when clicked. This component demonstrates the pattern
 * for creating interactive UI elements with modal dialogs.
 *
 * Features:
 * - Client-side state management with React hooks
 * - Integrated Modal component for overlay display
 * - Dark mode support
 * - Responsive design
 * - Keyboard support (ESC to close)
 * - Full accessibility support
 * - Reusable pattern for other modal-based features
 *
 * @example
 * ```tsx
 * import { HelloButton } from './hello-button';
 *
 * export default function Home() {
 *   return (
 *     <div>\n *       <h1>Welcome</h1>\n *       <HelloButton />\n *     </div>\n *   );\n * }\n * ```
 *
 * @returns The HelloButton component with integrated modal
 */
export function HelloButton() {
  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to trigger modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900"
        aria-label="Open greeting overlay"
      >
        Say Hello
      </button>

      {/* Modal with greeting message */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 id="modal-title" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Hello! 👋
        </h2>
        <p id="modal-description" className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome to the overlay!
        </p>
      </Modal>
    </>
  );
}
