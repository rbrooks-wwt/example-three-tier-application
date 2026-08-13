'use client';

import { useState } from 'react';

/**
 * NewButton Component
 *
 * A simple interactive button component added to the main screen.
 * This component demonstrates a basic button with state management.
 *
 * Features:
 * - Client-side state management with React hooks
 * - Click event handling
 * - Tailwind CSS styling with dark mode support
 * - Accessibility attributes
 * - Focus states for keyboard navigation
 *
 * @example
 * ```tsx
 * import { NewButton } from './new-button';
 *
 * export default function Home() {
 *   return <NewButton />;
 * }
 * ```
 *
 * @returns The NewButton component
 */
export function NewButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg px-4 py-2 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
        isActive
          ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:ring-green-500'
          : 'bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 focus:ring-purple-500'
      }`}
      aria-label={isActive ? 'Button is active' : 'Button is inactive'}
      title="Click to toggle button state"
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}
