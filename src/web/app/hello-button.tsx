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
 * - Reusable pattern for other modal-based features
 *
 * @example
 * ```tsx
 * import { HelloButton } from './hello-button';
 *
 * export default function Home() {
 *   return (
 *     <div>
 *       <h1>Welcome</h1>
 *       <HelloButton />
 *     </div>\n *   );\n * }\n * ```
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
        className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Say Hello
      </button>

      {/* Modal with greeting message */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Hello! 👋
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome to the overlay!
        </p>
      </Modal>
    </>
  );
}
