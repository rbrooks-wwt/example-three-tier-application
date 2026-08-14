'use client';

import { useState } from 'react';

/**
 * NewButton Component
 *
 * An interactive button component that demonstrates state management
 * with a toggle functionality. This component shows:
 * - Client-side state management with useState
 * - Toggle event handling
 * - Tailwind CSS styling with dark mode support
 * - Accessibility attributes
 * - Focus states for keyboard navigation
 * - Dynamic styling based on state
 *
 * @example
 * ```tsx
 * import { NewButton } from './new-button';
 *
 * export default function Home() {\n *   return <NewButton />;\n * }\n * ```\n *\n * @returns The NewButton component\n */\nexport function NewButton() {\n  const [isActive, setIsActive] = useState(false);\n\n  const handleClick = () => {\n    setIsActive(!isActive);\n  };\n\n  return (\n    <button\n      onClick={handleClick}\n      className={`rounded-lg px-4 py-2 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${\n        isActive\n          ? 'bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 focus:ring-emerald-500'\n          : 'bg-slate-600 dark:bg-slate-500 hover:bg-slate-700 dark:hover:bg-slate-600 focus:ring-slate-500'\n      }`}\n      aria-label={isActive ? 'Toggle button is active' : 'Toggle button is inactive'}\n      title=\"Click to toggle the button state\"\n    >\n      {isActive ? 'Active' : 'Inactive'}\n    </button>\n  );\n}\n