'use client';

import { useState } from 'react';

/**
 * ActionButton Component
 *
 * An interactive button component that tracks user interactions.
 * This component demonstrates state management and click handling.
 *
 * Features:
 * - Client-side state management with React hooks
 * - Click event handling with counter
 * - Tailwind CSS styling with dark mode support
 * - Accessibility attributes
 * - Focus states for keyboard navigation
 *
 * @example
 * ```tsx
 * import { ActionButton } from './action-button';
 *
 * export default function Home() {
 *   return <ActionButton />;
 * }
 * ```
 *
 * @returns The ActionButton component
 */
export function ActionButton() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-teal-600 dark:bg-teal-500 px-4 py-2 font-medium text-white hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-zinc-900"
      aria-label={`Action button clicked ${clickCount} times`}
      title="Click to perform an action"
    >
      {clickCount === 0 ? 'Action' : `Action (${clickCount})`}
    </button>
  );
}
