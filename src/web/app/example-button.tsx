'use client';

import { useState } from 'react';

/**
 * ExampleButton Component
 *
 * A simple example button component demonstrating how to add an interactive
 * button to the main page. This component shows:
 * - Client-side state management with useState
 * - Click event handling
 * - Tailwind CSS styling with dark mode support
 * - Accessibility attributes
 * - Focus states for keyboard navigation
 *
 * @example
 * ```tsx
 * import { ExampleButton } from './example-button';
 *
 * export default function Home() {
 *   return <ExampleButton />;
 * }
 * ```
 *
 * @returns The ExampleButton component
 */
export function ExampleButton() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-rose-600 dark:bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-700 dark:hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-zinc-900"
      aria-label={`Example button clicked ${clickCount} times`}
      title="Click me to see the counter increase"
    >
      {clickCount === 0 ? 'Click Me' : `Clicked ${clickCount}x`}
    </button>
  );
}
