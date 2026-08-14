'use client';

import { useState } from 'react';

/**
 * NewButton Component
 *
 * A new interactive button component that demonstrates functionality
 * added to the main screen. This component shows:
 * - Client-side state management with useState
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
          ? 'bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600'
          : 'bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-600'
      }`}
      aria-label={isActive ? 'Deactivate button' : 'Activate button'}
      title="Click to toggle button state"
    >
      {isActive ? 'Active ✓' : 'Activate'}
    </button>
  );
}
